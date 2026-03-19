import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Simulate validation
    if (data.includes('KASIPASS')) {
      Alert.alert(
        "Ticket Verified!", 
        "Access Granted. Welcome to KasiPass event.",
        [{ text: "OK", onPress: () => setScanned(false) }]
      );
    } else {
      Alert.alert("Invalid Ticket", "This QR code is not recognized by KasiPass.");
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <View className="flex-1 justify-center items-center"><Text>Requesting for camera permission</Text></View>;
  }
  if (hasPermission === false) {
    return <View className="flex-1 justify-center items-center"><Text>No access to camera</Text></View>;
  }

  return (
    <View className="flex-1 bg-black">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        className="flex-1"
      />
      
      <TouchableOpacity 
        className="absolute top-12 left-6 p-3 bg-black/60 rounded-full"
        onPress={() => navigation.goBack()}
      >
        <Icon name="close" size={28} color="white" />
      </TouchableOpacity>

      <View className="absolute bottom-20 left-10 right-10 items-center">
        <View className="border-2 border-primary w-64 h-64 rounded-3xl" />
        <Text className="text-white mt-8 text-lg font-semibold">Align QR code within the frame</Text>
      </View>
    </View>
  );
}
