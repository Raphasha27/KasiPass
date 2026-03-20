import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/listings/');
        setListings(res.data.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch listings", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const categories = [
    { id: '1', name: 'Events', icon: 'calendar', color: '#FDCC0D', desc: 'Modern description', screen: 'Explore' },
    { id: '2', name: 'Transport', icon: 'bus', color: '#00A86B', desc: 'Transport and description', screen: 'TaxiTracking' },
    { id: '3', name: 'Services', icon: 'settings', color: '#4CD964', desc: 'Services description', screen: 'Explore' },
    { id: '4', name: 'Security', icon: 'shield-sharp', color: '#FF3B30', desc: 'SDU Protection', screen: 'Security' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi, {user?.full_name?.split(' ')[0] || 'Thabo'}!</Text>
          </View>
          <TouchableOpacity style={styles.profileBadge}>
             <Text style={styles.profileInitials}>TM</Text>
             <View style={styles.onlineDot} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} color="#8E8E93" />
          <TextInput 
            placeholder="Explore Kasi..." 
            placeholderTextColor="#8E8E93"
            style={styles.searchInput}
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map(cat => (
            <TouchableOpacity 
              key={cat.id} 
              style={styles.categoryCard}
              onPress={() => navigation.navigate(cat.screen)}
            >
              <View style={[styles.iconBox, { backgroundColor: cat.color }]}>
                <Icon name={cat.icon} size={24} color="white" />
              </View>
              <Text style={styles.catName}>{cat.name}</Text>
              <Text style={styles.catDesc} numberOfLines={1}>{cat.desc}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Deals</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Deals Grid */}
        <View style={styles.dealsGrid}>
          {loading ? (
            <ActivityIndicator color="#00A86B" style={{ marginTop: 20 }} />
          ) : (
            listings.map(item => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.dealCard}
                onPress={() => navigation.navigate('ListingDetail', { listingId: item.id })}
              >
                <Image source={{ uri: item.image_url || 'https://images.unsplash.com/photo-1543165365-07232ed12faf?q=80&w=400' }} style={styles.dealImage} />
                <View style={styles.dealInfo}>
                  <Text style={styles.dealTitle} numberOfLines={1}>{item.title}</Text>
                  <View style={styles.ratingRow}>
                    <Icon name="star" size={12} color="#FDCC0D" />
                    <Icon name="star" size={12} color="#FDCC0D" />
                    <Icon name="star" size={12} color="#FDCC0D" />
                    <Icon name="star" size={12} color="#FDCC0D" />
                    <Text style={styles.ratingText}> Rating</Text>
                  </View>
                  <View style={styles.dealFooter}>
                    <View style={styles.distRow}>
                      <Icon name="location-outline" size={12} color="#8E8E93" />
                      <Text style={styles.distText}> Distance</Text>
                    </View>
                    <Text style={styles.priceText}>R{item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { paddingHorizontal: 20, paddingTop: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 24, fontWeight: '900', color: '#1A1A1A' },
  profileBadge: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E5EA', alignItems: 'center', justifyContent: 'center' },
  profileInitials: { fontWeight: 'bold', color: '#8E8E93' },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: 5, backgroundColor: '#4CD964', borderWeight: 2, borderColor: 'white' },
  searchContainer: { marginHorizontal: 20, marginTop: 20, backgroundColor: '#F2F2F7', borderRadius: 15, paddingHorizontal: 15, height: 50, flexDirection: 'row', alignItems: 'center' },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, fontWeight: '500' },
  categoryScroll: { marginTop: 25, paddingLeft: 20 },
  categoryCard: { width: 110, height: 120, marginRight: 15, backgroundColor: 'white', borderRadius: 20, padding: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 5, borderWidth: 1, borderColor: '#F2F2F7' },
  iconBox: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  catName: { fontSize: 13, fontWeight: 'bold', color: '#1C1C1E' },
  catDesc: { fontSize: 9, color: '#8E8E93', marginTop: 4 },
  sectionHeader: { marginHorizontal: 20, marginTop: 35, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1C1C1E' },
  seeAll: { fontSize: 14, color: '#00A86B', fontWeight: 'bold' },
  dealsGrid: { paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  dealCard: { width: '48%', backgroundColor: 'white', borderRadius: 25, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 5, overflow: 'hidden' },
  dealImage: { width: '100%', height: 120 },
  dealInfo: { padding: 12 },
  dealTitle: { fontWeight: 'bold', fontSize: 14, color: '#1C1C1E' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  ratingText: { fontSize: 10, color: '#8E8E93', marginLeft: 4 },
  dealFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  distRow: { flexDirection: 'row', alignItems: 'center' },
  distText: { fontSize: 10, color: '#8E8E93' },
  priceText: { fontSize: 14, fontWeight: 'bold', color: '#00A86B' }
});
