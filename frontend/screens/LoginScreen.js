import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  ActivityIndicator, Alert, Animated, KeyboardAvoidingView, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-[#0A0A0A]"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        {/* Hero */}
        <View className="items-center pt-20 pb-10 px-6">
          <View className="w-24 h-24 bg-primary rounded-[30px] items-center justify-center mb-6"
            style={{ shadowColor: '#00A86B', shadowOpacity: 0.6, shadowRadius: 20, elevation: 10 }}>
            <Icon name="ticket" size={48} color="white" />
          </View>
          <Text className="text-white text-4xl font-bold tracking-tight">KasiPass</Text>
          <Text className="text-gray-400 text-lg mt-2">Community OS for the kasi</Text>
        </View>

        {/* Card */}
        <View className="flex-1 bg-white rounded-t-[40px] px-6 pt-8 pb-12">
          {/* Tab Toggle */}
          <View className="flex-row bg-gray-100 rounded-2xl p-1 mb-8 relative">
            <Animated.View
              style={{
                position: 'absolute',
                left: indicatorLeft,
                top: 4,
                bottom: 4,
                width: '50%',
                backgroundColor: '#00A86B',
                borderRadius: 14,
              }}
            />
            <TouchableOpacity className="flex-1 items-center py-3 z-10" onPress={() => switchMode('login')}>
              <Text className={`font-bold text-base ${mode === 'login' ? 'text-white' : 'text-gray-500'}`}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center py-3 z-10" onPress={() => switchMode('register')}>
              <Text className={`font-bold text-base ${mode === 'register' ? 'text-white' : 'text-gray-500'}`}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>

          {/* Full Name (register only) */}
          {mode === 'register' && (
            <View className="mb-4">
              <Text className="text-gray-600 font-semibold mb-2">Full Name</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4">
                <Icon name="person-outline" size={20} color="gray" />
                <TextInput
                  className="ml-3 flex-1 py-4 text-base"
                  placeholder="e.g. Thabo Mchize"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>
            </View>
          )}

          {/* Email */}
          <View className="mb-4">
            <Text className="text-gray-600 font-semibold mb-2">Email</Text>
            <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4">
              <Icon name="mail-outline" size={20} color="gray" />
              <TextInput
                className="ml-3 flex-1 py-4 text-base"
                placeholder="you@kasipass.co.za"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password */}
          <View className="mb-8">
            <Text className="text-gray-600 font-semibold mb-2">Password</Text>
            <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4">
              <Icon name="lock-closed-outline" size={20} color="gray" />
              <TextInput
                className="ml-3 flex-1 py-4 text-base"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Icon name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color="gray" />
              </TouchableOpacity>
            </View>
          </View>

          {/* CTA */}
          <TouchableOpacity
            className="bg-primary py-5 rounded-3xl items-center"
            style={{ shadowColor: '#00A86B', shadowOpacity: 0.4, shadowRadius: 16, elevation: 8 }}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-xl font-bold">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </Text>
            )}
          </TouchableOpacity>

          <Text className="text-center text-gray-400 mt-8 leading-6">
            Built for the community 🇿🇦{'\n'}
            <Text className="text-primary font-semibold">KasiPass v1.0.0</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
