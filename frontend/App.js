import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthProvider, useAuth } from './context/AuthContext';

// Screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import WalletScreen from './screens/WalletScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import ListingDetailScreen from './screens/ListingDetailScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ScannerScreen from './screens/ScannerScreen';
import VendorDashboard from './screens/VendorDashboard';
import RestaurantScreen from './screens/RestaurantScreen';
import OrderScreen from './screens/OrderScreen';
import CreateListingScreen from './screens/CreateListingScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Explore') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Wallet') iconName = focused ? 'wallet' : 'wallet-outline';
          else if (route.name === 'Chat') iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00A86B',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 20,
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Auth flow
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          // App flow
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="ListingDetail" component={ListingDetailScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="Scanner" component={ScannerScreen} />
            <Stack.Screen name="VendorDashboard" component={VendorDashboard} />
            <Stack.Screen name="Restaurants" component={RestaurantScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="CreateListing" component={CreateListingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
