import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { shipmentAPI, newsAPI } from '../services/api';
import ShipmentCard from '../components/ShipmentCard';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [recentShipments, setRecentShipments] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [shipmentsResponse, newsResponse] = await Promise.all([
        shipmentAPI.getRecentShipments(),
        newsAPI.getLatestNews(),
      ]);
      setRecentShipments(shipmentsResponse.data);
      setLatestNews(newsResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleTrackShipment = async () => {
    if (!trackingNumber.trim()) {
      Alert.alert('Error', 'Please enter a tracking number');
      return;
    }

    try {
      const response = await shipmentAPI.trackShipment(trackingNumber.trim());
      navigation.navigate('ShipmentTracking', { shipment: response.data });
    } catch (error) {
      Alert.alert('Error', 'Shipment not found');
    }
  };

  const getFilteredShipments = () => {
    if (selectedFilter === 'All') return recentShipments;
    return recentShipments.filter(shipment => shipment.type === selectedFilter);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.profileIcon}>
              <Ionicons name="person" size={24} color="#666666" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>NBD</Text>
              <Text style={styles.profileRole}>
                Account Manager: {user?.accountManager || 'Ali'}
              </Text>
            </View>
          </View>
          {/* <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color="#666666" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>17</Text>
            </View>
          </TouchableOpacity> */}
        </View>

        {/* Statement Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Statement Balance</Text>
          <View style={styles.balanceAmounts}>
            <Text style={styles.balanceAmount}>0.00$</Text>
            <Text style={styles.balanceAmount}>0.00 ¥</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="person-add" size={24} color="#D72638" />
              <Text style={styles.quickActionText}>Create an Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="cube" size={24} color="#D72638" />
              <Text style={styles.quickActionText}>Create a Shipment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="refresh" size={24} color="#D72638" />
              <Text style={styles.quickActionText}>Exchange Rate</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('FreightEstimation')}
            >
              <Ionicons name="business" size={24} color="#D72638" />
              <Text style={styles.quickActionText}>Freight Estimation</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Latest News */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest News</Text>
            <TouchableOpacity>
              <Text style={styles.moreLink}>More</Text>
            </TouchableOpacity>
          </View>
          {latestNews.map((news) => (
            <View key={news.id} style={styles.newsCard}>
              <View style={styles.newsHeader}>
                <View style={styles.newsIcon}>
                  <Ionicons name="alert-circle" size={20} color="#D72638" />
                </View>
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle} numberOfLines={2}>
                    {news.title}
                  </Text>
                  <Text style={styles.newsDate}>
                    {news.date} • {news.time}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Track Shipment */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Track your Shipment</Text>
            <TouchableOpacity>
              <Text style={styles.moreLink}>Track your Order</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.trackingContainer}>
            <View style={styles.trackingInputContainer}>
              <Ionicons name="search" size={20} color="#999999" style={styles.searchIcon} />
              <TextInput
                style={styles.trackingInput}
                placeholder="Enter Tracking Number"
                value={trackingNumber}
                onChangeText={setTrackingNumber}
                placeholderTextColor="#999999"
              />
              <TouchableOpacity style={styles.trackButton} onPress={handleTrackShipment}>
                <Ionicons name="arrow-forward" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.qrButton}>
              <Ionicons name="qr-code" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Orders</Text>
          
          <View style={styles.filterContainer}>
            {['All', 'Sea', 'Air', 'FCL'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedFilter === filter && styles.filterButtonTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {getFilteredShipments().map((shipment) => (
            <ShipmentCard
              key={shipment.id}
              shipment={shipment}
              onPress={(shipment) => Alert.alert('Shipment', `Viewing ${shipment.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileRole: {
    fontSize: 12,
    color: '#666666',
  },
  notificationButton: {
    position: 'relative',
    paddingRight: 15,
    paddingTop: 5,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#D72638',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  notificationText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  balanceCard: {
    backgroundColor: '#D72638',
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  balanceTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  balanceAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceAmount: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  moreLink: {
    color: '#666666',
    fontSize: 14,
  },
  newsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  newsHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  newsIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 12,
    color: '#666666',
  },
  trackingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trackingInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 8,
  },
  trackingInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
  },
  trackButton: {
    backgroundColor: '#666666',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrButton: {
    backgroundColor: '#D72638',
    borderRadius: 8,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  filterButtonActive: {
    backgroundColor: '#666666',
    borderColor: '#666666',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333333',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
});

export default HomeScreen; 