import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../services/api';

export default function WalletScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchBookings();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookings/my');
      // For each booking, we need the listing data
      const detailedBookings = await Promise.all(
        res.data.map(async (b) => {
          const lRes = await api.get(`/listings/${b.listing_id}`);
          return { ...b, listing: lRes.data };
        })
      );
      setBookings(detailedBookings);
    } catch (err) {
      console.error("Failed to fetch my bookings", err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white m-4 rounded-3xl overflow-hidden border border-gray-100 shadow-sm"
      onPress={() => navigation.navigate('Scanner', { qr: item.qr_code })}
    >
      <Image source={{ uri: item.listing?.image_url || 'https://via.placeholder.com/150' }} className="w-full h-40" />
      <View className="p-4 bg-[#1A1A1A]">
        <Text className="text-white text-xl font-bold">{item.listing?.title}</Text>
        <Text className="text-gray-400 mt-1">{new Date(item.booked_at).toLocaleDateString()}</Text>
        <View className="flex-row justify-between items-center mt-4">
          <View className="bg-primary px-4 py-1 rounded-full">
            <Text className="text-white font-bold">{item.status.toUpperCase()}</Text>
          </View>
          <View className="flex-row items-center">
            <Icon name="qr-code" size={20} color="white" />
            <Text className="text-white ml-2">Show QR</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <View className="pt-16 pb-6 px-6 bg-white border-b border-gray-100 flex-row justify-between items-center">
        <Text className="text-3xl font-bold">My Tickets</Text>
        <TouchableOpacity onPress={fetchBookings}>
          <Icon name="refresh" size={24} />
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#00A86B" />
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View className="items-center mt-20">
              <Icon name="ticket-outline" size={64} color="lightgray" />
              <Text className="text-gray-400 mt-4 text-lg">No tickets yet.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
