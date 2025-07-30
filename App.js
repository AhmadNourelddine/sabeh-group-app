import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import colors from './src/config/colors';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ShipmentTrackingScreen from './src/screens/ShipmentTrackingScreen';
import FreightEstimationScreen from './src/screens/FreightEstimationScreen';

// Import icons
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main App Navigator
function MainNavigator() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#ffffff' }
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#ffffff' }
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="ShipmentTracking" component={ShipmentTrackingScreen} />
      <Stack.Screen name="FreightEstimation" component={FreightEstimationScreen} />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Sabeh Group') {
            iconName = focused ? 'business' : 'business-outline';
          } else if (route.name === 'Me') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
                        tabBarActiveTintColor: colors.accent,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                  backgroundColor: colors.white,
                  borderTopWidth: 1,
                  borderTopColor: colors.border,
                  paddingBottom: 5,
                  paddingTop: 5,
                  marginBottom: 10,
                  height: 60,
                },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Sabeh Group" 
        component={AboutUsScreen}
        options={{
          tabBarLabel: 'Sabeh Group',
        }}
      />
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Me" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Me',
        }}
      />
    </Tab.Navigator>
  );
}

// App Component
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
} 