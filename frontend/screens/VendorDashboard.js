import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function VendorDashboard({ navigation }) {
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
            <Text className="text-2xl font-bold text-primary mt-2">R12,500</Text>
          </View>
          <View className="bg-white p-4 rounded-3xl shadow-sm w-[48%] items-center">
            <Text className="text-gray-500 font-bold">BOOKINGS</Text>
            <Text className="text-2xl font-bold text-primary mt-2">128</Text>
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

        <TouchableOpacity className="bg-[#1A1A1A] p-6 rounded-[30px] flex-row items-center mb-8 shadow-lg shadow-black/30">
          <View className="bg-white/20 p-3 rounded-2xl">
            <Icon name="add" size={32} color="white" />
          </View>
          <Text className="text-white text-2xl font-bold ml-6">Create Listing</Text>
        </TouchableOpacity>

        <Text className="text-xl font-bold mb-4">My Listings</Text>
        <View className="bg-white p-4 rounded-3xl shadow-sm flex-row items-center mb-4">
          <View className="w-16 h-16 bg-gray-100 rounded-2xl items-center justify-center">
            <Icon name="musical-notes" size={28} color="#00A86B" />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-lg font-bold">Kwesta Live</Text>
            <Text className="text-gray-500">82 Tickets Sold</Text>
          </View>
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-700 font-bold">Active</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
