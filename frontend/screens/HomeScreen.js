import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
const logoImg = require('../assets/logo_v4_final.png');
import { Ionicons as Icon } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/listings/');
        setListings(res.data.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch listings", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const triggerPanic = async () => {
    try {
      // Mock coordinates for demo purposes
      await api.post('/security/panic', {
        latitude: -26.2041, 
        longitude: 28.0473,
        description: "Emergency help requested from Home Screen"
      });
      alert("🆘 SOS Sent! Community safety and nearby taxis have been alerted.");
    } catch (err) {
      console.error("Failed to send SOS", err);
    }
  };

  const categories = [
    { id: '1', name: 'Events',    icon: 'calendar',       color: '#FDCC0D', screen: 'Explore', param: 'Entertainment' },
    { id: '2', name: 'Transport', icon: 'bus',            color: '#00A86B', screen: 'TaxiTracking', param: null },
    { id: '3', name: 'Food',      icon: 'fast-food',      color: '#FF3B30', screen: 'Restaurants', param: null },
    { id: '4', name: 'Services',  icon: 'construct',      color: '#4CD964', screen: 'Explore', param: 'Services' },
    { id: '5', name: 'Sports',    icon: 'football',       color: '#FF9500', screen: 'Explore', param: 'Sports' },
    { id: '6', name: 'Culture',   icon: 'earth',          color: '#5856D6', screen: 'Explore', param: 'Culture' },
    { id: '7', name: 'Wellness',  icon: 'leaf',           color: '#32ADE6', screen: 'Explore', param: 'Wellness' },
    { id: '8', name: 'Pro',       icon: 'briefcase',      color: '#AF52DE', screen: 'Explore', param: 'Professional' },
  ];

  const news = [
    { id: '1', title: 'Moonlight Market', tag: 'Vibe', color: '#FDCC0D' },
    { id: '2', title: 'No Loadshedding', tag: 'Utility', color: '#00A86B' },
    { id: '3', title: 'New Taxi Route', tag: 'Travel', color: '#5856D6' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSmall}>Welcome back,</Text>
            <Text style={styles.headerLarge}>{user?.full_name?.split(' ')[0] || 'Thabo'} 🇿🇦</Text>
          </View>
          <TouchableOpacity style={{ width: 150, height: 60 }} onPress={() => navigation.navigate('Profile')}>
            <Image source={logoImg} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* SOS Panic Button - PREMIUM NEW FEATURE */}
        <View style={styles.sosContainer}>
           <TouchableOpacity 
             style={styles.sosButton} 
             onPress={triggerPanic}
             activeOpacity={0.7}
           >
              <LinearGradient colors={['#FF3B30', '#8E0000']} style={styles.sosGradient}>
                 <Icon name="warning" size={28} color="white" />
                 <Text style={styles.sosText}>PANIC SOS</Text>
              </LinearGradient>
           </TouchableOpacity>
           <View style={styles.sosRipple1} />
           <View style={styles.sosRipple2} />
        </View>

        {/* Loyalty Reward Card */}
        <LinearGradient colors={['#1F1F1F', '#0D0D0D']} style={styles.loyaltyCard}>
           <View style={styles.loyatyInfo}>
              <View>
                 <Text style={styles.kpLabel}>KASI POINTS</Text>
                 <Text style={styles.kpValue}>4,250 <Text style={styles.kpUnit}>KP</Text></Text>
                 <View style={styles.badgeRow}>
                    <Icon name="medal" size={14} color="#FDCC0D" />
                    <Text style={styles.badgeText}>Platinum Tier</Text>
                 </View>
              </View>
              <LinearGradient colors={['#FDCC0D', '#E6B800']} style={styles.qrMini}>
                 <Icon name="qr-code" size={32} color="black" />
              </LinearGradient>
           </View>
           <View style={styles.progressTrack}>
              <View style={styles.progressBar} />
           </View>
           <Text style={styles.nextReward}>750 KP until next community reward</Text>
        </LinearGradient>

        {/* Community News Ticker */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Community Hub</Text>
           <View style={styles.liveDot} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.newsScroll}>
           {news.map(item => (
             <TouchableOpacity key={item.id} style={[styles.newsItem, { borderColor: item.color + '40' }]}>
                <View style={[styles.newsTag, { backgroundColor: item.color + '20' }]}>
                   <Text style={[styles.newsTagText, { color: item.color }]}>{item.tag.toUpperCase()}</Text>
                </View>
                <Text style={styles.newsTitle}>{item.title}</Text>
             </TouchableOpacity>
           ))}
        </ScrollView>

        {/* Quick Search */}
        <View style={styles.searchBar}>
          <Icon name="search-outline" size={20} color="#666" />
          <TextInput 
            placeholder="Search deals, rides or food..." 
            placeholderTextColor="#666"
            style={styles.searchInput}
          />
        </View>

        {/* Categories Grid */}
        <View style={styles.catGrid}>
           {categories.map(cat => (
             <TouchableOpacity 
               key={cat.id} 
               style={styles.catBox}
               onPress={() => cat.screen === 'TaxiTracking' || cat.screen === 'Restaurants'
                 ? navigation.navigate(cat.screen)
                 : navigation.navigate(cat.screen, { category: cat.param })
               }
             >
                <View style={[styles.catIconWrap, { backgroundColor: cat.color + '20' }]}>
                   <Icon name={cat.icon} size={28} color={cat.color} />
                </View>
                <Text style={styles.catLabel}>{cat.name}</Text>
             </TouchableOpacity>
           ))}
        </View>

        {/* Trending Section */}
        <View style={styles.sectionHeaderAlt}>
          <Text style={styles.sectionTitle}>Nearby Hotspots</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
            <Text style={styles.seeAll}>Explore All</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator color="#00A86B" style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.trendingScroll}>
            {listings.map(item => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.trendingCard}
                onPress={() => navigation.navigate('ListingDetail', { listingId: item.id })}
              >
                <Image source={{ uri: item.image_url || 'https://images.unsplash.com/photo-1543165365-07232ed12faf?q=80&w=400' }} style={styles.trendImage} />
                <LinearGradient colors={['transparent', 'rgba(10,10,10,0.95)']} style={styles.trendOverlay} />
                <View style={styles.trendContent}>
                  <Text style={styles.trendTitle} numberOfLines={1}>{item.title}</Text>
                  <View style={styles.trendMeta}>
                     <Text style={styles.trendPrice}>R{item.price}</Text>
                     <View style={styles.typeBadge}>
                        <Text style={styles.typeText}>{item.type.toUpperCase()}</Text>
                     </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* COMMUNITY OS HUB - NEW V3.0 SECTION */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Community Hub OS</Text>
           <View style={[styles.liveDot, { backgroundColor: '#4CD964' }]} />
        </View>

        <View style={styles.osGrid}>
           <TouchableOpacity style={[styles.osCard, { backgroundColor: '#1C1C1E' }]}>
              <LinearGradient colors={['#AF52DE60', 'transparent']} style={styles.osCardGrad} />
              <Icon name="people-circle" size={32} color="#AF52DE" />
              <Text style={styles.osCardTitle}>Stokvel Hub</Text>
              <Text style={styles.osCardSub}>Goal: Holiday Groceries (75%)</Text>
           </TouchableOpacity>

           <TouchableOpacity style={[styles.osCard, { backgroundColor: '#1C1C1E' }]}>
              <LinearGradient colors={['#FF3B3060', 'transparent']} style={styles.osCardGrad} />
              <Icon name="shield-checkmark" size={32} color="#FF3B30" />
              <Text style={styles.osCardTitle}>Kasi Guard</Text>
              <Text style={styles.osCardSub}>No incidents in your area</Text>
           </TouchableOpacity>
        </View>

        <View style={[styles.osGrid, { marginTop: 15 }]}>
           <TouchableOpacity style={[styles.osCard, { backgroundColor: '#1C1C1E' }]}>
              <LinearGradient colors={['#FDCC0D60', 'transparent']} style={styles.osCardGrad} />
              <Icon name="hammer" size={32} color="#FDCC0D" />
              <Text style={styles.osCardTitle}>Hustle Board</Text>
              <Text style={styles.osCardSub}>2 new gigs near you</Text>
           </TouchableOpacity>

           <TouchableOpacity style={[styles.osCard, { backgroundColor: '#1C1C1E' }]}>
              <LinearGradient colors={['#32ADE660', 'transparent']} style={styles.osCardGrad} />
              <Icon name="flash" size={32} color="#32ADE6" />
              <Text style={styles.osCardTitle}>Utility Pulse</Text>
              <Text style={styles.osCardSub}>Stage 2 Loadshedding @ 6PM</Text>
           </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070707' },
  header: { paddingHorizontal: 24, paddingTop: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerSmall: { color: '#8E8E93', fontSize: 13, fontWeight: 'bold', letterSpacing: 0.5 },
  headerLarge: { color: 'white', fontSize: 28, fontWeight: '900', marginTop: 4 },
  brandBox: { width: 50, height: 50, borderRadius: 18, backgroundColor: '#00A86B', alignItems: 'center', justifyContent: 'center', shadowColor: '#00A86B', shadowOpacity: 0.5, shadowRadius: 15, elevation: 15 },
  brandText: { color: 'white', fontWeight: '900', fontSize: 18 },
  
  sosContainer: { marginHorizontal: 24, marginTop: 30, height: 80, alignItems: 'center', justifyContent: 'center' },
  sosButton: { 
    width: '100%', 
    height: 70, 
    borderRadius: 25, 
    zIndex: 10,
    overflow: 'hidden',
    shadowColor: '#FF3B30',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10
  },
  sosGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  sosText: { color: 'white', fontSize: 20, fontWeight: '900', marginLeft: 12, letterSpacing: 1 },
  sosRipple1: { position: 'absolute', width: '105%', height: 85, borderRadius: 30, backgroundColor: '#FF3B3020', zIndex: 1 },
  sosRipple2: { position: 'absolute', width: '112%', height: 100, borderRadius: 35, backgroundColor: '#FF3B3010', zIndex: 0 },

  loyaltyCard: { marginHorizontal: 24, marginTop: 40, borderRadius: 35, padding: 24, borderWidth: 1, borderColor: '#FFFFFF10', shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 20 },
  loyatyInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kpLabel: { color: '#8E8E93', fontSize: 10, fontWeight: '900', letterSpacing: 1.5 },
  kpValue: { color: 'white', fontSize: 32, fontWeight: '900', marginTop: 4 },
  kpUnit: { color: '#00A86B', fontSize: 16 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  badgeText: { color: '#FDCC0D', fontSize: 12, fontWeight: 'bold', marginLeft: 6 },
  qrMini: { width: 60, height: 60, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  progressTrack: { height: 6, backgroundColor: '#222', borderRadius: 10, marginTop: 20, overflow: 'hidden' },
  progressBar: { height: '100%', width: '75%', backgroundColor: '#FDCC0D' },
  nextReward: { color: '#444', fontSize: 11, marginTop: 12, fontWeight: 'bold' },
  sectionHeader: { marginHorizontal: 24, marginTop: 40, flexDirection: 'row', alignItems: 'center' },
  sectionTitle: { color: 'white', fontSize: 22, fontWeight: '900' },
  liveDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF3B30', marginLeft: 10, shadowColor: '#FF3B30', shadowOpacity: 0.7, shadowRadius: 5 },
  newsScroll: { marginTop: 15, paddingLeft: 24 },
  newsItem: { width: 180, backgroundColor: '#111', padding: 20, borderRadius: 28, marginRight: 15, borderWidth: 1 },
  newsTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, alignSelf: 'flex-start', marginBottom: 12 },
  newsTagText: { fontSize: 9, fontWeight: 'bold' },
  newsTitle: { color: 'white', fontSize: 15, fontWeight: 'bold' },
  searchBar: { marginHorizontal: 24, marginTop: 35, backgroundColor: '#111', height: 65, borderRadius: 22, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#FFFFFF05' },
  searchInput: { flex: 1, marginLeft: 12, color: 'white', fontSize: 16, fontWeight: '600' },
  catGrid: { marginHorizontal: 24, marginTop: 40, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  catBox: { width: '22%', alignItems: 'center', marginBottom: 25 },
  catIconWrap: { width: 70, height: 70, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  catLabel: { color: '#8E8E93', fontSize: 12, fontWeight: 'bold' },
  sectionHeaderAlt: { marginHorizontal: 24, marginTop: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seeAll: { color: '#00A86B', fontSize: 14, fontWeight: 'bold' },
  trendingScroll: { paddingHorizontal: 24, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  trendingCard: { width: '48%', height: 240, borderRadius: 35, marginBottom: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#FFFFFF05' },
  trendImage: { width: '100%', height: '100%' },
  trendOverlay: { position: 'absolute', inset: 0 },
  trendContent: { position: 'absolute', bottom: 20, left: 20, right: 20 },
  trendTitle: { color: 'white', fontSize: 15, fontWeight: 'bold' },
  trendMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  trendPrice: { color: '#00A86B', fontSize: 18, fontWeight: '900' },
  typeBadge: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  typeText: { color: 'white', fontSize: 9, fontWeight: 'bold' },
  
  osGrid: { marginHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  osCard: { width: '48%', height: 160, borderRadius: 30, padding: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#FFFFFF10' },
  osCardGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 80 },
  osCardTitle: { color: 'white', fontSize: 17, fontWeight: 'bold', marginTop: 15 },
  osCardSub: { color: '#8E8E93', fontSize: 12, marginTop: 8, fontWeight: '600' }

});
