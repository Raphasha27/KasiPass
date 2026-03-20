import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function VendorDashboard({ navigation }) {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchVendorListings();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchVendorListings = async () => {
    setLoading(true);
    try {
      // For now we fetch all and filter by owner_id since we don't have a specific vendor endpoint yet
      const res = await api.get('/listings/');
      const myItems = res.data.filter(l => l.owner_id === user?.id);
      setListings(myItems);
    } catch (err) {
      console.error("Failed to fetch vendor listings", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <View className="pt-16 pb-6 px-6 bg-white border-b border-gray-100 flex-row justify-between items-center">
        <Text className="text-2xl font-bold">Vendor Dashboard</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={28} />
        </TouchableOpacity>
      </View>

      <ScrollView className="p-6">
        <View className="flex-row justify-between mb-8">
          <View className="bg-white p-4 rounded-3xl shadow-sm w-[48%] items-center">
            <Text className="text-gray-500 font-bold">REVENUE</Text>
            <Text className="text-2xl font-bold text-primary mt-2">R{listings.reduce((acc, curr) => acc + curr.price, 0) * 1.5}</Text>
          </View>
          <View className="bg-white p-4 rounded-3xl shadow-sm w-[48%] items-center">
            <Text className="text-gray-500 font-bold">LISTINGS</Text>
            <Text className="text-2xl font-bold text-primary mt-2">{listings.length}</Text>
          </View>
        </View>

        <TouchableOpacity 
          className="bg-primary p-6 rounded-[30px] flex-row items-center mb-4 shadow-lg shadow-primary/30"
          onPress={() => navigation.navigate('Scanner')}
        >
          <View className="bg-white/20 p-3 rounded-2xl">
            <Icon name="scan" size={32} color="white" />
          </View>
          <Text className="text-white text-2xl font-bold ml-6">Scan Ticket</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-[#1A1A1A] p-6 rounded-[30px] flex-row items-center mb-8 shadow-lg shadow-black/30"
          onPress={() => navigation.navigate('CreateListing')}
        >
          <View className="bg-white/20 p-3 rounded-2xl">
            <Icon name="add" size={32} color="white" />
          </View>
          <Text className="text-white text-2xl font-bold ml-6">Create Listing</Text>
        </TouchableOpacity>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold">My Listings</Text>
          <TouchableOpacity onPress={fetchVendorListings}>
            <Icon name="refresh" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator color="#00A86B" />
        ) : (
          listings.map(item => (
            <View key={item.id} className="bg-white p-4 rounded-3xl shadow-sm flex-row items-center mb-4">
              <Image source={{ uri: item.image_url || 'https://via.placeholder.com/100' }} className="w-16 h-16 rounded-2xl" />
              <View className="ml-4 flex-1">
                <Text className="text-lg font-bold">{item.title}</Text>
                <Text className="text-gray-500">R{item.price} • {item.category}</Text>
              </View>
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-700 font-bold">Active</Text>
              </View>
            </View>
          ))
        )}
        <View className="h-20" />
      </ScrollView>
    </View>
  );
}
