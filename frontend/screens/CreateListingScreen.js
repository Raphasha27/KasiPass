import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import api from '../services/api';

export default function CreateListingScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Events');
  const [type, setType] = useState('event');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Events', 'Transport', 'Services', 'Marketplace', 'Restaurants'];

  const handleCreate = async () => {
    if (!title || !description || !price || !location) {
      Alert.alert("Missing Fields", "Please fill in all listing details.");
      return;
    }

    setLoading(true);
    try {
      await api.post('/listings/', {
        title,
        description,
        price: parseFloat(price),
        category,
        type,
        location,
        image_url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600' // Default image
      });
      Alert.alert("Success", "Listing created successfully!");
      navigation.goBack();
    } catch (err) {
      console.error("Listing creation failed", err);
      Alert.alert("Error", "Failed to create listing. Make sure you are a vendor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <View className="pt-16 pb-6 px-6 bg-white border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={28} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ml-4">Create Listing</Text>
      </View>

      <ScrollView className="p-6">
        <Text className="text-gray-500 font-bold mb-2">TITLE</Text>
        <TextInput 
          className="bg-white p-4 rounded-2xl mb-4 border border-gray-200"
          placeholder="e.g. Ama-Piano Weekend"
          value={title}
          onChangeText={setTitle}
        />

        <Text className="text-gray-500 font-bold mb-2">DESCRIPTION</Text>
        <TextInput 
          className="bg-white p-4 rounded-2xl mb-4 border border-gray-200"
          placeholder="What are you offering?"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <View className="flex-row justify-between">
          <View className="w-[48%]">
            <Text className="text-gray-500 font-bold mb-2">PRICE (R)</Text>
            <TextInput 
              className="bg-white p-4 rounded-2xl mb-4 border border-gray-200"
              placeholder="50.00"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>
          <View className="w-[48%]">
            <Text className="text-gray-500 font-bold mb-2">LOCATION</Text>
            <TextInput 
              className="bg-white p-4 rounded-2xl mb-4 border border-gray-200"
              placeholder="Orlando West"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        <Text className="text-gray-500 font-bold mb-2">CATEGORY</Text>
        <View className="flex-row flex-wrap mb-4">
          {categories.map(cat => (
            <TouchableOpacity 
              key={cat} 
              className={`mr-2 mb-2 px-4 py-2 rounded-full border ${category === cat ? 'bg-primary border-primary' : 'bg-white border-gray-200'}`}
              onPress={() => {
                setCategory(cat);
                if (cat === 'Events') setType('event');
                else if (cat === 'Transport') setType('transport');
                else setType('service');
              }}
            >
              <Text className={category === cat ? 'text-white font-bold' : 'text-gray-500'}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          className="bg-primary p-5 rounded-3xl items-center mt-6 shadow-lg"
          onPress={handleCreate}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text className="text-white text-xl font-bold">Launch Listing</Text>}
        </TouchableOpacity>
        
        <View className="h-20" />
      </ScrollView>
    </View>
  );
}
