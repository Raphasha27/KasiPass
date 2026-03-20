import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const VirtualCard = ({ balance, name }) => (
  <View style={styles.cardContainer}>
    <LinearGradient
      colors={['#1A1A1A', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.virtualCard}
    >
      <View style={styles.cardHeader}>
        <View style={styles.chipWrapper}>
          <LinearGradient colors={['#D4AF37', '#FFDF00']} style={styles.chip} />
          <Icon name="wifi-outline" size={20} color="#FFFFFF40" style={styles.wireless} />
        </View>
        <Text style={styles.cardType}>KasiPass <Text style={{color: '#00A86B'}}>PREMIUM</Text></Text>
      </View>

      <View style={styles.cardNumberContainer}>
        <Text style={styles.cardNumber}>4250  8821  9012  5538</Text>
      </View>

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardLabel}>CARD HOLDER</Text>
          <Text style={styles.cardHolderName}>{name.toUpperCase()}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.cardLabel}>EXPIRES</Text>
          <Text style={styles.cardExpiry}>12 / 28</Text>
        </View>
        <Icon name="logo-bitcoin" size={30} color="#00A86B" style={{position: 'absolute', right: 0, bottom: -5, opacity: 0.6}} />
      </View>
    </LinearGradient>
  </View>
);

export default function WalletScreen() {
  const [balance, setBalance] = useState(4250.00);

  const transactions = [
    { id: '1', name: 'Airtime Top-up', desc: 'Soweto Central', amount: '-R50.00', icon: 'phone-portrait-outline', color: '#00A86B' },
    { id: '2', name: 'Spaza Payment', desc: 'Atteridgeville Corner', amount: '-R120.00', icon: 'basket-outline', color: '#FDCC0D' },
    { id: '3', name: 'Event Ticket', desc: 'Kasi Vibez Festival', amount: '-R350.00', icon: 'ticket-outline', color: '#FF3B30' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSub}>Personal Wallet</Text>
            <Text style={styles.headerTitle}>My Digital Pay</Text>
          </View>
          <TouchableOpacity style={styles.addBtn}>
            <Icon name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Virtual Card */}
        <VirtualCard balance={balance} name="Thabo Mchize" />

        {/* Balance Stat */}
        <View style={styles.balanceSummary}>
           <Text style={styles.summaryLabel}>Total Available Balance</Text>
           <Text style={styles.summaryAmount}>R{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actionRow}>
           <TouchableOpacity style={styles.actionBtn}>
              <View style={[styles.actionIcon, {backgroundColor: '#00A86B'}]}><Icon name="arrow-up" size={20} color="white" /></View>
              <Text style={styles.actionText}>Send</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.actionBtn}>
              <View style={[styles.actionIcon, {backgroundColor: '#FDCC0D'}]}><Icon name="qr-code-outline" size={20} color="black" /></View>
              <Text style={styles.actionText}>Scan</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.actionBtn}>
              <View style={[styles.actionIcon, {backgroundColor: '#444'}]}><Icon name="wallet-outline" size={20} color="white" /></View>
              <Text style={styles.actionText}>Top Up</Text>
           </TouchableOpacity>
        </View>

        {/* Transactions */}
        <View style={styles.transactionSection}>
           <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity><Text style={styles.seeAll}>History</Text></TouchableOpacity>
           </View>
           
           <View style={styles.transactionList}>
              {transactions.map(item => (
                <TouchableOpacity key={item.id} style={styles.transactionItem}>
                   <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                      <Icon name={item.icon} size={22} color={item.color} />
                   </View>
                   <View style={styles.transInfo}>
                      <Text style={styles.transName}>{item.name}</Text>
                      <Text style={styles.transDesc}>{item.desc}</Text>
                   </View>
                   <Text style={[styles.transAmount, {color: item.amount.startsWith('+') ? '#00A86B' : 'white'}]}>{item.amount}</Text>
                </TouchableOpacity>
              ))}
           </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  header: { paddingHorizontal: 24, paddingTop: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  headerSub: { color: '#8E8E93', fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  headerTitle: { fontSize: 28, fontWeight: '900', color: 'white' },
  addBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center', borderWeight: 1, borderColor: '#FFFFFF10' },
  
  cardContainer: { paddingHorizontal: 24, marginBottom: 40 },
  virtualCard: { height: 210, borderRadius: 28, padding: 24, justifyContent: 'space-between', borderWidth: 1, borderColor: '#FFFFFF15', shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.5, shadowRadius: 30, elevation: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chipWrapper: { flexDirection: 'row', alignItems: 'center' },
  chip: { width: 45, height: 32, borderRadius: 6, marginRight: 15 },
  wireless: { transform: [{ rotate: '90deg' }] },
  cardType: { color: 'white', fontSize: 14, fontWeight: '900', letterSpacing: 0.5 },
  
  cardNumberContainer: { marginVertical: 10 },
  cardNumber: { color: 'white', fontSize: 20, fontWeight: '700', letterSpacing: 3, textShadowColor: '#000', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 4 },
  
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative' },
  cardLabel: { color: '#8E8E93', fontSize: 9, fontWeight: 'bold', marginBottom: 4 },
  cardHolderName: { color: 'white', fontSize: 13, fontWeight: 'bold', letterSpacing: 1 },
  cardExpiry: { color: 'white', fontSize: 13, fontWeight: 'bold' },

  balanceSummary: { paddingHorizontal: 24, marginBottom: 30 },
  summaryLabel: { color: '#8E8E93', fontSize: 14, fontWeight: '600', marginBottom: 5 },
  summaryAmount: { color: 'white', fontSize: 36, fontWeight: '900' },

  actionRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, marginBottom: 40 },
  actionBtn: { alignItems: 'center' },
  actionIcon: { width: 55, height: 55, borderRadius: 27, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  actionText: { color: '#8E8E93', fontSize: 12, fontWeight: 'bold' },

  transactionSection: { backgroundColor: '#111', borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 24, flex: 1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  seeAll: { color: '#00A86B', fontWeight: 'bold', fontSize: 14 },
  transactionList: {},
  transactionItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  iconBox: { width: 50, height: 50, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  transInfo: { flex: 1, marginLeft: 16 },
  transName: { fontSize: 16, fontWeight: 'bold', color: 'white' },
  transDesc: { fontSize: 12, color: '#8E8E93', marginTop: 4 },
  transAmount: { fontSize: 16, fontWeight: 'bold' }
});
