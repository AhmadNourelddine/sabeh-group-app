import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { shipmentAPI, newsAPI } from '../services/api';
import ShipmentCard from '../components/ShipmentCard';
import colors from '../config/colors';

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
      setRecentShipments(shipmentsResponse.data || []);
      setLatestNews(newsResponse.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
      // Set empty arrays on error to prevent crashes
      setRecentShipments([]);
      setLatestNews([]);
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
      Alert.alert('Error', error.message || 'Shipment not found');
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
               <Ionicons name="person" size={24} color={colors.iconPrimary} />
             </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>NBD</Text>
              <Text style={styles.profileRole}>
                Account Manager: {user?.accountManager || 'Ali'}
              </Text>
            </View>
          </View>
          {/*            <TouchableOpacity style={styles.notificationButton}>
             <Ionicons name="notifications" size={24} color={colors.iconPrimary} />
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
               <Ionicons name="person-add" size={24} color={colors.iconAccent} />
               <Text style={styles.quickActionText}>Create an Order</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.quickActionCard}>
               <Ionicons name="cube" size={24} color={colors.iconAccent} />
               <Text style={styles.quickActionText}>Create a Shipment</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.quickActionCard}>
               <Ionicons name="refresh" size={24} color={colors.iconAccent} />
               <Text style={styles.quickActionText}>Exchange Rate</Text>
             </TouchableOpacity>
             <TouchableOpacity 
               style={styles.quickActionCard}
               onPress={() => navigation.navigate('FreightEstimation')}
             >
               <Ionicons name="business" size={24} color={colors.iconAccent} />
               <Text style={styles.quickActionText}>Freight Estimation</Text>
             </TouchableOpacity>
          </View>
        </View>

        {/* Latest News */}
        {/* <View style={styles.section}>
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
                   <Ionicons name="alert-circle" size={20} color={colors.iconAccent} />
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
        </View> */}

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
                             <Ionicons name="search" size={20} color={colors.placeholder} style={styles.searchIcon} />
              <TextInput
                style={styles.trackingInput}
                placeholder="Enter Tracking Number"
                value={trackingNumber}
                onChangeText={setTrackingNumber}
                                 placeholderTextColor={colors.placeholder}
              />
              <TouchableOpacity style={styles.trackButton} onPress={handleTrackShipment}>
                                 <Ionicons name="arrow-forward" size={20} color={colors.textWhite} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.qrButton}>
                             <Ionicons name="qr-code" size={24} color={colors.textWhite} />
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
              onPress={(shipment) => navigation.navigate('ShipmentTracking', { shipment })}
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
    backgroundColor: colors.background,
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
    backgroundColor: colors.white,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.divider,
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
    color: colors.textPrimary,
  },
  profileRole: {
    fontSize: 12,
    color: colors.textSecondary,
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
    backgroundColor: colors.notificationBadge,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  notificationText: {
    color: colors.textWhite,
    fontSize: 10,
    fontWeight: 'bold',
  },
  balanceCard: {
    backgroundColor: colors.balanceCard,
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  balanceTitle: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  balanceAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceAmount: {
    color: colors.textWhite,
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
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
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
    color: colors.textPrimary,
  },
  moreLink: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  newsCard: {
    backgroundColor: colors.cardBackground,
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
    color: colors.textPrimary,
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 12,
    color: colors.textSecondary,
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
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  trackingInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textPrimary,
  },
  trackButton: {
    backgroundColor: colors.buttonSecondary,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrButton: {
    backgroundColor: colors.buttonPrimary,
    borderRadius: 8,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.filterInactive,
  },
  filterButtonActive: {
    backgroundColor: colors.filterActive,
    borderColor: colors.filterActive,
  },
  filterButtonText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  filterButtonTextActive: {
    color: colors.textWhite,
  },
});

export default HomeScreen; 