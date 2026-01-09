import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// iOS native tab bar height (49pt standard)
const IOS_TAB_BAR_HEIGHT = 49;

/**
 * Returns the total height needed to position elements above the tab bar.
 * Accounts for safe area insets on iOS.
 *
 * @example
 * const tabBarHeight = useTabBarHeight();
 * <View style={{ bottom: tabBarHeight + 16 }} />
 */
export function useTabBarHeight(): number {
  const insets = useSafeAreaInsets();

  if (Platform.OS === 'ios') {
    return insets.bottom + IOS_TAB_BAR_HEIGHT;
  }

  return 0;
}
