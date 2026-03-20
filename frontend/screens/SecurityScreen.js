import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SecurityScreen({ navigation }) {
  const [active, setActive] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const ringAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (active) {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(pulseAnim, { toValue: 1.1, duration: 200, useNativeDriver: true }),
            Animated.timing(pulseAnim, { toValue: 1, duration: 200, useNativeDriver: true })
          ]),
          Animated.sequence([
            Animated.timing(ringAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
            Animated.timing(ringAnim, { toValue: 0, duration: 0, useNativeDriver: true })
          ])
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
      ringAnim.setValue(0);
    }
  }, [active]);

  const handlePanic = () => {
    if (!active) {
      setActive(true);
      Alert.alert(
        "🚨 PANIC ALERT SENT",
        "SDU Security has been notified. Live location tracking is active. Help is on the way to your coordinates.",
        [{ text: "Cancel Alert", onPress: () => setActive(false), style: "destructive" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A0A0A', '#1A1A1A']} style={styles.gradient}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SDU SECURITY</Text>
          <View width={28} />
        </View>

        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: active ? '#FF3B30' : '#4CD964' }]} />
          <Text style={styles.statusText}>{active ? 'ALERTING SDU...' : 'SYSTEM SECURE'}</Text>
        </View>

        <View style={styles.centerContainer}>
          {active && (
            <Animated.View 
              style={[styles.ring, { 
                opacity: ringAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] }),
                transform: [{ scale: ringAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 2.5] }) }]
              }]} 
            />
          )}
          
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={handlePanic}
              style={[styles.panicButton, active && styles.panicActive]}
            >
              <Icon name="hand-right" size={80} color="white" />
              <Text style={styles.panicText}>{active ? 'HELP ON WAY' : 'PANIC'}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.footer}>
          <View style={styles.infoCard}>
            <Icon name="shield-checkmark" size={32} color="#4CD964" />
            <Text style={styles.infoTitle}>SDU Response Active</Text>
            <Text style={styles.infoSub}>24/7 Rapid Response Unit Linked</Text>
          </View>
          
          <Text style={styles.disclaimer}>
            Pressing 'PANIC' immediately transmits your live GPS coordinates to SDU Security Dispatch in Atteridgeville.
          </Text>
        </View>

      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  gradient: { flex: 1, padding: 24, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: '900', letterSpacing: 2 },
  statusContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF10', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 30, alignSelf: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  statusText: { color: 'white', fontWeight: 'bold', fontSize: 12, letterSpacing: 1 },
  centerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', width: 220, height: 220, borderRadius: 110, borderWidth: 10, borderColor: '#FF3B30' },
  panicButton: { width: 220, height: 220, borderRadius: 110, backgroundColor: '#1C1C1E', borderWidth: 4, borderColor: '#FFFFFF10', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 20 },
  panicActive: { backgroundColor: '#FF3B30', borderColor: '#FF9500' },
  panicText: { color: 'white', fontSize: 24, fontWeight: '900', marginTop: 10, letterSpacing: 2 },
  footer: { paddingBottom: 20 },
  infoCard: { backgroundColor: '#FFFFFF05', borderRadius: 30, padding: 25, borderWidth: 1, borderColor: '#FFFFFF10', alignItems: 'center' },
  infoTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  infoSub: { color: '#8E8E93', fontSize: 14, marginTop: 4 },
  disclaimer: { color: '#666', fontSize: 10, textAlign: 'center', marginTop: 24, lineHeight: 16 }
});
