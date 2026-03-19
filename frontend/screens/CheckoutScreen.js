import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CheckoutScreen({ navigation }) {
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
            <Text className="text-lg">Kwesta Live - VIP Ticket</Text>
            <Text className="text-lg">R300.00</Text>
          </View>
          <View className="flex-row justify-between mb-4">
            <Text className="text-lg text-gray-500">Service Fee</Text>
            <Text className="text-lg text-gray-500">R15.00</Text>
          </View>
          <View className="h-[1px] bg-gray-200 mb-4" />
          <View className="flex-row justify-between">
            <Text className="text-2xl font-bold">Total</Text>
            <Text className="text-2xl font-bold text-primary">R315.00</Text>
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
          className="bg-primary p-5 rounded-3xl items-center shadow-lg"
          onPress={() => {
            alert("Payment Successful!");
            navigation.navigate('Wallet');
          }}
        >
          <Text className="text-white text-xl font-bold">Confirm Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
