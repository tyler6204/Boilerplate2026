import { Stack, StackHeader, StackHeaderTitle, StackHeaderRight, useRouter, router, StackHeaderButton } from 'expo-router';
import { useDefaultScreenOptions, useHeaderStyle } from '@/lib/create-header';
import { IconSymbol } from '@/components/native/icon';
import Button from '@/components/native/button';
import { View } from '@/components/view';

export default function HomeLayout() {

  return (
    <Stack screenOptions={{
      ...useDefaultScreenOptions(),
      headerRight: () => <HeaderRight />,
    }}>
      <StackHeader style={useHeaderStyle()}>
        <StackHeaderTitle>Home</StackHeaderTitle>

        {/* iOS only */}
        <StackHeaderRight>
          {/* <StackHeaderButton icon="questionmark.circle" onPress={() => router.push('/example-modal')} /> */}
        </StackHeaderRight>
      </StackHeader>
    </Stack>
  );
}

// Default symbol size should be size-6
// default color should be text-brand (tint color)
function HeaderRight() {
  const router = useRouter();

  return (
    <View className="flex-row gap-8">
      {/* <Button onPress={() => router.push('/(modals)/example')}>
        <IconSymbol name="questionmark.circle" className="size-6.5 font-bold text-brand" />
      </Button> */}
    </View>
  );
}
