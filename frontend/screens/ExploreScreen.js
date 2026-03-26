import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const FILTER_ITEMS = ['Near Me', 'Popular', 'Low Price', 'VIP Access'];

export default function ExploreScreen({ navigation, route }) {
  const category = route.params?.category || 'All';
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const params = {};
        if (category !== 'All') params.category = category;
        const res = await api.get('/listings/', { params });
        setListings(res.data);
      } catch (err) {
        console.error("Failed to fetch listings", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  const filteredListings = listings.filter(l => 
    l.title.toLowerCase().includes(search.toLowerCase()) || 
    l.description.toLowerCase().includes(search.toLowerCase())
  );

  const renderListing = ({ item, index }) => {
    const isHot = index % 3 === 0;
    return (
      <TouchableOpacity 
        style={styles.listingCard}
        onPress={() => navigation.navigate('ListingDetail', { listingId: item.id })}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image_url || 'https://images.unsplash.com/photo-1543165365-07232ed12faf?q=80&w=400' }} style={styles.listingImage} />
          {isHot && (
            <LinearGradient colors={['#FF3B30', '#FF2D55']} style={styles.hotBadge}>
              <Text style={styles.hotText}>TRENDING 🔥</Text>
            </LinearGradient>
          )}
        </View>
        
        <View style={styles.listingInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.listingTitle} numberOfLines={1}>{item.title}</Text>
            <View style={styles.verifiedBox}>
              <Icon name="checkmark-circle" size={14} color="#00A86B" />
            </View>
          </View>
          
          <View style={styles.listingMeta}>
            <Icon name="location-sharp" size={12} color="#00A86B" />
            <Text style={styles.metaText}> {item.location} • 1.2km away</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.listingPrice}>R{item.price}</Text>
            <View style={styles.offerBadge}>
              <Text style={styles.offerText}>Best Deal</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.actionIcon}>
          <Icon name="heart-outline" size={20} color="#8E8E93" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header & Search */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Icon name="search-outline" size={20} color="#444" />
          <TextInput 
            placeholder={`Search ${category} in Atteridgeville...`} 
            placeholderTextColor="#444"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {FILTER_ITEMS.map(item => (
            <TouchableOpacity key={item} style={[styles.filterChip, item === 'Near Me' && styles.filterChipActive]}>
              <Text style={[styles.filterText, item === 'Near Me' && styles.filterTextActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#00A86B" />
        </View>
      ) : (
        <FlatList
          data={filteredListings}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderListing}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 150 }}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Icon name="telescope-outline" size={64} color="#111" />
              <Text style={styles.emptyText}>Nothing found in {category}</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 25 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', height: 60, borderRadius: 22, paddingHorizontal: 20, borderWidth: 1, borderColor: '#FFFFFF05' },
  searchInput: { flex: 1, marginLeft: 12, color: 'white', fontSize: 16, fontWeight: '600' },
  filterScroll: { marginTop: 25 },
  filterChip: { backgroundColor: '#111', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 18, marginRight: 12, borderWidth: 1, borderColor: '#FFFFFF05' },
  filterChipActive: { backgroundColor: '#00A86B20', borderColor: '#00A86B80' },
  filterText: { color: '#8E8E93', fontWeight: 'bold', fontSize: 13 },
  filterTextActive: { color: '#00A86B' },
  loadingBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listingCard: { flexDirection: 'row', backgroundColor: '#111', marginBottom: 20, padding: 14, borderRadius: 28, alignItems: 'center', borderWidth: 1, borderColor: '#FFFFFF05' },
  imageContainer: { position: 'relative' },
  listingImage: { width: 100, height: 100, borderRadius: 22 },
  hotBadge: { position: 'absolute', top: -5, left: -5, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, shadowColor: '#FF3B30', shadowOpacity: 0.5, shadowRadius: 10 },
  hotText: { color: 'white', fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  listingInfo: { flex: 1, marginLeft: 18 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  listingTitle: { color: 'white', fontSize: 17, fontWeight: 'bold' },
  verifiedBox: { marginLeft: 6 },
  listingMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  metaText: { color: '#8E8E93', fontSize: 11, fontWeight: '700' },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  listingPrice: { color: 'white', fontSize: 18, fontWeight: '900' },
  offerBadge: { backgroundColor: '#00A86B15', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginLeft: 10 },
  offerText: { color: '#00A86B', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  actionIcon: { padding: 10 },
  emptyBox: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#222', fontSize: 16, fontWeight: 'bold', marginTop: 20 }
});
