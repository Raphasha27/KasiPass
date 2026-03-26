import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, StyleSheet, Dimensions } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function CheckoutScreen({ navigation, route }) {
  const { listing } = route.params;
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('paystack');

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await api.post('/bookings/', {
        listing_id: listing.id
      });
      
      Alert.alert(
        "Payment Successful!", 
        `Your ticket for ${listing.title} is now in your wallet.`,
        [{ text: "View Ticket", onPress: () => navigation.navigate('Wallet') }]
      );
    } catch (err) {
      console.error("Booking failed", err);
      Alert.alert("Error", "Failed to complete booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const serviceFee = listing.price * 0.05;
  const total = listing.price + serviceFee;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.contentScroll} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}>
        
        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionLabel}>ORDER SUMMARY</Text>
          <View style={styles.summaryRow}>
             <Text style={styles.itemTitle}>{listing.title}</Text>
             <Text style={styles.itemPrice}>R{listing.price.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
             <Text style={styles.feeTitle}>Platform Service Fee (5%)</Text>
             <Text style={styles.feePrice}>R{serviceFee.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
             <Text style={styles.totalTitle}>Amount Due</Text>
             <Text style={styles.totalPrice}>R{total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <Text style={[styles.sectionLabel, { marginTop: 40, marginBottom: 20 }]}>CHOOSE PAYMENT METHOD</Text>
        
        <TouchableOpacity 
          style={[styles.methodCard, method === 'paystack' && styles.methodActive]} 
          onPress={() => setMethod('paystack')}
        >
          <View style={styles.methodTitleWrap}>
             <View style={[styles.iconBox, { backgroundColor: '#00A86B' }]}>
                <Icon name="card" size={20} color="white" />
             </View>
             <Text style={styles.methodName}>Paystack FastPay</Text>
          </View>
          <Icon 
            name={method === 'paystack' ? "radio-button-on" : "radio-button-off"} 
            size={24} 
            color={method === 'paystack' ? '#00A86B' : '#333'} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.methodCard, method === 'wallet' && styles.methodActive]} 
          onPress={() => setMethod('wallet')}
        >
          <View style={styles.methodTitleWrap}>
             <View style={[styles.iconBox, { backgroundColor: '#1A1A1A' }]}>
                <Icon name="wallet" size={20} color="#8E8E93" />
             </View>
             <Text style={styles.methodName}>Digital Kasi Wallet</Text>
          </View>
          <Icon 
            name={method === 'wallet' ? "radio-button-on" : "radio-button-off"} 
            size={24} 
            color={method === 'wallet' ? '#00A86B' : '#333'} 
          />
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
           By clicking confirm, you agree to the KasiPass Terms of Service and Atteridgeville Community Guidelines.
        </Text>

      </ScrollView>

      {/* Confirmation Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.confirmBtn, loading && { opacity: 0.6 }]}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.confirmText}>Confirm Payment • R{total.toFixed(2)}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 25, flexDirection: 'row', alignItems: 'center' },
  backBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: '900', marginLeft: 20 },
  contentScroll: { flex: 1 },
  summaryCard: { backgroundColor: '#111', borderRadius: 30, padding: 24, borderWidth: 1, borderColor: '#FFFFFF05' },
  sectionLabel: { color: '#444', fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginBottom: 15 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  itemTitle: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  itemPrice: { color: 'white', fontSize: 16, fontWeight: '900' },
  feeTitle: { color: '#8E8E93', fontSize: 13, fontWeight: '600' },
  feePrice: { color: '#8E8E93', fontSize: 13, fontWeight: '900' },
  divider: { height: 1, backgroundColor: '#FFFFFF05', marginVertical: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  totalTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  totalPrice: { color: '#00A86B', fontSize: 24, fontWeight: '900' },
  methodCard: { backgroundColor: '#111', height: 75, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 15, borderWidth: 1, borderColor: '#FFFFFF05' },
  methodActive: { borderColor: '#00A86B50', backgroundColor: '#00A86B08' },
  methodTitleWrap: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  methodName: { color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 16 },
  disclaimer: { color: '#444', fontSize: 10, textAlign: 'center', marginTop: 30, lineHeight: 16, fontWeight: 'bold' },
  footer: { padding: 24, paddingBottom: 45, backgroundColor: '#0A0A0A' },
  confirmBtn: { backgroundColor: '#00A86B', height: 70, borderRadius: 25, alignItems: 'center', justifyContent: 'center', shadowColor: '#00A86B', shadowOpacity: 0.3, shadowRadius: 20, elevation: 15 },
  confirmText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});
