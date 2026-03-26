import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, Alert, StyleSheet, Dimensions } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const RESTAURANTS = [
  { id: '1', name: 'Soweto Grillhouse', cuisine: 'Braai & Grill', rating: 4.8, distance: '1.2km', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400' },
  { id: '2', name: 'Kasi Wings & Fries', cuisine: 'Fast Food', rating: 4.5, distance: '0.8km', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=400' },
  { id: '3', name: 'Mammas Kitchen', cuisine: 'Traditional', rating: 4.9, distance: '2.5km', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400' },
];

export default function RestaurantScreen({ navigation }) {
  const handleOrder = (res) => {
    Alert.alert(
      "Confirm Order", 
      `Total: R125.00 for a combo meal from ${res.name}. Order now?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm Payment", 
          onPress: () => {
             Alert.alert("Success", "Order placed successfully!");
             navigation.navigate('Order', { restaurant: res });
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => handleOrder(item)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.imageOverlay} />
      
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <View style={styles.ratingBadge}>
            <Icon name="star" size={14} color="#FDCC0D" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.cuisineText}>{item.cuisine} • {item.distance} away</Text>
        
        <TouchableOpacity style={styles.orderBtn} onPress={() => handleOrder(item)}>
          <Text style={styles.orderBtnText}>Order Meal • R125</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Local Kasi Food</Text>
      </View>

      <FlatList
        data={RESTAURANTS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
        ListHeaderComponent={<Text style={styles.headerSub}>Support your local township entrepreneurs 🇿🇦</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 25, flexDirection: 'row', alignItems: 'center' },
  backBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: '900', marginLeft: 20 },
  headerSub: { color: '#444', fontSize: 13, fontWeight: 'bold', marginBottom: 25, letterSpacing: 1 },
  card: { backgroundColor: '#111', borderRadius: 30, overflow: 'hidden', marginBottom: 25, borderWidth: 1, borderColor: '#FFFFFF05' },
  cardImage: { width: '100%', height: 200 },
  imageOverlay: { position: 'absolute', top: 0, left: 0, right: 0, height: 200 },
  cardBody: { padding: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  restaurantName: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  ratingText: { color: 'white', fontSize: 13, fontWeight: 'bold', marginLeft: 6 },
  cuisineText: { color: '#8E8E93', fontSize: 13, marginTop: 4, fontWeight: '600' },
  orderBtn: { backgroundColor: '#00A86B', marginTop: 20, height: 55, borderRadius: 18, alignItems: 'center', justifyContent: 'center', shadowColor: '#00A86B', shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  orderBtnText: { color: 'white', fontSize: 15, fontWeight: 'bold' }
});
