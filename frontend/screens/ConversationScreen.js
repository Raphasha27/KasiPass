import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ConversationScreen({ navigation, route }) {
  const { otherUser } = route.params;
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef();

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 4000); // Polling for demo
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
      // Scroll to end immediately after sending
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const renderItem = ({ item }) => {
    const isMe = item.sender_id === user?.id;
    return (
      <View style={[styles.messageRow, isMe ? styles.myRow : styles.otherRow]}>
        <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
          <Text style={[styles.messageText, isMe ? styles.myText : styles.otherText]}>{item.content}</Text>
          <Text style={[styles.timestamp, isMe ? styles.myTime : styles.otherTime]}>
            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>{otherUser.full_name}</Text>
          <View style={styles.onlineBadge}>
             <View style={styles.onlineDot} />
             <Text style={styles.onlineText}>ONLINE</Text>
          </View>
        </View>
      </View>

      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator color="#00A86B" size="large" />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 24, paddingBottom: 50 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
      )}

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <View style={styles.inputWrapper}>
          <TextInput 
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#444"
            multiline
            value={newMessage}
            onChangeText={setNewMessage}
          />
        </View>
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Icon name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#0A0A0A', borderBottomWidth: 1, borderBottomColor: '#FFFFFF05' },
  backBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center' },
  headerTitleWrap: { marginLeft: 16 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: '900' },
  onlineBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#00A86B', marginRight: 6 },
  onlineText: { color: '#00A86B', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  messageRow: { marginBottom: 16, flexDirection: 'row' },
  myRow: { justifyContent: 'end', alignSelf: 'flex-end' },
  otherRow: { justifyContent: 'start', alignSelf: 'flex-start' },
  bubble: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 22, maxWidth: width * 0.75 },
  myBubble: { backgroundColor: '#00A86B', borderBottomRightRadius: 4 },
  otherBubble: { backgroundColor: '#1A1A1A', borderBottomLeftRadius: 4 },
  messageText: { fontSize: 15, fontWeight: '500' },
  myText: { color: 'white' },
  otherText: { color: '#E0E0E0' },
  timestamp: { fontSize: 9, marginTop: 4, fontWeight: 'bold' },
  myTime: { color: 'rgba(255,255,255,0.6)', textAlign: 'right' },
  otherTime: { color: '#444' },
  inputBar: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingBottom: Platform.OS === 'ios' ? 40 : 20, backgroundColor: '#0A0A0A', borderTopWidth: 1, borderTopColor: '#FFFFFF05' },
  inputWrapper: { flex: 1, backgroundColor: '#111', borderRadius: 25, paddingHorizontal: 20, height: 55, justifyContent: 'center', marginRight: 12, borderWidth: 1, borderColor: '#FFFFFF05' },
  input: { color: 'white', fontSize: 15, fontWeight: '600' },
  sendBtn: { width: 55, height: 55, borderRadius: 18, backgroundColor: '#00A86B', alignItems: 'center', justifyContent: 'center', shadowColor: '#00A86B', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 }
});
