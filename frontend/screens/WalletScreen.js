import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function WalletScreen() {
  const [balance, setBalance] = useState(4250);

  const transactions = [
    { id: '1', name: 'Airtime Top-up', desc: 'R50', amount: '-R50', icon: 'phone-portrait-outline', color: '#00A86B' },
    { id: '2', name: 'Spaza Payment', desc: 'R120', amount: '-R120', icon: 'basket-outline', color: '#FDCC0D' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wallet</Text>
          <Text style={styles.logoText}>Kasi<Text style={{color: '#00A86B'}}>Pass</Text></Text>
        </View>

        {/* Balance Card */}
        <LinearGradient colors={['#00A86B', '#007A48']} style={styles.balanceCard}>
           <Text style={styles.balanceLabel}>Total Balance</Text>
           <Text style={styles.balanceAmount}>R{balance.toLocaleString()}</Text>
           <View style={styles.balanceFooter}>
              <Text style={styles.cardNumber}>**** **** **** 4250</Text>
              <Icon name="logo-mastercard" size={32} color="white" />
           </View>
        </LinearGradient>

        {/* Ticket Card (Kasi Vibez Festival) */}
        <View style={styles.ticketCard}>
           <LinearGradient colors={['#1A1A1A', '#0A0A0A']} style={styles.ticketContent}>
              <View style={styles.ticketHeader}>
                 <Text style={styles.ticketEvent}>KASI VIBEZ FESTIVAL</Text>
                 <Text style={styles.ticketDate}>Sat, Oct 26 | 18:00 | Soweto</Text>
              </View>
              
              <View style={styles.ticketMain}>
                 <View style={styles.ticketDetails}>
                    <View>
                        <Text style={styles.detailLabel}>Event Title</Text>
                        <Text style={styles.detailValue}>Sat, Oct 26</Text>
                    </View>
                    <View>
                        <Text style={styles.detailLabel}>Date</Text>
                        <Text style={styles.detailValue}>18:00</Text>
                    </View>
                    <View>
                        <Text style={styles.detailLabel}>Venue</Text>
                        <Text style={styles.detailValue}>Seating</Text>
                    </View>
                 </View>

                 <View style={styles.qrContainer}>
                    {/* Simplified QR Placeholder */}
                    <View style={styles.qrBox}>
                      <Icon name="qr-code" size={100} color="black" />
                      <Text style={styles.qrText}>KASIPASS</Text>
                    </View>
                    <Text style={styles.transactionId}>Transaction ID: KASIPW3358</Text>
                 </View>
              </View>
           </LinearGradient>
        </View>

        {/* Active Passes Section */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Active Passes</Text>
           <View style={styles.badge}><Text style={styles.badgeText}>1</Text></View>
        </View>

        {/* Recent Transactions Section */}
        <Text style={styles.sectionTitleAlt}>Recent Transactions</Text>
        <View style={styles.transactionList}>
           {transactions.map(item => (
             <TouchableOpacity key={item.id} style={styles.transactionItem}>
                <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                   <Icon name={item.icon} size={24} color={item.color} />
                </View>
                <View style={styles.transInfo}>
                   <Text style={styles.transName}>{item.name}</Text>
                   <Text style={styles.transDesc}>{item.desc}</Text>
                </View>
                <Text style={styles.transAmount}>{item.amount}</Text>
             </TouchableOpacity>
           ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { paddingHorizontal: 24, paddingTop: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#1A1A1A' },
  logoText: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  balanceCard: { marginHorizontal: 24, height: 160, borderRadius: 30, padding: 24, justifyContent: 'space-between', shadowColor: '#00A86B', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 15 },
  balanceLabel: { color: '#E0E0E0', fontSize: 14, fontWeight: '600' },
  balanceAmount: { color: 'white', fontSize: 32, fontWeight: '900' },
  balanceFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardNumber: { color: 'white', fontSize: 16, fontWeight: '500', letterSpacing: 2 },
  ticketCard: { marginHorizontal: 24, marginTop: 25, borderRadius: 30, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10 },
  ticketContent: { padding: 24 },
  ticketHeader: { marginBottom: 20 },
  ticketEvent: { color: '#FDCC0D', fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  ticketDate: { color: '#AAAAAA', fontSize: 11, marginTop: 4, fontWeight: 'bold' },
  ticketMain: { flexDirection: 'column' },
  ticketDetails: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#FFFFFF10' },
  detailLabel: { color: '#666', fontSize: 10, marginBottom: 4, fontWeight: 'bold' },
  detailValue: { color: 'white', fontSize: 13, fontWeight: 'bold' },
  qrContainer: { alignItems: 'center' },
  qrBox: { backgroundColor: 'white', padding: 15, borderRadius: 20, alignItems: 'center', width: 140 },
  qrText: { fontSize: 8, fontWeight: 'bold', color: 'black', marginTop: -5 },
  transactionId: { color: '#666', fontSize: 9, marginTop: 12, fontWeight: 'bold' },
  sectionHeader: { marginHorizontal: 24, marginTop: 35, flexDirection: 'row', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1C1C1E' },
  badge: { backgroundColor: '#F2F2F7', width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginLeft: 10 },
  badgeText: { fontSize: 12, fontWeight: 'bold', color: '#1C1C1E' },
  sectionTitleAlt: { marginHorizontal: 24, marginTop: 25, fontSize: 16, fontWeight: 'bold', color: '#8E8E93' },
  transactionList: { marginHorizontal: 24, marginTop: 15 },
  transactionItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  iconBox: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  transInfo: { flex: 1, marginLeft: 15 },
  transName: { fontSize: 15, fontWeight: 'bold', color: '#1C1C1E' },
  transDesc: { fontSize: 12, color: '#8E8E93', marginTop: 2 },
  transAmount: { fontSize: 15, fontWeight: 'bold', color: '#1C1C1E' }
});
