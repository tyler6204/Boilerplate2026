import { Stack, StackHeader, StackHeaderTitle } from 'expo-router';
import { useDefaultScreenOptions, useHeaderStyle } from '@/lib/create-header';

export default function HomeLayout() {

  return (
    <Stack screenOptions={{
      ...useDefaultScreenOptions(),
    }}>
      <StackHeader style={useHeaderStyle()}>
        <StackHeaderTitle>Home</StackHeaderTitle>
      </StackHeader>
    </Stack>
  );
}
