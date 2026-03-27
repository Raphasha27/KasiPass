import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { setAuthToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app start, try to restore saved session
  useEffect(() => {
    (async () => {
      try {
        const savedToken = await AsyncStorage.getItem('kasipass_token');
        if (savedToken) {
          setAuthToken(savedToken);
          const res = await api.get('/users/me');
          setToken(savedToken);
          setUser(res.data);
        }
      } catch {
        // Token expired or invalid, clear it
        await AsyncStorage.removeItem('kasipass_token');
        setAuthToken(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    try {
      // Manual URL encoding for high compatibility in React Native
      const body = `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      
      const res = await api.post('/users/token', body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      
      const { access_token } = res.data;
      await AsyncStorage.setItem('kasipass_token', access_token);
      setAuthToken(access_token);
      
      const me = await api.get('/users/me');
      setToken(access_token);
      setUser(me.data);
      return me.data;
    } catch (err) {
      console.error("Login attempt failed:", err.message, err.response?.data);
      throw err;
    }
  };

  const register = async (email, password, fullName) => {
    await api.post('/users/register', {
      email,
      password,
      full_name: fullName,
      role: 'user',
    });
    return await login(email, password);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('kasipass_token');
    setAuthToken(null);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
