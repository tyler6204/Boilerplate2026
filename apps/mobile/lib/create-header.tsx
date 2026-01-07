import { ColorValue, Platform } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

export function useDefaultScreenOptions() {
  const isIOS = Platform.OS === 'ios';
  const iosVersion = isIOS ? parseFloat(Platform.Version as string) : 0;
  const isIOSGreaterThan26 = isIOS && iosVersion >= 26;
  const foregroundColor = useThemeColor({}, 'foreground');
  const backgroundColor = useThemeColor({}, 'background');

  return {
    headerShown: false,
    headerTransparent: isIOSGreaterThan26,
    headerShadowVisible: false,
    headerTintColor: foregroundColor,
    headerStyle: {
      backgroundColor: isIOSGreaterThan26 ? 'transparent' : backgroundColor,
      shadowColor: "transparent",
    },
  };
}

export function useHeaderStyle(tintColor: string | undefined = undefined) {
  const defaultTintColor = useThemeColor({}, 'brand');
  const effectiveTintColor = tintColor ?? defaultTintColor;
  return {
    shadowColor: 'transparent' as undefined | 'transparent',
    color: effectiveTintColor as ColorValue,
  };
}
