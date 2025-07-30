import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';

const ShipmentCard = ({ shipment, onPress }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Signed':
        return colors.success;
      case 'In Transit':
        return colors.warning;
      case 'Delivered':
        return colors.info;
      default:
        return colors.textSecondary;
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
            color={colors.iconAccent} 
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
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.shadow,
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
    color: colors.textWhite,
    fontSize: 12,
    fontWeight: '600',
  },
  transportIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.background,
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
    color: colors.textPrimary,
  },
  highlight: {
    color: colors.accent,
  },
  shippingMark: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  total: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default ShipmentCard; 