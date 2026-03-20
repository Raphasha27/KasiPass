import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ConversationScreen({ navigation, route }) {
  const { otherUser } = route.params;
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef();

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Polling for demo
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/chat/conversation/${otherUser.id}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      await api.post('/chat/', {
        receiver_id: otherUser.id,
        content: newMessage
      });
      setNewMessage('');
      fetchMessages();
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const renderItem = ({ item }) => {
    const isMe = item.sender_id === user?.id;
    return (
      <View className={`mb-4 flex-row ${isMe ? 'justify-end' : 'justify-start'}`}>
        <View 
          className={`p-4 rounded-3xl max-w-[80%] ${isMe ? 'bg-primary rounded-tr-none' : 'bg-white rounded-tl-none border border-gray-100'}`}
        >
          <Text className={isMe ? 'text-white' : 'text-black'}>{item.content}</Text>
          <Text className={`text-[10px] mt-1 ${isMe ? 'text-white/70 text-right' : 'text-gray-400'}`}>
            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-[#F9FAFB]" 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="pt-16 pb-4 px-6 bg-white border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={28} />
        </TouchableOpacity>
        <View className="ml-4 flex-1">
          <Text className="text-xl font-bold">{otherUser.full_name}</Text>
          <Text className="text-primary text-xs font-bold uppercase tracking-widest">Online</Text>
        </View>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color="#00A86B" />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
      )}

      <View className="p-4 bg-white border-t border-gray-100 flex-row items-center">
        <TextInput 
          className="flex-1 bg-gray-100 p-4 rounded-3xl min-h-[50px] mr-3"
          placeholder="Type your message..."
          multiline
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity 
          className="bg-primary w-12 h-12 rounded-full items-center justify-center p-2"
          onPress={handleSend}
        >
          <Icon name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
