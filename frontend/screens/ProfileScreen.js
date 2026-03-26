import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Switch, StyleSheet, Dimensions } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [isVendor, setIsVendor] = useState(false);

  const menuItems = [
    { title: 'Settings', icon: 'settings-outline' },
    { title: 'Activity History', icon: 'time-outline' },
    { title: 'Payment Methods', icon: 'card-outline' },
    { title: 'Support', icon: 'help-circle-outline' },
  ];

  const badges = [
    { id: '1', name: 'Founding Member', icon: 'medal', color: '#FDCC0D' },
    { id: '2', name: 'Super Saver', icon: 'wallet', color: '#00A86B' },
    { id: '3', name: 'Vibe Master', icon: 'flame', color: '#FF3B30' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A0A0A', '#1A1A1A']} style={styles.gradient}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          
          <View style={styles.header}>
            <TouchableOpacity style={styles.roundBtn} onPress={() => navigation.goBack()}>
              <Icon name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Account</Text>
            <TouchableOpacity style={styles.roundBtn} onPress={logout}>
              <Icon name="log-out-outline" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </View>

          {/* Profile Hero */}
          <View style={styles.profileHero}>
            <View style={styles.avatarWrap}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200' }} 
                style={styles.avatar} 
              />
              <LinearGradient colors={['#FDCC0D', '#CC9900']} style={styles.levelBadge}>
                 <Text style={styles.levelText}>Lv 12</Text>
              </LinearGradient>
            </View>
            <Text style={styles.userName}>{user?.full_name || 'Thabo Mchize'}</Text>
            <Text style={styles.userSub}>Verified Community Resident 🇿🇦</Text>
            
            <View style={styles.kpStats}>
               <View style={styles.statBox}>
                  <Text style={styles.statVal}>4,250</Text>
                  <Text style={styles.statLab}>Kasi Points</Text>
               </View>
               <View style={styles.statDivider} />
               <View style={styles.statBox}>
                  <Text style={styles.statVal}>Gold</Text>
                  <Text style={styles.statLab}>Membership</Text>
               </View>
            </View>
          </View>

          {/* Digital Badges - NEW FEATURE */}
          <Text style={styles.sectionLabel}>COMMUNITY ACHIEVEMENTS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgeScroll}>
            {badges.map(badge => (
              <View key={badge.id} style={styles.badgeItem}>
                <View style={[styles.badgeCircle, { backgroundColor: badge.color + '15' }]}>
                  <Icon name={badge.icon} size={24} color={badge.color} />
                </View>
                <Text style={styles.badgeName}>{badge.name}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Business Mode Toggle */}
          <View style={styles.vendorCard}>
            <View style={styles.vendorHeader}>
               <View style={styles.vendorIconWrap}>
                 <Icon name="rocket" size={20} color="#00A86B" />
               </View>
               <View style={{ flex: 1, marginLeft: 15 }}>
                  <Text style={styles.vendorTitle}>Professional Mode</Text>
                  <Text style={styles.vendorSubText}>Manage your business and listings</Text>
               </View>
               <Switch 
                 value={isVendor} 
                 onValueChange={setIsVendor}
                 trackColor={{ false: '#333', true: '#00A86B' }}
                 thumbColor="white"
               />
            </View>
            {isVendor && (
              <TouchableOpacity 
                style={styles.dashBtn}
                onPress={() => navigation.navigate('VendorDashboard')}
              >
                <Text style={styles.dashBtnText}>Go to Dashboard</Text>
                <Icon name="arrow-forward" size={16} color="white" />
              </TouchableOpacity>
            )}
          </View>

          {/* Menu Items */}
          <View style={styles.menuList}>
             {menuItems.map((item, idx) => (
                <TouchableOpacity key={idx} style={styles.menuRow}>
                   <View style={styles.menuIconBox}>
                      <Icon name={item.icon} size={20} color="#8E8E93" />
                   </View>
                   <Text style={styles.menuItemText}>{item.title}</Text>
                   <Icon name="chevron-forward" size={16} color="#333" />
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
  gradient: { flex: 1 },
  header: { paddingTop: 60, paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: '900' },
  roundBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' },
  profileHero: { alignItems: 'center', marginTop: 30, paddingBottom: 30 },
  avatarWrap: { width: 110, height: 110, padding: 3, borderRadius: 55, backgroundColor: '#1A1A1A', position: 'relative' },
  avatar: { width: '100%', height: '100%', borderRadius: 55 },
  levelBadge: { position: 'absolute', bottom: -5, alignSelf: 'center', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, borderWidth: 3, borderColor: '#0A0A0A' },
  levelText: { color: 'black', fontSize: 10, fontWeight: '900' },
  userName: { color: 'white', fontSize: 24, fontWeight: '900', marginTop: 15 },
  userSub: { color: '#8E8E93', fontSize: 13, marginTop: 4, fontWeight: 'bold' },
  kpStats: { flexDirection: 'row', marginTop: 25, backgroundColor: '#111', padding: 20, borderRadius: 25, width: width - 48 },
  statBox: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, height: '100%', backgroundColor: '#FFFFFF05' },
  statVal: { color: '#00A86B', fontSize: 20, fontWeight: '900' },
  statLab: { color: '#444', fontSize: 10, fontWeight: 'bold', marginTop: 4 },
  sectionLabel: { color: '#444', fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginLeft: 24, marginTop: 10 },
  badgeScroll: { marginTop: 15, paddingLeft: 24 },
  badgeItem: { marginRight: 20, alignItems: 'center' },
  badgeCircle: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  badgeName: { color: '#8E8E93', fontSize: 10, fontWeight: 'bold', marginTop: 8 },
  vendorCard: { marginHorizontal: 24, marginTop: 35, backgroundColor: '#111', padding: 20, borderRadius: 30, borderWidth: 1, borderColor: '#FFFFFF05' },
  vendorHeader: { flexDirection: 'row', alignItems: 'center' },
  vendorIconWrap: { width: 40, height: 40, borderRadius: 14, backgroundColor: '#00A86B15', alignItems: 'center', justifyContent: 'center' },
  vendorTitle: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  vendorSubText: { color: '#444', fontSize: 11, marginTop: 2 },
  dashBtn: { backgroundColor: '#00A86B', marginTop: 20, height: 50, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  dashBtnText: { color: 'white', fontWeight: 'bold', marginRight: 10 },
  menuList: { marginHorizontal: 24, marginTop: 30, backgroundColor: '#111', borderRadius: 30, paddingVertical: 10 },
  menuRow: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#FFFFFF05' },
  menuIconBox: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#FFFFFF05', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  menuItemText: { flex: 1, color: '#E0E0E0', fontSize: 15, fontWeight: '600' }
});
