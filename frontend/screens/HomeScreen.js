import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
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

  const categories = [
    { id: '1', name: 'Events', icon: 'calendar', color: '#FDCC0D', screen: 'Explore' },
    { id: '2', name: 'Transport', icon: 'bus', color: '#00A86B', screen: 'TaxiTracking' },
    { id: '3', name: 'Food', icon: 'fast-food', color: '#FF3B30', screen: 'Restaurants' },
    { id: '4', name: 'Services', icon: 'construct', color: '#4CD964', screen: 'Explore' },
  ];

  const news = [
    { id: '1', title: 'Moonlight Market', tag: 'Vibe', color: '#FDCC0D' },
    { id: '2', title: 'No Loadshedding', tag: 'Utility', color: '#00A86B' },
    { id: '3', title: 'New Taxi Route', tag: 'Travel', color: '#5856D6' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSmall}>Welcome back,</Text>
            <Text style={styles.headerLarge}>{user?.full_name?.split(' ')[0] || 'Thabo'} 🇿🇦</Text>
          </View>
          <TouchableOpacity style={styles.brandBox}>
            <Text style={styles.brandText}>KP</Text>
          </TouchableOpacity>
        </View>

        {/* Loyalty Reward Card - NEW FEATURE */}
        <LinearGradient colors={['#1A1A1A', '#0D0D0D']} style={styles.loyaltyCard}>
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

        {/* Community News Ticker - NEW FEATURE */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Community Hub</Text>
           <View style={styles.liveDot} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.newsScroll}>
           {news.map(item => (
             <TouchableOpacity key={item.id} style={[styles.newsItem, { borderColor: item.color + '30' }]}>
                <View style={[styles.newsTag, { backgroundColor: item.color + '15' }]}>
                   <Text style={[styles.newsTagText, { color: item.color }]}>{item.tag.toUpperCase()}</Text>
                </View>
                <Text style={styles.newsTitle}>{item.title}</Text>
             </TouchableOpacity>
           ))}
        </ScrollView>

        {/* Quick Search */}
        <View style={styles.searchBar}>
          <Icon name="search-outline" size={20} color="#444" />
          <TextInput 
            placeholder="Search deals, rides or food..." 
            placeholderTextColor="#444"
            style={styles.searchInput}
          />
        </View>

        {/* Categories Grid */}
        <View style={styles.catGrid}>
           {categories.map(cat => (
             <TouchableOpacity 
               key={cat.id} 
               style={styles.catBox}
               onPress={() => navigation.navigate(cat.screen)}
             >
                <View style={[styles.catIconWrap, { backgroundColor: cat.color + '15' }]}>
                   <Icon name={cat.icon} size={24} color={cat.color} />
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
                <LinearGradient colors={['transparent', 'rgba(10,10,10,0.9)']} style={styles.trendOverlay} />
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

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  header: { paddingHorizontal: 24, paddingTop: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerSmall: { color: '#8E8E93', fontSize: 13, fontWeight: 'bold', letterSpacing: 0.5 },
  headerLarge: { color: 'white', fontSize: 28, fontWeight: '900', marginTop: 4 },
  brandBox: { width: 50, height: 50, borderRadius: 18, backgroundColor: '#00A86B', alignItems: 'center', justifyContent: 'center', shadowColor: '#00A86B', shadowOpacity: 0.5, shadowRadius: 15, elevation: 15 },
  brandText: { color: 'white', fontWeight: '900', fontSize: 18 },
  loyaltyCard: { marginHorizontal: 24, marginTop: 25, borderRadius: 35, padding: 24, borderWidth: 1, borderColor: '#FFFFFF10', shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 20 },
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
  sectionHeader: { marginHorizontal: 24, marginTop: 35, flexDirection: 'row', alignItems: 'center' },
  sectionTitle: { color: 'white', fontSize: 20, fontWeight: '900' },
  liveDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF3B30', marginLeft: 10, shadowColor: '#FF3B30', shadowOpacity: 0.7, shadowRadius: 5 },
  newsScroll: { marginTop: 15, paddingLeft: 24 },
  newsItem: { width: 160, backgroundColor: '#111', padding: 16, borderRadius: 25, marginRight: 15, borderWidth: 1 },
  newsTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, alignSelf: 'flex-start', marginBottom: 10 },
  newsTagText: { fontSize: 8, fontWeight: 'bold' },
  newsTitle: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  searchBar: { marginHorizontal: 24, marginTop: 30, backgroundColor: '#111', height: 60, borderRadius: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#FFFFFF05' },
  searchInput: { flex: 1, marginLeft: 12, color: 'white', fontSize: 15, fontWeight: '600' },
  catGrid: { marginHorizontal: 24, marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' },
  catBox: { width: '22%', alignItems: 'center' },
  catIconWrap: { width: 64, height: 64, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  catLabel: { color: '#8E8E93', fontSize: 11, fontWeight: 'bold' },
  sectionHeaderAlt: { marginHorizontal: 24, marginTop: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seeAll: { color: '#00A86B', fontSize: 14, fontWeight: 'bold' },
  trendingScroll: { paddingHorizontal: 24, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  trendingCard: { width: '48%', height: 220, borderRadius: 30, marginBottom: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#FFFFFF05' },
  trendImage: { width: '100%', height: '100%' },
  trendOverlay: { position: 'absolute', inset: 0 },
  trendContent: { position: 'absolute', bottom: 16, left: 16, right: 16 },
  trendTitle: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  trendMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  trendPrice: { color: '#00A86B', fontSize: 16, fontWeight: '900' },
  typeBadge: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  typeText: { color: 'white', fontSize: 8, fontWeight: 'bold' }
});
