import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ListingDetailScreen({ navigation, route }) {
  const { listingId } = route.params;
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/listings/${listingId}`);
        setListing(res.data);
      } catch (err) {
        console.error("Failed to fetch listing detail", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [listingId]);

  if (loading) return (
    <View style={styles.centerBox}>
      <ActivityIndicator size="large" color="#00A86B" />
    </View>
  );

  if (!listing) return (
    <View style={styles.centerBox}>
      <Text style={styles.errorText}>Listing not found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: listing.image_url || 'https://images.unsplash.com/photo-1543165365-07232ed12faf?q=80&w=600' }} 
        style={styles.heroImage} 
      />
      
      <LinearGradient colors={['transparent', 'rgba(10,10,10,0.8)', '#0A0A0A']} style={styles.imageOverlay} />

      <TouchableOpacity 
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.contentScroll} contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={styles.contentBody}>
          <Text style={styles.title}>{listing.title}</Text>
          
          <View style={styles.tagRow}>
             <View style={styles.tag}><Text style={styles.tagText}>{listing.category.toUpperCase()}</Text></View>
             <View style={styles.tag}><Text style={styles.tagText}>VERIFIED</Text></View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Icon name="location-outline" size={18} color="#8E8E93" />
              <Text style={styles.infoText}>{listing.location}</Text>
            </View>
            <View style={[styles.infoItem, { marginLeft: 20 }]}>
              <Icon name="time-outline" size={18} color="#8E8E93" />
              <Text style={styles.infoText}>Available Now</Text>
            </View>
          </View>

          <View style={styles.priceCard}>
            <View>
              <Text style={styles.priceLabel}>Price from</Text>
              <Text style={styles.priceValue}>R{listing.price}</Text>
            </View>
            <View style={styles.priceDivider} />
            <Text style={styles.priceSub}>All fees included</Text>
          </View>

          <View style={styles.descSection}>
            <Text style={styles.sectionTitle}>About this {listing.type}</Text>
            <Text style={styles.description}>
              {listing.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomCta}>
        <TouchableOpacity 
          style={styles.bookBtn}
          onPress={() => navigation.navigate('Checkout', { listing })}
        >
          <Text style={styles.bookBtnText}>Book Experience</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0A0A' },
  heroImage: { width: '100%', height: 450 },
  imageOverlay: { position: 'absolute', top: 0, left: 0, right: 0, height: 450 },
  backBtn: { position: 'absolute', top: 60, left: 24, width: 45, height: 45, borderRadius: 15, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', borderWeight: 1, borderColor: '#FFFFFF10' },
  contentScroll: { marginTop: -100 },
  contentBody: { paddingHorizontal: 24 },
  title: { color: 'white', fontSize: 32, fontWeight: '900', letterSpacing: -0.5 },
  tagRow: { flexDirection: 'row', marginTop: 15 },
  tag: { backgroundColor: '#1A1A1A', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, marginRight: 8, borderWidth: 1, borderColor: '#FFFFFF10' },
  tagText: { color: '#00A86B', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  infoRow: { flexDirection: 'row', marginTop: 25 },
  infoItem: { flexDirection: 'row', alignItems: 'center' },
  infoText: { color: '#8E8E93', fontSize: 14, marginLeft: 8, fontWeight: '600' },
  priceCard: { backgroundColor: '#111', marginTop: 35, padding: 24, borderRadius: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#FFFFFF05' },
  priceLabel: { color: '#666', fontSize: 12, fontWeight: 'bold', marginBottom: 4 },
  priceValue: { color: 'white', fontSize: 24, fontWeight: '900' },
  priceDivider: { width: 1, height: 40, backgroundColor: '#FFFFFF10' },
  priceSub: { color: '#8E8E93', fontSize: 12, fontStyle: 'italic' },
  descSection: { marginTop: 40 },
  sectionTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  description: { color: '#8E8E93', fontSize: 16, lineHeight: 26, fontWeight: '500' },
  bottomCta: { position: 'absolute', bottom: 40, left: 24, right: 24 },
  bookBtn: { backgroundColor: '#00A86B', height: 70, borderRadius: 25, alignItems: 'center', justifyContent: 'center', shadowColor: '#00A86B', shadowOpacity: 0.3, shadowRadius: 20, elevation: 15 },
  bookBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});
