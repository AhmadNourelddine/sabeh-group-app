import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import CustomInput from '../components/CustomInput';
import PasswordInput from '../components/PasswordInput';
import CustomButton from '../components/CustomButton';
import colors from '../config/colors';

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const response = await authAPI.signup(formData);
      // After successful signup, automatically log in the user
      await login(formData.email, formData.password);
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle different types of errors based on API response
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;
        
        switch (status) {
          case 422: // Validation errors
            if (data.errors) {
              const validationErrors = {};
              Object.keys(data.errors).forEach(key => {
                validationErrors[key] = data.errors[key][0]; // Get first error message
              });
              setErrors(validationErrors);
            } else {
              setErrors({ general: data.message || 'Validation failed' });
            }
            break;
            
          case 409: // Conflict - email already exists
            setErrors({ 
              email: 'An account with this email already exists. Please use a different email or try logging in.' 
            });
            break;
            
          case 429: // Too many requests
            setErrors({ 
              general: 'Too many signup attempts. Please wait a moment before trying again.' 
            });
            break;
            
          case 500: // Server error
            setErrors({ 
              general: 'Server error. Please try again later or contact support.' 
            });
            break;
            
          default:
            setErrors({ 
              general: data.message || `Signup failed (${status}). Please try again.` 
            });
        }
      } else if (error.request) {
        // Network error - no response received
        setErrors({ 
          general: 'Network error. Please check your internet connection and try again.' 
        });
      } else {
        // Other errors (e.g., from our error handling)
        setErrors({ general: error.message || 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join Sabeh Group</Text>
          </View>

          <View style={styles.form}>
            {/* General error message */}
            {errors.general && (
              <View style={styles.errorContainer}>
                <Text style={styles.generalErrorText}>{errors.general}</Text>
              </View>
            )}

            <CustomInput
              label="Full Name"
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              placeholder="Enter your full name"
              error={errors.name}
            />

            <CustomInput
              label="Email"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              placeholder="Enter your email"
              keyboardType="email-address"
              error={errors.email}
            />

            <PasswordInput
              label="Password"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              placeholder="Enter your password"
              error={errors.password}
            />

            <PasswordInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
            />

            <CustomButton
              title={loading ? 'Creating Account...' : 'Create Account'}
              onPress={handleSignup}
              disabled={loading}
              style={styles.signupButton}
            />

            <View style={styles.loginSection}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <Text
                style={styles.loginLink}
                onPress={() => navigation.navigate('Login')}
              >
                Sign in
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  signupButton: {
    marginTop: 24,
    marginBottom: 16,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  loginLink: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: colors.error + '10', // 10% opacity
    borderWidth: 1,
    borderColor: colors.error,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  generalErrorText: {
    color: colors.error,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default SignupScreen; 