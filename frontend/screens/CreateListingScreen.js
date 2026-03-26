import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function CreateListingScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Events');
  const [type, setType] = useState('event');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Events', 'Transport', 'Services', 'Marketplace', 'Restaurants'];

  const handleCreate = async () => {
    if (!title || !description || !price || !location) {
      Alert.alert("Missing Fields", "Please fill in all listing details.");
      return;
    }

    setLoading(true);
    try {
      await api.post('/listings/', {
        title,
        description,
        price: parseFloat(price),
        category,
        type,
        location,
        image_url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600' // Default image
      });
      Alert.alert("Success", "Listing created successfully!");
      navigation.goBack();
    } catch (err) {
      console.error("Listing creation failed", err);
      Alert.alert("Error", "Failed to create listing. Make sure you are a vendor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Listing</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}>
        
        <Text style={styles.label}>LISTING TITLE</Text>
        <View style={styles.inputWrapper}>
          <TextInput 
            style={styles.input}
            placeholder="e.g. Ama-Piano Weekend Atteridgeville"
            placeholderTextColor="#444"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <Text style={styles.label}>DESCRIPTION</Text>
        <View style={[styles.inputWrapper, { height: 120, alignItems: 'flex-start', paddingTop: 16 }]}>
          <TextInput 
            style={[styles.input, { height: '100%', textAlignVertical: 'top' }]}
            placeholder="Describe your offer..."
            placeholderTextColor="#444"
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.row}>
          <View style={{ width: '48%' }}>
            <Text style={styles.label}>PRICE (R)</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.input}
                placeholder="0.00"
                placeholderTextColor="#444"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />
            </View>
          </View>
          <View style={{ width: '48%' }}>
            <Text style={styles.label}>LOCATION</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.input}
                placeholder="Section D"
                placeholderTextColor="#444"
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>
        </View>

        <Text style={styles.label}>CATEGORY</Text>
        <View style={styles.categoryRow}>
          {categories.map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.catChip, category === cat && styles.catActive]}
              onPress={() => {
                setCategory(cat);
                if (cat === 'Events') setType('event');
                else if (cat === 'Transport') setType('transport');
                else setType('service');
              }}
            >
              <Text style={[styles.catText, category === cat && styles.catActiveText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.submitBtn, loading && { opacity: 0.6 }]}
          onPress={handleCreate}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.submitText}>Launch Listing</Text>}
        </TouchableOpacity>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 30, flexDirection: 'row', alignItems: 'center' },
  backBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: '900', marginLeft: 20 },
  label: { color: '#444', fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginBottom: 12, marginTop: 10 },
  inputWrapper: { backgroundColor: '#111', height: 65, borderRadius: 20, paddingHorizontal: 20, justifyContent: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#FFFFFF05' },
  input: { color: 'white', fontSize: 16, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  catChip: { backgroundColor: '#1A1A1A', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 15, marginRight: 10, marginBottom: 10, borderWidth: 1, borderColor: '#FFFFFF05' },
  catActive: { backgroundColor: '#00A86B20', borderColor: '#00A86B80' },
  catText: { color: '#8E8E93', fontWeight: 'bold', fontSize: 13 },
  catActiveText: { color: 'white' },
  submitBtn: { backgroundColor: '#00A86B', height: 70, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginTop: 30, shadowColor: '#00A86B', shadowOpacity: 0.3, shadowRadius: 20, elevation: 15 },
  submitText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});
