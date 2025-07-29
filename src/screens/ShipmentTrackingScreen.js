import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ShipmentTrackingScreen = ({ route, navigation }) => {
  const { shipment } = route.params;

  const getTransportIcon = (type) => {
    return type?.includes('Air') ? 'airplane' : 'boat';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Current Shipment Tracking</Text>
          <View style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color="#666666" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>17</Text>
            </View>
          </View>
        </View>

        {/* Shipment Card */}
        <View style={styles.shipmentCard}>
          <View style={styles.cardHeader}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{shipment.status}</Text>
            </View>
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.invoiceButton}>
                <Text style={styles.invoiceText}>Invoice</Text>
              </TouchableOpacity>
              <View style={styles.transportIcon}>
                <Ionicons 
                  name={getTransportIcon(shipment.shipmentType)} 
                  size={24} 
                  color="#D72638" 
                />
              </View>
            </View>
          </View>

          {/* Shipment Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Shipment:</Text>
              <Text style={styles.detailValue}>{shipment.id}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Price/kg:</Text>
              <Text style={styles.detailValue}>{shipment.pricePerKg}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total Due to Pay:</Text>
              <Text style={styles.detailValue}>{shipment.totalDue}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Departed from:</Text>
              <Text style={styles.detailValue}>{shipment.departedFrom}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Destination:</Text>
              <Text style={styles.detailValue}>{shipment.destination}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status:</Text>
              <Text style={styles.detailValue}>{shipment.status}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Shipping Mark:</Text>
              <Text style={styles.detailValue}>{shipment.shippingMark}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total CTN:</Text>
              <Text style={styles.detailValue}>{shipment.totalCtn}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total Weight:</Text>
              <Text style={styles.detailValue}>{shipment.totalWeight}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total CBM:</Text>
              <Text style={styles.detailValue}>{shipment.totalCbm}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Goods Dec:</Text>
              <Text style={styles.detailValue}>{shipment.goodsDescription}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Shipment Type:</Text>
              <Text style={styles.detailValue}>{shipment.shipmentType}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>ETA:</Text>
              <Text style={styles.detailValue}>{shipment.eta}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>ETD:</Text>
              <Text style={styles.detailValue}>{shipment.etd}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Inventory No.:</Text>
              <Text style={styles.detailValue}>{shipment.inventoryNo}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Packed Orders:</Text>
              <Text style={styles.detailValue}>{shipment.packedOrders}</Text>
            </View>
          </View>

          {/* Inventory Photos */}
          <View style={styles.photosSection}>
            <Text style={styles.photosTitle}>Inventory Photos:</Text>
            <View style={styles.photosContainer}>
              {shipment.photos?.map((photo, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Image
                    source={{ uri: photo }}
                    style={styles.photo}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
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
  shipmentCard: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  statusBadge: {
    backgroundColor: '#28a745',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  invoiceButton: {
    backgroundColor: '#333333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  invoiceText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  transportIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
  },
  photosSection: {
    marginTop: 20,
  },
  photosTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  photosContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  photoContainer: {
    flex: 1,
  },
  photo: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
});

export default ShipmentTrackingScreen; 