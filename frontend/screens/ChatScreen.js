import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CHATS = [
  { id: '1', name: 'Lebo (Taxi Service)', lastMessage: 'See you at 4:30!', time: '12:45', online: true, image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Event Organizer', lastMessage: 'Tickets are still available.', time: 'Yesterday', online: false, image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Sipho (Plumber)', lastMessage: 'Request for tomorrow. No problem.', time: 'Monday', online: false, image: 'https://via.placeholder.com/100' },
];

export default function ChatScreen() {
  return (
    <View className="flex-1 bg-background">
      <View className="pt-16 pb-6 px-6 bg-white border-b border-gray-100 flex-row justify-between items-center">
        <Text className="text-3xl font-bold">Messages</Text>
        <TouchableOpacity>
          <Icon name="create-outline" size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={CHATS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row bg-white p-4 border-b border-gray-50 items-center">
            <View>
              <Image source={{ uri: item.image }} className="w-14 h-14 rounded-full" />
              {item.online && <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />}
            </View>
            <View className="ml-4 flex-1">
              <View className="flex-row justify-between">
                <Text className="text-lg font-bold">{item.name}</Text>
                <Text className="text-gray-400">{item.time}</Text>
              </View>
              <Text className="text-gray-500 mt-1" numberOfLines={1}>{item.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
