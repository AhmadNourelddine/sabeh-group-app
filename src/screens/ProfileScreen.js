import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('English');

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const handleModify = () => {
    Alert.alert('Info', 'Modify profile feature coming soon');
  };

  const handleLanguageChange = () => {
    setLanguage(language === 'English' ? 'Chinese' : 'English');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileIcon}>
            <Ionicons name="person" size={32} color="#666666" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.greeting}>Hi, NBD</Text>
            <Text style={styles.accountManager}>
              Account Manager: {user?.accountManager || 'HASAN SAYED'}
            </Text>
            <Text style={styles.accountLevel}>
              Account Level: <Text style={styles.levelHighlight}>Normal</Text>
            </Text>
          </View>
        </View>

        {/* Profile Fields */}
        <View style={styles.fieldsContainer}>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>First Name</Text>
            <Text style={styles.fieldValue}>{user?.name?.split(' ')[0] || 'AHMAD'}</Text>
          </View>
          
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Last Name</Text>
            <Text style={styles.fieldValue}>{user?.name?.split(' ')[1] || 'NOUREDDINE'}</Text>
          </View>
          
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Email</Text>
            <Text style={styles.fieldValue}>{user?.email || 'AHMAD.NOURELDINE@GMAIL.COM'}</Text>
          </View>
          
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>area code</Text>
            <Text style={styles.fieldValue}>{user?.areaCode || '961'}</Text>
          </View>
          
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Mobile</Text>
            <Text style={styles.fieldValue}>{user?.mobile || '71199876'}</Text>
          </View>
          
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>area code2</Text>
            <Text style={styles.fieldValue}>968</Text>
          </View>
          
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Mobile2</Text>
            <Text style={styles.fieldValue}></Text>
          </View>
          
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Shipping Address</Text>
            <Text style={styles.fieldValue}></Text>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsContainer}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Language</Text>
            <View style={styles.languageContainer}>
              <Text style={styles.languageText}>Chinese</Text>
              <Text style={styles.languageTextActive}>{language}</Text>
            </View>
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Notification</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#e0e0e0', true: '#4CAF50' }}
              thumbColor={notificationsEnabled ? '#ffffff' : '#ffffff'}
            />
          </View>
        </View>

        {/* Modify Button */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Modify"
            onPress={handleModify}
            style={styles.modifyButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.companyName}>Sabeh Group</Text>
          <Text style={styles.version}>Version 1.0</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  accountManager: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  accountLevel: {
    fontSize: 14,
    color: '#666666',
  },
  levelHighlight: {
    color: '#D72638',
    fontWeight: '600',
  },
  fieldsContainer: {
    padding: 20,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  fieldLabel: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  fieldValue: {
    fontSize: 16,
    color: '#666666',
    flex: 1,
    textAlign: 'right',
  },
  settingsContainer: {
    padding: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 16,
    color: '#999999',
    marginRight: 8,
  },
  languageTextActive: {
    fontSize: 16,
    color: '#D72638',
    fontWeight: '600',
  },
  buttonContainer: {
    padding: 20,
  },
  modifyButton: {
    backgroundColor: '#D72638',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  companyName: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#D72638',
    fontWeight: '600',
  },
});

export default ProfileScreen; 