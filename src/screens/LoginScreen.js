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
import CustomButton from '../components/CustomButton';

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
    try {
      const response = await authAPI.login(email, password);
      await login(response.data.user, response.data.token);
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
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
            <Text style={styles.title}>Sabeh Group</Text>
            <Text style={styles.subtitle}>Logistics & Trading</Text>
          </View>

          <View style={styles.form}>
            <CustomInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              error={errors.email}
            />

            <CustomInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
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
    backgroundColor: '#ffffff',
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
    color: '#002B5B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    letterSpacing: 2,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
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
    color: '#D72638',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  signupSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#666666',
    fontSize: 16,
  },
  signupLink: {
    color: '#D72638',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#999999',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default LoginScreen; 