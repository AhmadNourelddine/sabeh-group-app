import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { freightAPI } from '../services/api';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import colors from '../config/colors';

const FreightEstimationScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    transportationType: 'Sea Freight',
    departFrom: '',
    arrivalTo: '',
    weight: '',
    cbm: '',
  });
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState(null);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEstimate = async () => {
    if (!formData.weight || !formData.cbm) {
      Alert.alert('Error', 'Please fill in weight and CBM');
      return;
    }

    setLoading(true);
    try {
      const response = await freightAPI.estimateFreight({
        transportationType: formData.transportationType,
        weight: parseFloat(formData.weight),
        cbm: parseFloat(formData.cbm),
      });
      setEstimate(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to calculate estimate');
    } finally {
      setLoading(false);
    }
  };

  const handleContactUs = () => {
    Alert.alert('Contact Us', 'Contact feature coming soon');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
                     <TouchableOpacity onPress={() => navigation.goBack()}>
             <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
           </TouchableOpacity>
          <Text style={styles.headerTitle}>Freight Estimation</Text>
                     <View style={styles.notificationButton}>
             <Ionicons name="notifications" size={24} color={colors.iconPrimary} />
             <View style={styles.notificationBadge}>
               <Text style={styles.notificationText}>17</Text>
             </View>
           </View>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
                     <View style={styles.profileIcon}>
             <Ionicons name="person" size={24} color={colors.iconPrimary} />
           </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>NBD</Text>
            <Text style={styles.profileRole}>
              Account Manager: {user?.accountManager || 'HASAN SAYED'}
            </Text>
          </View>
        </View>

        {/* Estimation Form */}
        <View style={styles.formContainer}>
          <CustomInput
            label="Transportation type"
            value={formData.transportationType}
            onChangeText={(value) => updateFormData('transportationType', value)}
            placeholder="Sea Freight"
          />

          <CustomInput
            label="Depart From"
            value={formData.departFrom}
            onChangeText={(value) => updateFormData('departFrom', value)}
            placeholder="Select Depart"
          />

          <CustomInput
            label="Arrival To"
            value={formData.arrivalTo}
            onChangeText={(value) => updateFormData('arrivalTo', value)}
            placeholder="Select Arrival"
          />

          <CustomInput
            label="Weight"
            value={formData.weight}
            onChangeText={(value) => updateFormData('weight', value)}
            placeholder="kg"
            keyboardType="numeric"
          />

          <CustomInput
            label="CBM"
            value={formData.cbm}
            onChangeText={(value) => updateFormData('cbm', value)}
            placeholder="Height * Width * Length (CM)"
            keyboardType="numeric"
          />

          {/* Estimate Result */}
          {estimate && (
            <View style={styles.estimateCard}>
              <Text style={styles.estimateTitle}>Estimated Cost</Text>
              <Text style={styles.estimateAmount}>
                ${estimate.estimate} {estimate.currency}
              </Text>
              <View style={styles.breakdown}>
                <Text style={styles.breakdownTitle}>Breakdown:</Text>
                <Text style={styles.breakdownText}>
                  Weight: {estimate.breakdown.weight}kg × ${estimate.breakdown.baseRate}/kg
                </Text>
                <Text style={styles.breakdownText}>
                  Volume: {estimate.breakdown.volume}CBM × ${estimate.breakdown.volumeRate}/CBM
                </Text>
              </View>
            </View>
          )}

          <CustomButton
            title={loading ? 'Calculating...' : 'Calculate Estimate'}
            onPress={handleEstimate}
            disabled={loading}
            style={styles.calculateButton}
          />

          <CustomButton
            title="Contact Us"
            onPress={handleContactUs}
            style={styles.contactButton}
          />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
    marginBottom: 20,
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
  formContainer: {
    padding: 20,
  },
  estimateCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  estimateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  estimateAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 16,
  },
  breakdown: {
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: 12,
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  breakdownText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  calculateButton: {
    marginBottom: 12,
  },
  contactButton: {
    backgroundColor: colors.accent,
  },
});

export default FreightEstimationScreen; 