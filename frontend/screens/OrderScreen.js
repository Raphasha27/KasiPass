import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

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
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const getStatusInfo = () => {
    switch(status) {
      case 'preparing': return { icon: 'fast-food-outline', text: 'Preparing your meal...', color: '#FFD700' };
      case 'out-for-delivery': return { icon: 'bicycle-outline', text: 'Driver is on the way!', color: '#00A86B' };
      case 'delivered': return { icon: 'home-outline', text: 'Delivered. Enjoy!', color: '#00A86B' };
      default: return { icon: 'time-outline', text: 'Waiting...', color: 'gray' };
    }
  };

  const info = getStatusInfo();

  return (
    <View className="flex-1 bg-background">
      <View className="pt-16 pb-6 px-6 bg-white border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={28} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ml-4">Order Status</Text>
      </View>

      <ScrollView className="p-6">
        <View className="bg-white p-8 rounded-[40px] items-center shadow-sm">
          <View className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center mb-6">
            <Icon name={info.icon} size={48} color={info.color} />
          </View>
          <Text className="text-2xl font-bold text-center">{info.text}</Text>
          <Text className="text-gray-500 mt-2 text-center">Order #KP-992 from {restaurant.name}</Text>
          
          <View className="w-full h-3 bg-gray-100 rounded-full mt-8 overflow-hidden">
            <View className="h-full bg-primary" style={{ width: `${progress * 100}%` }} />
          </View>
        </View>

        <View className="mt-8 bg-black p-6 rounded-[40px] flex-row items-center shadow-lg shadow-black/40">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=200' }} 
            className="w-16 h-16 rounded-2xl" 
          />
          <View className="ml-4 flex-1">
            <Text className="text-white text-lg font-bold">Your Driver: Sipho</Text>
            <Text className="text-gray-400">Arriving in approx. {status === 'delivered' ? '0' : '12'} mins</Text>
          </View>
          <TouchableOpacity className="bg-primary p-3 rounded-full">
            <Icon name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="mt-8 bg-white p-6 rounded-[40px] items-center border-2 border-dashed border-gray-200" onPress={() => navigation.navigate('Chat')}>
          <Text className="text-gray-500 font-bold">Need help with your order? Chat with us.</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="mt-8 bg-primary/10 p-5 rounded-3xl items-center border border-primary"
          onPress={() => navigation.navigate('Home')}
        >
          <Text className="text-primary font-bold">Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
