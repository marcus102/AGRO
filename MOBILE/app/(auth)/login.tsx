import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image,
  Platform,
  Switch
} from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react-native';
import { useAuthStore } from '@/stores/auth';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, loading, error } = useAuthStore();
  

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }

    try {
      await signIn(email, password);
      router.replace('/');
    } catch (err) {
      // Error is handled by the store
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1467740100611-36858db27485?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
        style={styles.backgroundImage}
      />
      
      <View style={styles.overlay} />
      
      <View style={styles.content}>
        <Animated.View 
          entering={FadeInDown.delay(200)}
          style={styles.header}
        >
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue to your account
          </Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(400)}
          style={styles.form}
        >
          {error && (
            <View style={styles.errorContainer}>
              <AlertCircle size={20} color="#dc2626" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.inputContainer}>
            <Mail size={20} color="#6b7280" />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#6b7280" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? (
                <EyeOff size={20} color="#6b7280" />
              ) : (
                <Eye size={20} color="#6b7280" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={() => router.push('/forgot-password')}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.loginButton,
              loading && styles.loginButtonDisabled
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 48,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#e5e7eb',
    textAlign: 'center',
    marginTop: 8,
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
      default: {
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#dc2626',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#111827',
    paddingVertical: 12,
    marginLeft: 8,
  },
  eyeButton: {
    padding: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  forgotText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#166534',
  },
  loginButton: {
    backgroundColor: '#166534',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#ffffff',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signupText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
  },
  signupLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#166534',
    marginLeft: 4,
  },
});