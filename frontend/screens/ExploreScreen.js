import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import api from '../services/api';

const FILTER_ITEMS = ['Near Me', 'Today', 'Price: Low to High', 'VIP Only'];

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

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Icon name="search-outline" size={20} color="#8E8E93" />
          <TextInput 
            placeholder={`Search in ${category}...`} 
            placeholderTextColor="#8E8E93"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {FILTER_ITEMS.map(item => (
            <TouchableOpacity key={item} style={styles.filterChip}>
              <Text style={styles.filterText}>{item}</Text>
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
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.listingCard}
              onPress={() => navigation.navigate('ListingDetail', { listingId: item.id })}
            >
              <Image source={{ uri: item.image_url || 'https://images.unsplash.com/photo-1543165365-07232ed12faf?q=80&w=400' }} style={styles.listingImage} />
              <View style={styles.listingInfo}>
                <Text style={styles.listingTitle} numberOfLines={1}>{item.title}</Text>
                <View style={styles.listingMeta}>
                  <Icon name="star" size={12} color="#FDCC0D" />
                  <Text style={styles.metaText}> 4.8 • {item.location}</Text>
                </View>
                <Text style={styles.listingPrice}>R{item.price}</Text>
              </View>
              <TouchableOpacity style={styles.addBtn}>
                <Icon name="chevron-forward" size={18} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Icon name="search-outline" size={64} color="#1A1A1A" />
              <Text style={styles.emptyText}>No listings found in {category}</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  searchHeader: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', height: 55, borderRadius: 20, paddingHorizontal: 16, borderWeight: 1, borderColor: '#FFFFFF05' },
  searchInput: { flex: 1, marginLeft: 12, color: 'white', fontSize: 16, fontWeight: '600' },
  filterScroll: { marginTop: 20 },
  filterChip: { backgroundColor: '#1A1A1A', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 15, marginRight: 10, borderWidth: 1, borderColor: '#FFFFFF05' },
  filterText: { color: '#8E8E93', fontWeight: 'bold', fontSize: 13 },
  loadingBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listingCard: { flexDirection: 'row', backgroundColor: '#111', marginBottom: 20, padding: 12, borderRadius: 25, alignItems: 'center', borderWidth: 1, borderColor: '#FFFFFF05' },
  listingImage: { width: 90, height: 90, borderRadius: 20 },
  listingInfo: { flex: 1, marginLeft: 16 },
  listingTitle: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  listingMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  metaText: { color: '#8E8E93', fontSize: 11, fontWeight: '600' },
  listingPrice: { color: '#00A86B', fontSize: 16, fontWeight: '900', marginTop: 8 },
  addBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' },
  emptyBox: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#333', fontSize: 16, fontWeight: 'bold', marginTop: 20 }
});
