import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../services/api';

const FILTER_ITEMS = ['Near Me', 'Today', 'Price: Low to High', 'VIP Only'];

export default function ExploreScreen({ navigation, route }) {
  const category = route.params?.category || 'All';
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const params = {};
        if (category !== 'All') params.category = category;
        const res = await api.get('/listings/', { params });
        setListings(res.data);
      } catch (err) {
        console.error("Failed to fetch listings", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  const filteredListings = listings.filter(l => 
    l.title.toLowerCase().includes(search.toLowerCase()) || 
    l.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-background">
      <View className="pt-16 pb-6 px-6 bg-white border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 p-3 rounded-xl">
          <Icon name="search" size={20} color="gray" />
          <TextInput 
            placeholder={`Search in ${category}...`} 
            className="ml-2 flex-1" 
            value={search}
            onChangeText={setSearch}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
          {FILTER_ITEMS.map(item => (
            <TouchableOpacity key={item} className="bg-gray-100 px-4 py-2 rounded-full mr-2">
              <Text className="text-gray-600 font-semibold">{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#00A86B" />
        </View>
      ) : (
        <FlatList
          data={filteredListings}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              className="flex-row bg-white m-4 p-3 rounded-3xl items-center shadow-sm"
              onPress={() => navigation.navigate('ListingDetail', { listingId: item.id })}
            >
              <Image source={{ uri: item.image_url || 'https://via.placeholder.com/150' }} className="w-24 h-24 rounded-2xl" />
              <View className="ml-4 flex-1">
                <Text className="text-lg font-bold">{item.title}</Text>
                <View className="flex-row items-center mt-1">
                  <Icon name="star" size={14} color="#FFD700" />
                  <Text className="ml-1 text-gray-500">4.5 • {item.location}</Text>
                </View>
                <Text className="text-primary font-bold mt-2">R{item.price}</Text>
              </View>
              <TouchableOpacity className="bg-primary/10 p-2 rounded-full">
                <Icon name="add" size={24} color="#00A86B" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View className="items-center mt-20">
              <Icon name="search-outline" size={64} color="lightgray" />
              <Text className="text-gray-400 mt-4 text-lg">No listings found in {category}</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
