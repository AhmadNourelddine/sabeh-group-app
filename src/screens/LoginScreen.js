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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({}); // Clear previous errors

    try {
      await login(email, password);
      // Navigation will be handled by the app's navigation logic
    } catch (error) {
      console.error('Login error:', error);
      
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
            
          case 401: // Unauthorized - invalid credentials
            setErrors({ 
              general: 'Invalid email or password. Please check your credentials and try again.' 
            });
            break;
            
          case 429: // Too many requests
            setErrors({ 
              general: 'Too many login attempts. Please wait a moment before trying again.' 
            });
            break;
            
          case 500: // Server error
            setErrors({ 
              general: 'Server error. Please try again later or contact support.' 
            });
            break;
            
          default:
            setErrors({ 
              general: data.message || `Login failed (${status}). Please try again.` 
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

  const clearErrors = () => {
    setErrors({});
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Sabeh Group</Text>
            <Text style={styles.subtitle}>Logistics & Trading</Text>
          </View>

          <View style={styles.form}>
            {/* General error message */}
            {errors.general && (
              <View style={styles.errorContainer}>
                <Text style={styles.generalErrorText}>{errors.general}</Text>
              </View>
            )}

            <CustomInput
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) clearErrors();
              }}
              placeholder="Enter your email"
              keyboardType="email-address"
              error={errors.email}
            />

            <PasswordInput
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) clearErrors();
              }}
              placeholder="Enter your password"
              error={errors.password}
            />

            <CustomButton
              title={loading ? 'Signing In...' : 'Sign In'}
              onPress={handleLogin}
              disabled={loading}
              style={styles.loginButton}
            />

            <View style={styles.links}>
              <Text
                style={styles.link}
                onPress={() => Alert.alert('Info', 'Forgot password feature coming soon')}
              >
                Forgot password?
              </Text>
            </View>

            <View style={styles.signupSection}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <Text
                style={styles.signupLink}
                onPress={() => navigation.navigate('Signup')}
              >
                Create an account
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Demo Credentials:{'\n'}
              Email: demo@sabehgroup.com{'\n'}
              Password: password
            </Text>
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
    marginTop: 40,
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
    letterSpacing: 2,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    backgroundColor: colors.error + '10', // 10% opacity
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  generalErrorText: {
    color: colors.error,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  loginButton: {
    marginTop: 24,
    marginBottom: 16,
  },
  links: {
    alignItems: 'center',
    marginBottom: 24,
  },
  link: {
    color: colors.accent,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  signupSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  signupLink: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: colors.textLight,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default LoginScreen; 