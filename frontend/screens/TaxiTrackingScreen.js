import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Image, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../services/api';

const ATTERIDGEVILLE_COORDS = { lat: -25.77, lon: 28.08 };

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
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true })
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
    <View className="flex-1 bg-[#121212]">
      {/* Simulation Map Placeholder */}
      <View className="flex-1 items-center justify-center p-6 bg-black">
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000' }} 
          className="absolute inset-0 opacity-40 grayscale"
        />
        
        {/* Atteridgeville Focus Circle */}
        <Animated.View 
          className="w-80 h-80 rounded-full border-4 border-primary/20 items-center justify-center"
          style={{ transform: [{ scale: pulseAnim }] }}
        >
          <View className="w-10 h-10 bg-primary rounded-full items-center justify-center shadow-lg shadow-primary">
             <Icon name="navigate" size={24} color="white" />
          </View>
        </Animated.View>

        <View className="absolute top-20 left-10 p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md">
            <Text className="text-white font-black text-2xl uppercase tracking-widest">Focus Area</Text>
            <Text className="text-primary font-bold">Atteridgeville (NW)</Text>
            <Text className="text-gray-400 text-[10px] mt-1 italic">TomTom Data Overlay Active</Text>
        </View>

        {/* Simulated Markers */}
        <View className="absolute top-1/2 left-1/3 bg-white p-2 rounded-xl flex-row items-center">
            <Icon name="bus" size={20} color="#00A86B" />
            <Text className="ml-2 font-bold text-xs">Sipho (2m away)</Text>
        </View>
        <View className="absolute bottom-1/4 right-1/4 bg-white p-2 rounded-xl flex-row items-center">
            <Icon name="bus" size={20} color="#00A86B" />
            <Text className="ml-2 font-bold text-xs">Kabelo (8m away)</Text>
        </View>
      </View>

      {/* Floating Panel */}
      <View className="bg-white rounded-t-[50px] p-8 -mt-10 h-1/3 shadow-2xl">
        <View className="w-12 h-1.5 bg-gray-200 rounded-full mb-6 mx-auto" />
        <Text className="text-3xl font-black italic uppercase tracking-tighter">Your <Text className="text-primary">Kasi</Text> Ride</Text>
        <Text className="text-gray-500 mt-2">Available taxis in Atteridgeville right now.</Text>
        
        <View className="mt-8 flex-row justify-between items-center bg-gray-100 p-6 rounded-3xl">
            <View>
                <Text className="font-bold text-lg">Standard Commute</Text>
                <Text className="text-gray-400">Fixed R25 Route rate</Text>
            </View>
            <TouchableOpacity 
                className={`bg-primary px-8 py-4 rounded-2xl shadow-lg shadow-primary ${requesting ? 'opacity-50' : ''}`}
                onPress={handleRequest}
                disabled={requesting}
            >
                {requesting ? <ActivityIndicator color="white" /> : <Text className="text-white font-black uppercase">Request now</Text>}
            </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        className="absolute top-12 left-6 p-4 bg-black/60 rounded-full"
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
