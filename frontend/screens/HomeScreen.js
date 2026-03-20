import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CATEGORIES = [
  { id: '1', name: 'Events', icon: 'musical-notes', color: '#FDCC0D', screen: 'Explore' },
  { id: '2', name: 'Transport', icon: 'bus', color: '#00A86B', screen: 'TaxiTracking' },
  { id: '3', name: 'Food', icon: 'restaurant', color: '#FF4D4D', screen: 'Restaurants' },
  { id: '4', name: 'Services', icon: 'construct', color: '#9CA3AF', screen: 'Explore' },
  { id: '5', name: 'Wallet', icon: 'wallet', color: '#00A86B', screen: 'Wallet' },
];

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/listings/');
        setListings(res.data.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch listings", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <ScrollView className="flex-1 bg-[#F9FAFB] px-6">
      <View className="pt-16 pb-6 flex-row justify-between items-center">
        <View>
          <Text className="text-gray-500 font-bold mb-1 italic">Welcome back,</Text>
          <Text className="text-3xl font-black italic uppercase italic tracking-tighter">{user?.full_name?.split(' ')[0] || 'Guest'}!</Text>
          <View className="flex-row items-center mt-1">
            <Icon name="location-outline" size={16} color="#00A86B" />
            <Text className="text-primary font-bold ml-1 text-xs uppercase tracking-widest">Atteridgeville Focus Active</Text>
          </View>
        </View>
        <TouchableOpacity className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <Icon name="notifications-outline" size={24} color="#00A86B" />
        </TouchableOpacity>
      </View>

      <View className="bg-white flex-row items-center p-4 rounded-[25px] border border-gray-100 shadow-sm mt-4">
        <Icon name="search" size={20} color="#9CA3AF" />
        <TextInput 
          placeholder="Search items in Atteridgeville..." 
          className="ml-3 flex-1 text-lg font-medium"
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity className="bg-primary p-2 rounded-xl">
           <Icon name="options-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-8">
        {CATEGORIES.map(cat => (
          <TouchableOpacity 
            key={cat.id} 
            className="items-center mr-8"
            onPress={() => navigation.navigate(cat.screen, { category: cat.name })}
          >
            <View 
              className="w-16 h-16 rounded-2xl justify-center items-center mb-2 shadow-sm"
              style={{ backgroundColor: `${cat.color}15` }}
            >
              <Icon name={cat.icon} size={28} color={cat.color} />
            </View>
            <Text className="font-black text-[10px] text-gray-500 tracking-widest uppercase">{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Atteridgeville Feature Banner */}
      <View className="mt-10 rounded-[40px] overflow-hidden bg-black shadow-2xl shadow-black/40 h-52">
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1543165365-07232ed12faf?q=80&w=800' }} 
          className="w-full h-full opacity-60" 
        />
        <View className="absolute inset-0 p-8 justify-center">
          <Text className="text-white text-3xl font-black uppercase italic tracking-tighter">Hot in Atteridgeville</Text>
          <Text className="text-white font-bold opacity-80 mt-1 max-w-[200px]">Live taxi status & local weekend party tickets now available.</Text>
          <TouchableOpacity className="bg-primary self-start mt-6 px-8 py-3 rounded-full shadow-lg shadow-primary">
             <Text className="text-white font-bold uppercase tracking-tighter">View Focus Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row justify-between items-center mt-12 mb-6">
        <Text className="text-2xl font-black uppercase italic tracking-tighter">Nearby Deals</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
          <Text className="text-primary font-bold italic">See all</Text>
        </TouchableOpacity>
      </View>

      <View className="pb-24">
        {loading ? (
          <ActivityIndicator color="#00A86B" size="large" />
        ) : (
          listings.map(item => (
            <TouchableOpacity 
              key={item.id}
              className="bg-white p-4 rounded-[30px] flex-row items-center border border-gray-50 shadow-sm mb-4"
              onPress={() => navigation.navigate('ListingDetail', { listingId: item.id })}
            >
              <Image source={{ uri: item.image_url || 'https://via.placeholder.com/150' }} className="w-24 h-24 rounded-[25px]" />
              <View className="ml-4 flex-1">
                <Text className="text-lg font-black text-[#1A1A1A] italic" numberOfLines={1}>{item.title}</Text>
                <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">{item.location}</Text>
                <View className="flex-row items-center mt-2">
                   <Text className="text-primary font-black text-xl">R{item.price}</Text>
                   <View className="ml-3 bg-primary/10 px-2 py-0.5 rounded-full">
                      <Text className="text-primary text-[8px] font-black uppercase">Instant</Text>
                   </View>
                </View>
              </View>
              <Icon name="chevron-forward" size={20} color="#E5E7EB" />
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}
