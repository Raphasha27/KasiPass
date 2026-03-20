import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import api from '../services/api';

export default function CheckoutScreen({ navigation, route }) {
  const { listing } = route.params;
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await api.post('/bookings/', {
        listing_id: listing.id
      });
      
      Alert.alert(
        "Payment Successful!", 
        `Your ticket for ${listing.title} is now in your wallet.`,
        [{ text: "View Ticket", onPress: () => navigation.navigate('Wallet') }]
      );
    } catch (err) {
      console.error("Booking failed", err);
      Alert.alert("Error", "Failed to complete booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const serviceFee = listing.price * 0.05;
  const total = listing.price + serviceFee;

  return (
    <View className="flex-1 bg-background">
      <View className="pt-16 pb-6 px-6 bg-white border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={28} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ml-4">Checkout</Text>
      </View>

      <ScrollView className="p-6">
        <View className="bg-white p-6 rounded-3xl shadow-sm">
          <Text className="text-gray-500 font-semibold mb-2">SUMMARY</Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-lg">{listing.title}</Text>
            <Text className="text-lg">R{listing.price.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mb-4">
            <Text className="text-lg text-gray-500">Service Fee (5%)</Text>
            <Text className="text-lg text-gray-500">R{serviceFee.toFixed(2)}</Text>
          </View>
          <View className="h-[1px] bg-gray-200 mb-4" />
          <View className="flex-row justify-between">
            <Text className="text-2xl font-bold">Total</Text>
            <Text className="text-2xl font-bold text-primary">R{total.toFixed(2)}</Text>
          </View>
        </View>

        <Text className="mt-8 text-gray-500 font-semibold mb-4">PAYMENT METHOD</Text>
        
        <TouchableOpacity className="bg-white p-4 rounded-2xl flex-row items-center justify-between border-2 border-primary mb-4">
          <View className="flex-row items-center">
            <Icon name="card" size={24} color="#00A86B" />
            <Text className="ml-4 text-xl font-semibold">Pay with Paystack</Text>
          </View>
          <Icon name="checkmark-circle" size={24} color="#00A86B" />
        </TouchableOpacity>

        <TouchableOpacity className="bg-white p-4 rounded-2xl flex-row items-center justify-between border-2 border-gray-100 mb-4">
          <View className="flex-row items-center">
            <Icon name="wallet" size={24} color="gray" />
            <Text className="ml-4 text-xl font-semibold">Kasi Wallet</Text>
          </View>
          <View className="w-6 h-6 rounded-full border border-gray-300" />
        </TouchableOpacity>
      </ScrollView>

      <View className="p-6 pb-12">
        <TouchableOpacity 
          className={`bg-primary p-5 rounded-3xl items-center shadow-lg ${loading ? 'opacity-50' : ''}`}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-xl font-bold">Confirm Payment</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
