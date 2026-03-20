import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import api from '../services/api';

export default function ListingDetailScreen({ navigation, route }) {
  const { listingId } = route.params;
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/listings/${listingId}`);
        setListing(res.data);
      } catch (err) {
        console.error("Failed to fetch listing detail", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [listingId]);

  if (loading) return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#00A86B" />
    </View>
  );

  if (!listing) return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text>Listing not found</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <Image 
        source={{ uri: listing.image_url || 'https://via.placeholder.com/600x400' }} 
        className="w-full h-80" 
      />
      <TouchableOpacity 
        className="absolute top-12 left-4 p-2 bg-black/50 rounded-full"
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      <ScrollView className="p-6 -mt-10 bg-white rounded-t-[40px] flex-1">
        <Text className="text-3xl font-bold">{listing.title}</Text>
        
        <View className="mt-4 flex-row items-center">
          <Icon name="calendar-outline" size={20} color="gray" />
          <Text className="ml-2 text-gray-600 text-lg">Available Now</Text>
        </View>

        <View className="mt-2 flex-row items-center">
          <Icon name="location-outline" size={20} color="gray" />
          <Text className="ml-2 text-gray-600 text-lg">{listing.location}</Text>
        </View>

        <View className="mt-8 p-4 bg-gray-100 rounded-2xl border border-gray-200">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-semibold">Standard Price</Text>
            <Text className="text-xl font-bold text-primary">R{listing.price}</Text>
          </View>
          <Text className="text-gray-500">Includes all processing fees</Text>
        </View>

        <View className="mt-8 mb-20">
          <Text className="text-xl font-bold">About this {listing.type}</Text>
          <Text className="mt-2 text-gray-600 leading-6">
            {listing.description}
          </Text>
        </View>
      </ScrollView>

      <View className="absolute bottom-10 left-6 right-6">
        <TouchableOpacity 
          className="bg-primary p-5 rounded-3xl items-center shadow-lg"
          onPress={() => navigation.navigate('Checkout', { listing })}
        >
          <Text className="text-white text-xl font-bold">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
