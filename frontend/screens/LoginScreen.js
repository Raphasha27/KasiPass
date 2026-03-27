import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, Image,
  ActivityIndicator, Alert, Animated, KeyboardAvoidingView, Platform, StyleSheet,
} from 'react-native';
const logoImg = require('../assets/logo_v4_final.png');
import { Ionicons as Icon } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleTestLogin = () => {
    setEmail('thabo@kasipass.co.za');
    setPassword('thabo123');
  };

  const switchMode = (m) => {
    setMode(m);
    Animated.spring(slideAnim, {
      toValue: m === 'login' ? 0 : 1,
      useNativeDriver: false,
    }).start();
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email.trim().toLowerCase(), password);
      } else {
        if (!fullName) {
          Alert.alert('Missing Fields', 'Please enter your full name.');
          setLoading(false);
          return;
        }
        await register(email.trim().toLowerCase(), password, fullName);
      }
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Something went wrong. Please try again.';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  const indicatorLeft = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A0A0A', '#1A1A1A']} style={styles.gradient}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            
            {/* Hero Branding */}
            <View style={styles.hero}>
              <Image 
                source={logoImg} 
                style={{ width: '100%', height: 200 }} 
                resizeMode="contain"
              />
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              {/* Tab Toggle */}
              <View style={styles.tabToggle}>
                <Animated.View style={[styles.tabIndicator, { left: indicatorLeft }]} />
                <TouchableOpacity style={styles.tabBtn} onPress={() => { switchMode('login'); handleTestLogin(); }}>
                  <Text style={[styles.tabBtnText, mode === 'login' && styles.tabActiveText]}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabBtn} onPress={() => switchMode('register')}>
                  <Text style={[styles.tabBtnText, mode === 'register' && styles.tabActiveText]}>New Account</Text>
                </TouchableOpacity>
              </View>

              {/* Quick Test Option */}
              <TouchableOpacity style={styles.testBadge} onPress={handleTestLogin}>
                 <Text style={styles.testBadgeText}>🚀 CLICK FOR TEST CREDENTIALS</Text>
              </TouchableOpacity>

              {/* Inputs */}
              <View style={styles.inputStack}>
                {mode === 'register' && (
                   <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Full Name</Text>
                      <View style={styles.inputWrapper}>
                        <Icon name="person-outline" size={20} color="#8E8E93" />
                        <TextInput
                          style={styles.input}
                          placeholder="Thabo Mchize"
                          placeholderTextColor="#444"
                          value={fullName}
                          onChangeText={setFullName}
                        />
                      </View>
                   </View>
                )}

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <Icon name="mail-outline" size={20} color="#8E8E93" />
                    <TextInput
                      style={styles.input}
                      placeholder="you@kasipass.co.za"
                      placeholderTextColor="#444"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <Icon name="lock-closed-outline" size={20} color="#8E8E93" />
                    <TextInput
                      style={styles.input}
                      placeholder="••••••••"
                      placeholderTextColor="#444"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPass}
                    />
                    <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                      <Icon name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color="#8E8E93" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Submit CTA */}
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.submitBtnText}>
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                  </Text>
                )}
              </TouchableOpacity>

              <Text style={styles.versionText}>
                Built for the community 🇿🇦{"\n"}
                <Text style={{color: '#00A86B'}}>KasiPass V2.0 Premium</Text>
              </Text>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  gradient: { flex: 1, paddingHorizontal: 24 },
  hero: { alignItems: 'center', paddingTop: 80, marginBottom: 50 },
  logoBox: { width: 100, height: 100, backgroundColor: '#00A86B', borderRadius: 30, alignItems: 'center', justifyContent: 'center', shadowColor: '#00A86B', shadowOpacity: 0.4, shadowRadius: 20, elevation: 15 },
  logoText: { color: 'white', fontSize: 36, fontWeight: '900', marginTop: 20, letterSpacing: -1 },
  subText: { color: '#8E8E93', fontSize: 16, marginTop: 4, fontWeight: '500' },
  formSection: { flex: 1 },
  tabToggle: { flexDirection: 'row', backgroundColor: '#FFFFFF05', borderRadius: 20, padding: 4, marginBottom: 40, position: 'relative', borderWidth: 1, borderColor: '#FFFFFF10' },
  tabIndicator: { position: 'absolute', top: 4, bottom: 4, width: '50%', backgroundColor: '#00A86B', borderRadius: 16 },
  tabBtn: { flex: 1, height: 48, alignItems: 'center', justifyContent: 'center' },
  tabBtnText: { color: '#8E8E93', fontWeight: 'bold', fontSize: 14 },
  tabActiveText: { color: 'white' },
  inputStack: { marginBottom: 30 },
  inputGroup: { marginBottom: 20 },
  inputLabel: { color: '#8E8E93', fontSize: 13, fontWeight: 'bold', marginBottom: 10, letterSpacing: 0.5 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF05', borderRadius: 20, paddingHorizontal: 16, height: 60, borderWidth: 1, borderColor: '#FFFFFF10' },
  input: { flex: 1, marginLeft: 12, color: 'white', fontSize: 16, fontWeight: '600' },
  submitBtn: { backgroundColor: '#00A86B', height: 65, borderRadius: 25, alignItems: 'center', justifyContent: 'center', shadowColor: '#00A86B', shadowOpacity: 0.3, shadowRadius: 15, elevation: 10 },
  submitBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold', letterSpacing: 0.5 },
  versionText: { textAlign: 'center', color: '#444', fontSize: 11, marginTop: 40, lineHeight: 18, fontWeight: 'bold' },
  testBadge: { alignSelf: 'center', backgroundColor: '#FFFFFF08', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, marginBottom: 25, borderWidth: 1, borderColor: '#FFFFFF15' },
  testBadgeText: { color: '#00A86B', fontSize: 10, fontWeight: '900', letterSpacing: 1.5 },
});
