import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ChatScreen({ navigation }) {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // In a real app, we'd fetch actual active conversations.
      // For now, we'll fetch all users except current user.
      const res = await api.get('/users/profile'); // Mocking conversation discovery
      // Actually, let's just fetch all listings and their owners to simulate business chat
      const lRes = await api.get('/listings/');
      const owners = lRes.data.map(l => l.owner).filter(o => o && o.id !== user?.id);
      // Remove duplicates
      const uniqueOwners = Array.from(new Set(owners.map(o => o.id)))
        .map(id => owners.find(o => o.id === id));
      
      setUsers(uniqueOwners);
    } catch (err) {
      console.error("Failed to fetch chat users", err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      className="flex-row bg-white p-6 border-b border-gray-50 items-center"
      onPress={() => navigation.navigate('Conversation', { otherUser: item })}
    >
      <View>
        <Image 
          source={{ uri: `https://images.unsplash.com/photo-15${item.id+30}00000000?q=80&w=100` }} 
          className="w-16 h-16 rounded-full" 
        />
        <View className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
      </View>
      <View className="ml-4 flex-1">
        <View className="flex-row justify-between">
          <Text className="text-xl font-bold">{item.full_name}</Text>
          <Text className="text-gray-400">Now</Text>
        </View>
        <Text className="text-gray-500 mt-1 font-medium" numberOfLines={1}>Tap to start community chat</Text>
      </View>
      <Icon name="chevron-forward" size={20} color="#E5E7EB" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <View className="pt-16 pb-6 px-6 bg-white border-b border-gray-100 flex-row justify-between items-center">
        <Text className="text-3xl font-black italic uppercase italic tracking-tighter">Messages</Text>
        <TouchableOpacity onPress={fetchUsers}>
          <Icon name="refresh" size={24} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color="#00A86B" />
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <View className="items-center mt-20 p-10">
              <Icon name="chatbubbles-outline" size={64} color="#E5E7EB" />
              <Text className="text-gray-400 mt-4 text-center text-lg">No active chats. Contact a vendor from the Explore screen!</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
