import { StatusBar } from 'expo-status-bar';
import type { StatusBarStyle } from 'expo-status-bar';

export default function DynamicStatusBar() {

  // Map theme to status bar style:
  const getStatusBarStyle = (): StatusBarStyle => {
    return 'auto';
  };

  return <StatusBar style={getStatusBarStyle()}/>;
}
