import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function FAQLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: Platform.OS === 'ios',
        title: 'FAQ',
      }}
    />
  );
}
