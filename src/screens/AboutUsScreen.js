import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';

const AboutUsScreen = () => {
  const handleOptionPress = (option) => {
    Alert.alert('Info', `${option} feature coming soon`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Company Title */}
          <Text style={styles.companyTitle}>Sabeh Group</Text>
          
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>sabeh</Text>
          </View>
          
          {/* Tagline */}
          <Text style={styles.tagline}>Logistics & Trading</Text>
          
          {/* Company Description */}
          <Text style={styles.description}>
            Sabeh Group is a company specializing in international logistics and transportation, 
            providing a full range of logistics services, including shipping, air transportation, 
            land transportation, warehousing, customs clearance, agency and other services.
          </Text>
          
          {/* About Us Section */}
          <Text style={styles.sectionTitle}>About Us</Text>
          
          {/* Interactive Options */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.optionCard}
              onPress={() => handleOptionPress('Guiders')}
            >
              <View style={styles.optionIcon}>
                <Ionicons name="search" size={24} color={colors.iconAccent} />
                <View style={styles.iconDot} />
              </View>
              <Text style={styles.optionText}>Guiders</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionCard}
              onPress={() => handleOptionPress('FAQ')}
            >
              <View style={styles.optionIcon}>
                <Ionicons name="help-circle" size={24} color={colors.iconAccent} />
              </View>
              <Text style={styles.optionText}>FAQ</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionCard}
              onPress={() => handleOptionPress('Privacy Policy')}
            >
              <View style={styles.optionIcon}>
                <Ionicons name="shield-checkmark" size={24} color={colors.iconAccent} />
              </View>
              <Text style={styles.optionText}>Privacy Policy</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionCard}
              onPress={() => handleOptionPress('Contact Us')}
            >
              <View style={styles.optionIcon}>
                <Ionicons name="call" size={24} color={colors.iconAccent} />
              </View>
              <Text style={styles.optionText}>Contact Us</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionCard}
              onPress={() => handleOptionPress('Feedback')}
            >
              <View style={styles.optionIcon}>
                <Ionicons name="document-text" size={24} color={colors.iconAccent} />
              </View>
              <Text style={styles.optionText}>Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  companyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.textPrimary,
    letterSpacing: 2,
  },
  logoDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
  },
  tagline: {
    fontSize: 18,
    color: colors.textSecondary,
    letterSpacing: 3,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  optionsContainer: {
    width: '100%',
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  optionIcon: {
    position: 'relative',
    marginRight: 16,
  },
  iconDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  optionText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
});

export default AboutUsScreen; 