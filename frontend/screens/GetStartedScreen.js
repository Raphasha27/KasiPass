import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons as Icon } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function GetStartedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#070707', '#121212', '#004D2E']} style={styles.gradient} locations={[0, 0.7, 1]}>
        
        {/* Top Pattern Decoration */}
        <View style={styles.topPattern}>
           <Icon name="grid-outline" size={300} color="rgba(0,168,107,0.05)" style={{ position: 'absolute', top: -100, right: -100 }} />
        </View>

        {/* Branding Area */}
        <View style={styles.brandContainer}>
          <Image 
            source={require('../assets/logo_tech_k.jpg')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>

        {/* Content Area */}
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to{"\n"}<Text style={{color: '#00A86B'}}>KasiPass Hub</Text> 🇿🇦</Text>
          <Text style={styles.subtitle}>
            The official Community Hub for bridging local services, safety, and township growth.
          </Text>

          {/* Value Props */}
          <View style={styles.propsContainer}>
             <View style={styles.propRow}>
                <View style={styles.propIcon}><Icon name="flash" size={20} color="#FDCC0D" /></View>
                <Text style={styles.propText}>Live Loadshedding & Utility Updates</Text>
             </View>
             <View style={styles.propRow}>
                <View style={styles.propIcon}><Icon name="shield-checkmark" size={20} color="#FF3B30" /></View>
                <Text style={styles.propText}>Kasi Guard Emergency SOS Help</Text>
             </View>
             <View style={styles.propRow}>
                <View style={styles.propIcon}><Icon name="card" size={20} color="#00A86B" /></View>
                <Text style={styles.propText}>Local Shopping & Community Rewards</Text>
             </View>
          </View>
        </View>

        {/* Action Area */}
        <View style={styles.actionArea}>
          <TouchableOpacity 
            style={styles.startBtn} 
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <LinearGradient 
              colors={['#00A86B', '#007A4D']} 
              style={styles.btnGradient}
            >
              <Text style={styles.startBtnText}>GET STARTED</Text>
              <Icon name="arrow-forward" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginLink} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>Returning member? <Text style={styles.loginSpan}>Sign In Here</Text></Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, padding: 30, justifyContent: 'space-between' },
  topPattern: { position: 'absolute', top: 0, left: 0, right: 0, height: 200 },
  brandContainer: { flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingTop: 40 },
  logo: { width: width * 0.9, height: width * 0.6 },
  content: { flex: 1.2, justifyContent: 'center' },
  title: { color: 'white', fontSize: 32, fontWeight: '900', lineHeight: 40 },
  subtitle: { color: '#8E8E93', fontSize: 15, marginTop: 15, lineHeight: 22, fontWeight: '500' },
  propsContainer: { marginTop: 30 },
  propRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  propIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  propText: { color: '#E5E5EA', fontSize: 13, fontWeight: '600' },
  actionArea: { paddingBottom: 20 },
  startBtn: { height: 75, borderRadius: 25, overflow: 'hidden', shadowColor: '#00A86B', shadowOpacity: 0.5, shadowRadius: 20, elevation: 15 },
  btnGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  startBtnText: { color: 'white', fontSize: 18, fontWeight: '900', marginRight: 10, letterSpacing: 1.5 },
  loginLink: { marginTop: 20, alignItems: 'center' },
  loginText: { color: '#8E8E93', fontSize: 14, fontWeight: '600' },
  loginSpan: { color: '#FDCC0D', fontWeight: 'bold' }
});
