import { NativeTabs, NativeTabTrigger, NativeTabsTriggerLabel, NativeTabsTriggerIcon } from 'expo-router/unstable-native-tabs';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function TabLayout() {
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'brand');
  const tabSelectedColor = useThemeColor({}, 'tabSelected');

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
      <NativeTabTrigger name="faq">
        <NativeTabsTriggerIcon
          sf={{ default: 'questionmark.circle', selected: 'questionmark.circle.fill' }}
          md="help_outline"
        />
        <NativeTabsTriggerLabel>FAQ</NativeTabsTriggerLabel>
      </NativeTabTrigger>
      <NativeTabTrigger name="native-view">
        <NativeTabsTriggerIcon
          sf={{ default: 'square.stack.3d.up', selected: 'square.stack.3d.up.fill' }}
          md="view_module"
        />
        <NativeTabsTriggerLabel>Native View</NativeTabsTriggerLabel>
      </NativeTabTrigger>
    </NativeTabs>
  );
}
