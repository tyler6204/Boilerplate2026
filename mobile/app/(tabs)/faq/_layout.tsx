import { Stack, StackHeader, StackHeaderTitle, StackHeaderSearchBar } from 'expo-router';
import { useDefaultScreenOptions, useHeaderStyle } from '@/lib/create-header';

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ ...useDefaultScreenOptions() }} >
      <StackHeader style={useHeaderStyle()}>
        <StackHeaderTitle>FAQ</StackHeaderTitle>
        <StackHeaderSearchBar hideWhenScrolling={false} placeholder="Search"/>
      </StackHeader>
    </Stack>
  );
}
