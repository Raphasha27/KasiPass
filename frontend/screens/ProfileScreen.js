import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Switch, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [isVendor, setIsVendor] = useState(false);

  const menuItems = [
    { title: 'Settings', icon: 'settings-outline' },
    { title: 'Activity History', icon: 'time-outline' },
    { title: 'Payment Methods', icon: 'card-outline' },
    { title: 'Support', icon: 'help-circle-outline' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A0A0A', '#1A1A1A']} style={styles.gradient}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-back" size={24} color="#8E8E93" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity onPress={logout}>
              <Icon name="log-out-outline" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200' }} 
                style={styles.avatar} 
              />
              <View style={styles.badgeIcon}>
                <Icon name="medal" size={14} color="#FDCC0D" />
              </View>
            </View>
            
            <Text style={styles.userName}>{user?.full_name || 'Thabo Mchize'}</Text>
            <Text style={styles.userLoc}>Soweto, GP</Text>
            
            <View style={styles.tierContainer}>
              <Text style={styles.tierText}>Gold Member | <Text style={styles.kpText}>4,250 KP</Text></Text>
            </View>
            <Text style={styles.subText}>Community Member</Text>
          </View>

          <View style={styles.vendorToggleCard}>
            <View style={styles.vendorInfo}>
              <View style={styles.vendorIconBox}>
                <Icon name="people-outline" size={20} color="#00A86B" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.vendorTitle}>Switch to Vendor Mode</Text>
                <Text style={styles.vendorSub}>Switch into vendor mode and manage your businesses.</Text>
              </View>
              <Switch 
                value={isVendor} 
                onValueChange={setIsVendor}
                trackColor={{ false: '#3A3A3C', true: '#4CD964' }}
                thumbColor={isVendor ? 'white' : '#8E8E93'}
              />
            </View>
          </View>

          <View style={styles.menuContainer}>
             {menuItems.map((item, idx) => (
                <TouchableOpacity key={idx} style={styles.menuItem}>
                   <View style={styles.menuIconWrap}>
                      <Icon name={item.icon} size={20} color="#8E8E93" />
                   </View>
                   <Text style={styles.menuText}>{item.title}</Text>
                   <Icon name="chevron-forward" size={18} color="#3A3A3C" />
                </TouchableOpacity>
             ))}
          </View>

        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  gradient: { flex: 1, paddingHorizontal: 24, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  profileSection: { alignItems: 'center', marginBottom: 30, backgroundColor: '#FFFFFF05', padding: 24, borderRadius: 30, borderWidth: 1, borderColor: '#FFFFFF10' },
  avatarContainer: { width: 100, height: 100, borderRadius: 50, padding: 4, backgroundColor: '#FFFFFF10', marginBottom: 15 },
  avatar: { width: '100%', height: '100%', borderRadius: 50 },
  badgeIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#1A1A1A', width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#000' },
  userName: { color: 'white', fontSize: 22, fontWeight: '900', letterSpacing: 0.5 },
  userLoc: { color: '#8E8E93', fontSize: 14, marginTop: 4 },
  tierContainer: { backgroundColor: '#FDCC0D15', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20, marginTop: 15, borderWidth: 1, borderColor: '#FDCC0D30' },
  tierText: { color: '#FDCC0D', fontSize: 13, fontWeight: 'bold' },
  kpText: { color: '#FDCC0D' },
  subText: { color: '#666', fontSize: 11, marginTop: 10, fontWeight: 'bold' },
  vendorToggleCard: { backgroundColor: '#1C1C1E', borderRadius: 25, padding: 20, marginBottom: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20 },
  vendorInfo: { flexDirection: 'row', alignItems: 'center' },
  vendorIconBox: { width: 40, height: 40, borderRadius: 15, backgroundColor: '#00A86B15', alignItems: 'center', justifyContent: 'center' },
  vendorTitle: { color: 'white', fontSize: 15, fontWeight: 'bold' },
  vendorSub: { color: '#8E8E93', fontSize: 10, marginTop: 4, paddingRight: 40 },
  menuContainer: { backgroundColor: '#111111', borderRadius: 30, paddingVertical: 10, paddingHorizontal: 5 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#FFFFFF05' },
  menuIconWrap: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#FFFFFF05', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  menuText: { flex: 1, color: '#E5E5EA', fontSize: 15, fontWeight: '600' }
});
