import { Stack } from 'expo-router';
import 'react-native-reanimated';
import "../global.css"
import { ConvexClientProvider } from '@/components/convex-provider';
import DynamicStatusBar from '@/components/status-bar';
import { PortalHost } from '@rn-primitives/portal';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <ConvexClientProvider>
      <Stack screenOptions={{ headerTransparent: true }}>
        <Stack.Screen name="(tabs)" options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen
          name="views/modals/example/index"
          options={{ presentation: 'formSheet', sheetAllowedDetents: [0.4, 1], contentStyle: { backgroundColor: 'transparent' } }}
        />
      </Stack>
      <DynamicStatusBar />
      <PortalHost />
    </ConvexClientProvider>
  );
}
