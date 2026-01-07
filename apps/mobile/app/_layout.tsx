import { Stack } from 'expo-router';
import 'react-native-reanimated';
import "../global.css"
import { ThemeProvider } from '@/components/theme-provider';
import { ConvexClientProvider } from '@/components/convex-provider';
import DynamicStatusBar from '@/components/native/status-bar';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <ConvexClientProvider>
      <ThemeProvider defaultTheme="system">
        <Stack screenOptions={{ headerTransparent: true }}>
          <Stack.Screen name="(tabs)" options={{ title: 'Home', headerShown: false }} />
          <Stack.Screen
            name="views/modals/example/index"
            options={{ presentation: 'formSheet', sheetAllowedDetents: [0.4, 1], contentStyle: { backgroundColor: 'transparent' } }}
          />
        </Stack>
        <DynamicStatusBar />
      </ThemeProvider>
    </ConvexClientProvider>
  );
}
