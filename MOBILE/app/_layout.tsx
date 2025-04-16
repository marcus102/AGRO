import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useThemeStore } from '@/stores/theme';
import { useAuthStore } from '@/stores/auth';
import { View } from 'react-native';

export default function RootLayout() {
  useFrameworkReady();
  const { theme, colors } = useThemeStore();
  const { refreshSession } = useAuthStore();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    refreshSession();
  }, []);

  // Keep the splash screen visible while we fetch resources
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      <Slot />
    </View>
  );
}