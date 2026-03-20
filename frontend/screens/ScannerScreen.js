import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../services/api';

export default function ScannerScreen({ navigation, route }) {
  const manualQr = route.params?.qr;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const validateTicket = async (data) => {
    setLoading(true);
    try {
      const res = await api.post(`/bookings/validate/${data}`);
      if (res.data.status === 'success') {
        Alert.alert("✅ Verified", res.data.message);
      } else {
        Alert.alert("❌ Failed", res.data.message);
      }
    } catch (err) {
      console.error("Validation failed", err);
      Alert.alert("Error", "Invalid ticket or server error.");
    } finally {
      setLoading(false);
      setScanned(false);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    validateTicket(data);
  };

  if (hasPermission === null) {
    return <View className="flex-1 justify-center items-center"><Text>Requesting for camera permission</Text></View>;
  }
  if (hasPermission === false) {
    return (
      <View className="flex-1 justify-center items-center p-10">
        <Icon name="camera-outline" size={64} color="gray" />
        <Text className="text-center mt-4">No access to camera. Please enable it in settings to scan tickets.</Text>
        <TouchableOpacity className="mt-8 bg-primary px-8 py-3 rounded-xl" onPress={() => navigation.goBack()}>
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {!scanned && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          className="flex-1"
        />
      )}
      
      {loading && (
        <View className="absolute inset-0 bg-black/50 justify-center items-center">
          <ActivityIndicator size="large" color="#00A86B" />
          <Text className="text-white mt-4 font-bold">Validating...</Text>
        </View>
      )}

      <TouchableOpacity 
        className="absolute top-12 left-6 p-3 bg-black/60 rounded-full"
        onPress={() => navigation.goBack()}
      >
        <Icon name="close" size={28} color="white" />
      </TouchableOpacity>

      <View className="absolute bottom-20 left-10 right-10 items-center">
        <View className="border-2 border-primary w-64 h-64 rounded-3xl" />
        <Text className="text-white mt-8 text-lg font-semibold">Align QR code within the frame</Text>
        
        {manualQr && (
          <TouchableOpacity 
            className="mt-8 bg-white/20 px-6 py-2 rounded-full border border-white/50"
            onPress={() => validateTicket(manualQr)}
          >
            <Text className="text-white font-bold italic">Process Current Ticket</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
