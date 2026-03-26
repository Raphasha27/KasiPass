import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
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
      const res = await api.get('/users/');
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch chat users", err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatRow}
      onPress={() => navigation.navigate('Conversation', { otherUser: item })}
    >
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: `https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100` }} 
          style={styles.avatar}
        />
        <View style={styles.onlineStatus} />
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.full_name}</Text>
          <Text style={styles.chatTime}>Now</Text>
        </View>
        <Text style={styles.chatPreview} numberOfLines={1}>Tap to start community chat</Text>
      </View>
      <Icon name="chevron-forward" size={18} color="#1A1A1A" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.refreshBtn} onPress={fetchUsers}>
          <Icon name="refresh-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator color="#00A86B" size="large" />
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
          ListEmptyComponent={
            <View style={styles.centerBox}>
              <Icon name="chatbubbles-outline" size={64} color="#111" />
              <Text style={styles.emptyText}>No active chats. Reach out to the community!</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 28, fontWeight: '900' },
  refreshBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 },
  chatRow: { flexDirection: 'row', backgroundColor: '#111', padding: 16, borderRadius: 25, marginBottom: 15, alignItems: 'center', borderWidth: 1, borderColor: '#FFFFFF05' },
  avatarContainer: { position: 'relative' },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  onlineStatus: { position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, borderRadius: 7, backgroundColor: '#00A86B', borderWeight: 2, borderColor: '#111' },
  chatInfo: { flex: 1, marginLeft: 16 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chatName: { color: 'white', fontSize: 17, fontWeight: 'bold' },
  chatTime: { color: '#444', fontSize: 11, fontWeight: 'bold' },
  chatPreview: { color: '#8E8E93', fontSize: 13, marginTop: 4, fontWeight: '500' },
  emptyText: { color: '#333', fontSize: 15, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }
});
