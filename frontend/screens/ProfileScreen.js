import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Switch, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [isVendor, setIsVendor] = useState(user?.role === 'vendor');

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="bg-white pt-16 pb-10 px-6 items-center rounded-b-[40px] shadow-sm">
        <Image source={{ uri: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=200' }} className="w-28 h-28 rounded-full border-4 border-primary" />
        <Text className="text-2xl font-bold mt-4">{user?.full_name || 'Guest User'}</Text>
        <Text className="text-gray-500">{user?.email || 'No email provided'}</Text>
        
        <TouchableOpacity className="mt-6 bg-primary/10 px-6 py-2 rounded-full border border-primary">
          <Text className="text-primary font-bold italic">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View className="p-6">
        <View className="bg-white p-4 rounded-3xl shadow-sm flex-row justify-between items-center mb-6">
          <View className="flex-row items-center">
            <Icon name="business-outline" size={24} color="#00A86B" />
            <Text className="ml-4 text-lg font-bold">Switch to Vendor Mode</Text>
          </View>
          <Switch 
            value={isVendor} 
            onValueChange={(val) => {
              setIsVendor(val);
              if(val) navigation.navigate('VendorDashboard');
            }} 
            trackColor={{ true: '#00A86B' }}
          />
        </View>

        <TouchableOpacity className="bg-white p-4 rounded-3xl shadow-sm flex-row items-center mb-4">
          <Icon name="settings-outline" size={24} color="gray" />
          <Text className="ml-4 text-lg font-semibold flex-1">Settings</Text>
          <Icon name="chevron-forward" size={20} color="lightgray" />
        </TouchableOpacity>

        <TouchableOpacity className="bg-white p-4 rounded-3xl shadow-sm flex-row items-center mb-4" onPress={() => navigation.navigate('Scanner')}>
          <Icon name="scan-outline" size={24} color="gray" />
          <Text className="ml-4 text-lg font-semibold flex-1">Scan Ticket</Text>
          <Icon name="chevron-forward" size={20} color="lightgray" />
        </TouchableOpacity>

        <TouchableOpacity className="bg-white p-4 rounded-3xl shadow-sm flex-row items-center mb-4">
          <Icon name="help-circle-outline" size={24} color="gray" />
          <Text className="ml-4 text-lg font-semibold flex-1">Support</Text>
          <Icon name="chevron-forward" size={20} color="lightgray" />
        </TouchableOpacity>

        <TouchableOpacity className="bg-white p-4 rounded-3xl shadow-sm flex-row items-center" onPress={logout}>
          <Icon name="log-out-outline" size={24} color="#FF4D4D" />
          <Text className="ml-4 text-lg font-semibold text-[#FF4D4D] flex-1">Logout</Text>
        </TouchableOpacity>
      </View>

      <View className="items-center pb-20">
        <Text className="text-gray-400 font-bold italic text-xl">KasiPass v1.0.0</Text>
        <Text className="text-gray-400 italic">Built for the community</Text>
      </View>
    </ScrollView>
  );
}
