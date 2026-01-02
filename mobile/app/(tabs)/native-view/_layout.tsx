import { Stack, StackHeader, StackHeaderTitle } from 'expo-router';
import { useDefaultScreenOptions, useHeaderStyle } from '@/lib/create-header';

export default function NativeViewLayout() {
  return (
    <Stack screenOptions={{ ...useDefaultScreenOptions() }}>
      <StackHeader style={useHeaderStyle()}>
        <StackHeaderTitle>Native View</StackHeaderTitle>
      </StackHeader>
    </Stack>
  );
}
