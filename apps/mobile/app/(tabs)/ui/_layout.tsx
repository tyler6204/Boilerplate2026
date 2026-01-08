import { Stack, StackHeader, StackHeaderTitle } from 'expo-router';
import { useDefaultScreenOptions, useHeaderStyle } from '@/lib/create-header';

export default function UILayout() {
  return (
    <Stack screenOptions={useDefaultScreenOptions()}>
      <StackHeader style={useHeaderStyle()}>
        <StackHeaderTitle>UI Components</StackHeaderTitle>
      </StackHeader>
    </Stack>
  );
}
