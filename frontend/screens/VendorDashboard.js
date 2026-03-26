import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image, StyleSheet, Dimensions } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function VendorDashboard({ navigation }) {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchVendorListings();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchVendorListings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/listings/');
      const myItems = res.data.filter(l => l.owner_id === user?.id);
      setListings(myItems);
    } catch (err) {
      console.error("Failed to fetch vendor listings", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Vendor Hub</Text>
          <Text style={styles.headerSub}>Manage your Kasi Business</Text>
        </View>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}>
        
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>REVENUE</Text>
            <Text style={styles.statValue}>R{listings.reduce((acc, curr) => acc + curr.price, 0) * 1.5}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>LISTINGS</Text>
            <Text style={styles.statValue}>{listings.length}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity 
          style={styles.primaryAction}
          onPress={() => navigation.navigate('CreateListing')}
        >
          <LinearGradient colors={['#00A86B', '#007A48']} style={styles.actionGradient}>
            <View style={styles.actionIconBox}>
              <Icon name="add" size={32} color="white" />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.actionTitle}>Create New Listing</Text>
              <Text style={styles.actionSub}>Post a deal, event or service</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryAction}
          onPress={() => Alert.alert("Coming Soon", "Analytics and Booking management are being polished!")}
        >
          <View style={[styles.actionIconBox, { backgroundColor: '#FFFFFF08' }]}>
            <Icon name="stats-chart-outline" size={24} color="#8E8E93" />
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.secondaryTitle}>Insights & Analytics</Text>
            <Text style={styles.secondarySub}>Track your reach in the community</Text>
          </View>
        </TouchableOpacity>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Current Listings</Text>
          <TouchableOpacity onPress={fetchVendorListings}>
            <Icon name="refresh-outline" size={20} color="#00A86B" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator color="#00A86B" style={{ marginTop: 20 }} />
        ) : (
          listings.map(item => (
            <TouchableOpacity key={item.id} style={styles.listingCard}>
              <Image source={{ uri: item.image_url || 'https://images.unsplash.com/photo-1543165365-07232ed12faf?q=80&w=200' }} style={styles.listingImage} />
              <View style={styles.listingInfo}>
                <Text style={styles.listingTitle}>{item.title}</Text>
                <Text style={styles.listingMeta}>R{item.price} • {item.category}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>ACTIVE</Text>
              </View>
            </TouchableOpacity>
          ))
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 28, fontWeight: '900' },
  headerSub: { color: '#8E8E93', fontSize: 13, fontWeight: '600', marginTop: 4 },
  backBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  statCard: { backgroundColor: '#111', width: '48%', padding: 20, borderRadius: 25, alignItems: 'center', borderWidth: 1, borderColor: '#FFFFFF05' },
  statLabel: { color: '#444', fontSize: 10, fontWeight: '900', letterSpacing: 1.5 },
  statValue: { color: '#00A86B', fontSize: 24, fontWeight: '900', marginTop: 8 },
  primaryAction: { height: 100, borderRadius: 30, overflow: 'hidden', marginBottom: 15, shadowColor: '#00A86B', shadowOpacity: 0.2, shadowRadius: 15, elevation: 10 },
  actionGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24 },
  actionIconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  actionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  actionSub: { color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 4, fontWeight: '600' },
  secondaryAction: { backgroundColor: '#111', height: 90, borderRadius: 25, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginBottom: 35, borderWidth: 1, borderColor: '#FFFFFF05' },
  secondaryTitle: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  secondarySub: { color: '#444', fontSize: 11, marginTop: 4, fontWeight: 'bold' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  listingCard: { backgroundColor: '#111', padding: 12, borderRadius: 25, flexDirection: 'row', alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#FFFFFF05' },
  listingImage: { width: 60, height: 60, borderRadius: 18 },
  listingInfo: { flex: 1, marginLeft: 16 },
  listingTitle: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  listingMeta: { color: '#8E8E93', fontSize: 12, marginTop: 4, fontWeight: '600' },
  statusBadge: { backgroundColor: '#00A86B15', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { color: '#00A86B', fontSize: 10, fontWeight: 'bold' }
});
