import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function OrderScreen({ navigation, route }) {
  const { restaurant } = route.params;
  const [status, setStatus] = useState('preparing'); // preparing -> out-for-delivery -> delivered
  const [progress, setProgress] = useState(0.2);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 1) {
          clearInterval(timer);
          setStatus('delivered');
          return 1;
        }
        if (prev >= 0.6) setStatus('out-for-delivery');
        return prev + 0.1;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getStatusInfo = () => {
    switch(status) {
      case 'preparing': return { icon: 'fast-food-outline', text: 'Preparing meal...', color: '#FDCC0D' };
      case 'out-for-delivery': return { icon: 'bicycle-outline', text: 'Driver on way!', color: '#00A86B' };
      case 'delivered': return { icon: 'home-outline', text: 'Delivered. Enjoy!', color: '#00A86B' };
      default: return { icon: 'time-outline', text: 'Waiting...', color: 'gray' };
    }
  };

  const info = getStatusInfo();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Status</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}>
        
        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={[styles.statusIconCircle, { borderColor: info.color + '30' }]}>
            <Icon name={info.icon} size={48} color={info.color} />
          </View>
          <Text style={styles.statusText}>{info.text}</Text>
          <Text style={styles.orderNumber}>ORDER #KP-992 from {restaurant.name}</Text>
          
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
        </View>

        {/* Driver Section */}
        <View style={styles.driverCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200' }} 
            style={styles.driverImage} 
          />
          <View style={styles.driverMeta}>
            <Text style={styles.driverName}>Rider: Sipho</Text>
            <Text style={styles.driverTime}>ETA: {status === 'delivered' ? '0' : '8'} mins</Text>
          </View>
          <TouchableOpacity style={styles.callBtn}>
            <Icon name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.helpBtn} onPress={() => navigation.navigate('Chat')}>
          <Text style={styles.helpBtnText}>Chat with Support / Rider</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.homeBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeBtnText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 25, flexDirection: 'row', alignItems: 'center' },
  backBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: '900', marginLeft: 20 },
  statusCard: { backgroundColor: '#111', borderRadius: 40, padding: 35, alignItems: 'center', borderWeight: 1, borderColor: '#FFFFFF05' },
  statusIconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center', marginBottom: 20, borderWidth: 1 },
  statusText: { color: 'white', fontSize: 24, fontWeight: '900', textAlign: 'center' },
  orderNumber: { color: '#8E8E93', fontSize: 13, marginTop: 10, fontWeight: 'bold' },
  progressContainer: { width: '100%', height: 6, backgroundColor: '#1A1A1A', borderRadius: 10, marginTop: 40, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#00A86B' },
  driverCard: { backgroundColor: '#1A1A1A', marginTop: 30, padding: 20, borderRadius: 30, flexDirection: 'row', alignItems: 'center', borderWeight: 1, borderColor: '#FFFFFF05' },
  driverImage: { width: 60, height: 60, borderRadius: 20 },
  driverMeta: { flex: 1, marginLeft: 16 },
  driverName: { color: 'white', fontSize: 17, fontWeight: 'bold' },
  driverTime: { color: '#FDCC0D', fontSize: 12, marginTop: 4, fontWeight: 'bold' },
  callBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#00A86B', alignItems: 'center', justifyContent: 'center' },
  helpBtn: { marginTop: 30, backgroundColor: '#111', padding: 24, borderRadius: 30, alignItems: 'center', borderWidth: 1, borderColor: '#FFFFFF05' },
  helpBtnText: { color: '#8E8E93', fontWeight: 'bold', fontSize: 14 },
  homeBtn: { marginTop: 20, backgroundColor: '#00A86B15', padding: 24, borderRadius: 30, alignItems: 'center', borderWidth: 1, borderColor: '#00A86B30' },
  homeBtnText: { color: '#00A86B', fontWeight: '900', fontSize: 14, textTransform: 'uppercase' }
});
