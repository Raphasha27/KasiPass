import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ListingDetailScreen({ navigation }) {
  return (
    <View className="flex-1 bg-white">
      <Image 
        source={{ uri: 'https://via.placeholder.com/600x400?text=Kwesta+Live' }} 
        className="w-full h-80" 
      />
      <TouchableOpacity 
        className="absolute top-12 left-4 p-2 bg-black/50 rounded-full"
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      <ScrollView className="p-6 -mt-10 bg-white rounded-t-[40px] flex-1">
        <Text className="text-3xl font-bold">Kwesta Live in Soweto!</Text>
        
        <View className="mt-4 flex-row items-center">
          <Icon name="calendar-outline" size={20} color="gray" />
          <Text className="ml-2 text-gray-600 text-lg">Sat, 25 Dec, 7:00 PM</Text>
        </View>

        <View className="mt-2 flex-row items-center">
          <Icon name="location-outline" size={20} color="gray" />
          <Text className="ml-2 text-gray-600 text-lg">Orlando Stadium, Soweto</Text>
        </View>

        <View className="mt-8 p-4 bg-gray-100 rounded-2xl border border-gray-200">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-semibold">General Ticket</Text>
            <Text className="text-xl font-bold text-primary">R80</Text>
          </View>
          <Text className="text-gray-500">Limited availability</Text>
        </TouchableOpacity>

        <View className="mt-4 p-4 bg-gray-100 rounded-2xl border border-gray-200">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-semibold">VIP Ticket</Text>
            <Text className="text-xl font-bold text-primary">R300</Text>
          </View>
          <Text className="text-gray-500">Backstage access included</Text>
        </View>

        <View className="mt-8 mb-20">
          <Text className="text-xl font-bold">About Event</Text>
          <Text className="mt-2 text-gray-600 leading-6">
            Join us for an unforgettable night with Kwesta. Experience the best of South African hip hop 
            live in the heart of Soweto. Expect special guest appearances and a high-energy performance.
          </Text>
        </View>
      </ScrollView>

      <View className="absolute bottom-10 left-6 right-6">
        <TouchableOpacity 
          className="bg-primary p-5 rounded-3xl items-center shadow-lg"
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text className="text-white text-xl font-bold">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
