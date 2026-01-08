import { NativeTabs, NativeTabTrigger, NativeTabsTriggerLabel, NativeTabsTriggerIcon } from 'expo-router/unstable-native-tabs';
import { useTailwindToHex } from '@/hooks/useTailwindToHex';

export default function TabLayout() {
  const backgroundColor = useTailwindToHex('background');
  const tintColor = useTailwindToHex('primary');
  const tabSelectedColor = useTailwindToHex('muted');

  return (
    <NativeTabs
      tintColor={tintColor}
      indicatorColor={tabSelectedColor} // Android indicator color
      rippleColor={tabSelectedColor}
      backgroundColor={backgroundColor}
      shadowColor="transparent"
    >
      <NativeTabTrigger name="home">
        <NativeTabsTriggerIcon
          sf={{ default: 'house', selected: 'house.fill' }}
          md="home"
        />
        <NativeTabsTriggerLabel>Home</NativeTabsTriggerLabel>
      </NativeTabTrigger>
      <NativeTabTrigger name="ui">
        <NativeTabsTriggerIcon
          sf={{ default: 'square.grid.2x2', selected: 'square.grid.2x2.fill' }}
          md="widgets"
        />
        <NativeTabsTriggerLabel>UI</NativeTabsTriggerLabel>
      </NativeTabTrigger>
      <NativeTabTrigger name="faq">
        <NativeTabsTriggerIcon
          sf={{ default: 'questionmark.circle', selected: 'questionmark.circle.fill' }}
          md="help_outline"
        />
        <NativeTabsTriggerLabel>FAQ</NativeTabsTriggerLabel>
      </NativeTabTrigger>
    </NativeTabs>
  );
}
