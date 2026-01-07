import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/components/theme-provider';
import type { StatusBarStyle } from 'expo-status-bar';

export default function DynamicStatusBar() {
  const { resolvedTheme } = useTheme();

  // Map theme to status bar style:
  // - light: dark text (style="dark")
  // - dark: white text (style="light")
  // - christmas: white text (style="light")
  const getStatusBarStyle = (): StatusBarStyle => {
    switch (resolvedTheme) {
      case 'light':
        return 'dark';
      case 'dark':
      case 'christmas':
        return 'light';
      default:
        return 'auto';
    }
  };

  return <StatusBar style={getStatusBarStyle()}/>;
}
