import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BOOKINGS = [
  { id: '1', title: 'Kwesta Live in Soweto', date: '25 Dec, 7:00 PM', type: 'VIP Pass', status: 'Active', image: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Local Taxi Ride', date: 'Today, 4:30 PM', type: 'Standard', status: 'Used', image: 'https://via.placeholder.com/150' },
];

export default function WalletScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white m-4 rounded-3xl overflow-hidden border border-gray-100 shadow-sm"
      onPress={() => navigation.navigate('Scanner', { qr: 'KASIPASS-TICKET-123' })}
    >
      <Image source={{ uri: item.image }} className="w-full h-40" />
      <View className="p-4 bg-[#1A1A1A]">
        <Text className="text-white text-xl font-bold">{item.title}</Text>
        <Text className="text-gray-400 mt-1">{item.date}</Text>
        <View className="flex-row justify-between items-center mt-4">
          <View className="bg-primary px-4 py-1 rounded-full">
            <Text className="text-white font-bold">{item.type}</Text>
          </View>
          <View className="flex-row items-center">
            <Icon name="qr-code" size={20} color="white" />
            <Text className="text-white ml-2">Click to View QR</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <View className="pt-16 pb-6 px-6 bg-white border-b border-gray-100 flex-row justify-between items-center">
        <Text className="text-3xl font-bold">My Tickets</Text>
        <TouchableOpacity>
          <Icon name="ellipsis-horizontal" size={24} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={BOOKINGS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
