import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ShipmentCard = ({ shipment, onPress }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Signed':
        return '#28a745';
      case 'In Transit':
        return '#ffc107';
      case 'Delivered':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  };

  const getTransportIcon = (type) => {
    return type === 'Air' ? 'airplane' : 'boat';
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(shipment)}>
      <View style={styles.header}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(shipment.status) }]}>
          <Text style={styles.statusText}>{shipment.status}</Text>
        </View>
        <View style={styles.transportIcon}>
          <Ionicons 
            name={getTransportIcon(shipment.type)} 
            size={24} 
            color="#D72638" 
          />
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.shipmentId}>
          Shipment: <Text style={styles.highlight}>{shipment.id}</Text>
        </Text>
        <Text style={styles.shippingMark}>
          Shipping Mark: {shipment.shippingMark}
        </Text>
        <Text style={styles.total}>
          Total: {shipment.total}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
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
  content: {
    gap: 4,
  },
  shipmentId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  highlight: {
    color: '#D72638',
  },
  shippingMark: {
    fontSize: 14,
    color: '#666666',
  },
  total: {
    fontSize: 14,
    color: '#666666',
  },
});

export default ShipmentCard; 