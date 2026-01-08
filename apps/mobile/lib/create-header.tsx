import { ColorValue, Platform } from 'react-native';
import { useTailwindToHex } from '../hooks/useTailwindToHex';

export function useDefaultScreenOptions() {
  const isIOS = Platform.OS === 'ios';
  const iosVersion = isIOS ? parseFloat(Platform.Version as string) : 0;
  const isIOSGreaterThan26 = isIOS && iosVersion >= 26;
  const foregroundColor = useTailwindToHex('primary');
  const backgroundColor = useTailwindToHex('background');

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
  const defaultTintColor = useTailwindToHex('primary');
  const backgroundColor = useTailwindToHex('background');
  const effectiveTintColor = tintColor ?? defaultTintColor;
  return {
    shadowColor: 'transparent' as undefined | 'transparent',
    color: effectiveTintColor as ColorValue,
    backgroundColor: backgroundColor as ColorValue,
  };
}
