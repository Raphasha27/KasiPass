import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RESTAURANTS = [
  { id: '1', name: 'Soweto Grillhouse', cuisine: 'Braai & Grill', rating: 4.8, distance: '1.2km', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400' },
  { id: '2', name: 'Kasi Wings & Fries', cuisine: 'Fast Food', rating: 4.5, distance: '0.8km', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=400' },
  { id: '3', name: 'Mammas Kitchen', cuisine: 'Traditional', rating: 4.9, distance: '2.5km', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400' },
];

export default function RestaurantScreen({ navigation }) {
  const handleOrder = (res) => {
    Alert.alert(
      "Confirm Order", 
      `Total: R125.00 for a combo meal from ${res.name}. Order now?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm Payment", 
          onPress: () => {
             Alert.alert("Success", "Order placed successfully!");
             navigation.navigate('Order', { restaurant: res });
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white mb-6 rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
      onPress={() => handleOrder(item)}
    >
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
        <TouchableOpacity className="mt-4 bg-primary py-3 rounded-2xl items-center" onPress={() => handleOrder(item)}>
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
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        ListHeaderComponent={<Text className="text-lg text-gray-600 mb-4 italic">Support your local kasi kitchens</Text>}
      />
    </View>
  );
}
