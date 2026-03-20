import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CATEGORIES = [
  { id: '1', name: 'Events', icon: 'party-popper', color: '#00A86B' },
  { id: '2', name: 'Transport', icon: 'bus', color: '#000' },
  { id: '3', name: 'Services', icon: 'cut', color: '#00A86B' },
  { id: '4', name: 'Marketplace', icon: 'cart', color: '#FFD700' },
  { id: '5', name: 'Restaurants', icon: 'restaurant', color: '#FF4D4D' },
];

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/listings/');
        setListings(res.data.slice(0, 5)); // Just first 5 for home
      } catch (err) {
        console.error("Failed to fetch listings", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <View className="flex-row justify-between items-center mt-8">
        <View>
          <Text className="text-2xl font-bold">Hi, {user?.full_name?.split(' ')[0] || 'Friend'}!</Text>
          <View className="flex-row items-center">
            <Icon name="location" size={16} color="#00A86B" />
            <Text className="text-gray-600 ml-1">Soweto</Text>
          </View>
        </View>
        <TouchableOpacity className="p-2 bg-white rounded-full">
          <Icon name="notifications-outline" size={24} />
        </TouchableOpacity>
      </View>

      <View className="mt-6 bg-white flex-row items-center p-3 rounded-xl border border-gray-200">
        <Icon name="search" size={20} color="gray" />
        <TextInput 
          placeholder="Find events, transport, services..." 
          className="ml-2 flex-1 text-lg"
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-6">
        {CATEGORIES.map(cat => (
          <TouchableOpacity 
            key={cat.id} 
            className="items-center mr-6"
            onPress={() => navigation.navigate(cat.name === 'Restaurants' ? 'Restaurants' : 'Explore', { category: cat.name })}
          >
            <View className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <Icon name={cat.icon} size={28} color={cat.color} />
            </View>
            <Text className="mt-2 text-sm font-semibold">{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured Banner */}
      <View className="mt-8">
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1543165365-07232ed12faf?q=80&w=800' }}
          className="w-full h-48 rounded-3xl"
        />
        <View className="absolute bottom-4 left-4">
          <Text className="text-white text-2xl font-bold italic">Top Deal: Friday braai house!</Text>
        </View>
      </View>

      <View className="mt-8 flex-row justify-between items-center">
        <Text className="text-xl font-bold">Nearby Deals</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
          <Text className="text-primary italic">See all</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4 pb-20">
        {loading ? (
          <ActivityIndicator color="#00A86B" size="large" className="mt-4" />
        ) : (
          listings.map(item => (
            <TouchableOpacity 
              key={item.id}
              className="bg-white p-3 rounded-2xl flex-row items-center shadow-sm mb-4"
              onPress={() => navigation.navigate('ListingDetail', { listingId: item.id })}
            >
              <Image source={{ uri: item.image_url || 'https://via.placeholder.com/100' }} className="w-20 h-20 rounded-xl" />
              <View className="ml-4 flex-1">
                <Text className="text-lg font-bold">{item.title}</Text>
                <Text className="text-gray-500">R{item.price} - {item.location}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="gray" />
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}
