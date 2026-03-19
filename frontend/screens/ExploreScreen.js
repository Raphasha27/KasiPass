import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FILTER_ITEMS = ['Near Me', 'Today', 'Price: Low to High', 'VIP Only'];

const LISTINGS = [
  { id: '1', title: 'Township Party', price: 'R50', rating: 4.8, distance: '1.2km', image: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Soccer Match', price: 'R30', rating: 4.5, distance: '3.5km', image: 'https://via.placeholder.com/150' },
  { id: '3', title: 'Comedy Night', price: 'R80', rating: 4.9, distance: '0.5km', image: 'https://via.placeholder.com/150' },
];

export default function ExploreScreen({ navigation, route }) {
  const category = route.params?.category || 'All';

  return (
    <View className="flex-1 bg-background">
      <View className="pt-16 pb-6 px-6 bg-white border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 p-3 rounded-xl">
          <Icon name="search" size={20} color="gray" />
          <TextInput placeholder={`Search in ${category}...`} className="ml-2 flex-1" />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
          {FILTER_ITEMS.map(item => (
            <TouchableOpacity key={item} className="bg-gray-100 px-4 py-2 rounded-full mr-2">
              <Text className="text-gray-600 font-semibold">{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={LISTINGS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="flex-row bg-white m-4 p-3 rounded-3xl items-center shadow-sm"
            onPress={() => navigation.navigate('ListingDetail')}
          >
            <Image source={{ uri: item.image }} className="w-24 h-24 rounded-2xl" />
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold">{item.title}</Text>
              <View className="flex-row items-center mt-1">
                <Icon name="star" size={14} color="#FFD700" />
                <Text className="ml-1 text-gray-500">{item.rating} • {item.distance}</Text>
              </View>
              <Text className="text-primary font-bold mt-2">{item.price}</Text>
            </View>
            <TouchableOpacity className="bg-primary/10 p-2 rounded-full">
              <Icon name="add" size={24} color="#00A86B" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
