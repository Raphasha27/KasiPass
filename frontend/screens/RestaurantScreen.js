import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RESTAURANTS = [
  { id: '1', name: 'Soweto Grillhouse', cuisine: 'Braai & Grill', rating: 4.8, distance: '1.2km', image: 'https://via.placeholder.com/300x200?text=Grillhouse' },
  { id: '2', name: 'Kasi Wings & Fries', cuisine: 'Fast Food', rating: 4.5, distance: '0.8km', image: 'https://via.placeholder.com/300x200?text=Wings' },
  { id: '3', name: 'Mammas Kitchen', cuisine: 'Traditional', rating: 4.9, distance: '2.5km', image: 'https://via.placeholder.com/300x200?text=Mammas' },
];

export default function RestaurantScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity className="bg-white mb-6 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <Image source={{ uri: item.image }} className="w-full h-48" />
      <View className="p-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">{item.name}</Text>
          <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-lg">
            <Icon name="star" size={16} color="#FFD700" />
            <Text className="ml-1 font-bold">{item.rating}</Text>
          </View>
        </View>
        <Text className="text-gray-500 mt-1">{item.cuisine} • {item.distance} away</Text>
        <TouchableOpacity className="mt-4 bg-primary py-3 rounded-2xl items-center">
          <Text className="text-white font-bold">Order Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <View className="pt-16 pb-6 px-6 bg-white border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={28} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ml-4">Local Restaurants</Text>
      </View>

      <FlatList
        data={RESTAURANTS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        ListHeaderComponent={<Text className="text-lg text-gray-600 mb-4 italic">Support your local kasi kitchens</Text>}
      />
    </View>
  );
}
