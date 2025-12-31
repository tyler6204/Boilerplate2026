import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css"

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ConvexClientProvider } from '@/components/convex-provider';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ConvexClientProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerTransparent: true }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Boilerplate' }} />
        </Stack>
        <StatusBar />
      </ThemeProvider>
    </ConvexClientProvider>
  );
}