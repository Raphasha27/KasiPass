import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Image, ActivityIndicator, Alert, StyleSheet, Dimensions } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function TaxiTrackingScreen({ navigation }) {
  const [taxis, setTaxis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fetchNearbyTaxis();
    const interval = setInterval(fetchNearbyTaxis, 5000);
    
    // Pulse animation for the focus area
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true })
      ])
    ).start();

    return () => clearInterval(interval);
  }, []);

  const fetchNearbyTaxis = async () => {
    try {
      const res = await api.get('/taxi/nearby');
      setTaxis(res.data);
    } catch (err) {
      console.error("Failed to fetch nearby taxis", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = () => {
    setRequesting(true);
    setTimeout(() => {
      setRequesting(false);
      Alert.alert("🚕 Taxi Dispatched!", "Driver Sipho is 5 minutes away from Jeffersville.");
      navigation.navigate('Order', { restaurant: { name: 'Kasi Taxi #229' } });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Simulation Map Placeholder */}
      <View style={styles.mapContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000' }} 
          style={styles.mapImage}
        />
        
        <View style={styles.overlay} />

        {/* Radar Effect */}
        <Animated.View 
          style={[styles.radarCircle, { transform: [{ scale: pulseAnim }] }]}
        />
        <View style={styles.userMarker}>
           <Icon name="navigate" size={24} color="white" />
        </View>

        <View style={styles.focusLabel}>
            <Text style={styles.focusTitle}>TRACKING HUB</Text>
            <Text style={styles.focusArea}>Atteridgeville (NW)</Text>
            <Text style={styles.focusSub}>TomTom Data Active</Text>
        </View>

        {/* Simulated Taxis */}
        <View style={[styles.taxiMarker, { top: '45%', left: '25%' }]}>
            <Icon name="bus" size={18} color="#00A86B" />
            <Text style={styles.taxiText}>Sipho (2m)</Text>
        </View>
        <View style={[styles.taxiMarker, { bottom: '30%', right: '20%' }]}>
            <Icon name="bus" size={18} color="#00A86B" />
            <Text style={styles.taxiText}>Kabelo (8m)</Text>
        </View>
      </View>

      {/* Floating Control Panel */}
      <View style={styles.panel}>
        <View style={styles.pullBar} />
        <Text style={styles.panelTitle}>Your <Text style={{color: '#00A86B'}}>Kasi</Text> Ride</Text>
        <Text style={styles.panelSubtitle}>2 available taxis in Atteridgeville right now.</Text>
        
        <View style={styles.requestCard}>
            <View>
                <Text style={styles.rateTitle}>Standard Route</Text>
                <Text style={styles.rateValue}>Fixed R25 Flat Rate</Text>
            </View>
            <TouchableOpacity 
                style={[styles.requestBtn, requesting && { opacity: 0.6 }]}
                onPress={handleRequest}
                disabled={requesting}
            >
                {requesting ? <ActivityIndicator color="white" /> : <Text style={styles.requestBtnText}>Request</Text>}
            </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  mapContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  mapImage: { ...StyleSheet.absoluteFillObject, opacity: 0.3 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  radarCircle: { width: 300, height: 300, borderRadius: 150, borderWeight: 1, borderColor: '#00A86B30' },
  userMarker: { position: 'absolute', width: 50, height: 50, backgroundColor: '#00A86B', borderRadius: 25, alignItems: 'center', justifyContent: 'center', shadowColor: '#00A86B', shadowOpacity: 0.5, shadowRadius: 15, elevation: 15 },
  focusLabel: { position: 'absolute', top: 70, left: 24, backgroundColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 20, borderWidth: 1, borderColor: '#FFFFFF10' },
  focusTitle: { color: 'white', fontSize: 18, fontWeight: '900', letterSpacing: 2 },
  focusArea: { color: '#00A86B', fontSize: 13, fontWeight: 'bold', marginTop: 2 },
  focusSub: { color: '#444', fontSize: 9, marginTop: 6, fontWeight: 'bold' },
  taxiMarker: { position: 'absolute', backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5 },
  taxiText: { color: '#000', fontSize: 10, fontWeight: 'bold', marginLeft: 6 },
  panel: { backgroundColor: '#111', height: height * 0.35, borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 30, marginTop: -40, borderWidth: 1, borderColor: '#FFFFFF05' },
  pullBar: { width: 40, height: 5, backgroundColor: '#222', borderRadius: 10, alignSelf: 'center', marginBottom: 20 },
  panelTitle: { color: 'white', fontSize: 26, fontWeight: '900', letterSpacing: -0.5 },
  panelSubtitle: { color: '#8E8E93', fontSize: 14, marginTop: 4, fontWeight: '500' },
  requestCard: { backgroundColor: '#1A1A1A', marginTop: 30, padding: 20, borderRadius: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWeight: 1, borderColor: '#FFFFFF05' },
  rateTitle: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  rateValue: { color: '#8E8E93', fontSize: 12, marginTop: 4, fontWeight: '600' },
  requestBtn: { backgroundColor: '#00A86B', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 16, shadowColor: '#00A86B', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  requestBtnText: { color: 'white', fontWeight: 'bold', fontSize: 14, textTransform: 'uppercase' },
  backBtn: { position: 'absolute', top: 60, left: 24, width: 45, height: 45, borderRadius: 15, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }
});
