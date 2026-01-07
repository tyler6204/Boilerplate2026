import { IconQuestionMark } from '@tabler/icons-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '@/lib/utils';
import { ICON_MAPPING, type IconSymbolName } from './icon-mapping';

type IconType = 'tabler' | 'sf' | 'material' | 'native';

/**
 * An icon component that supports multiple icon libraries.
 * - iOS: SF Symbols (default)
 * - Android: Material Icons (default)
 * - Web: Tabler Icons (default)
 *
 * Icon types:
 * - 'native': Automatically selects SF Symbols (iOS), Material Icons (Android), or Tabler Icons (Web) [default]
 * - 'sf': SF Symbols (iOS only, falls back to Material on other platforms)
 * - 'material': Material Icons
 * - 'tabler': Tabler Icons
 *
 * Icon names are based on SF Symbols and require manual mapping to Tabler/Material Icons.
 *
 * @example
 * <IconSymbol name="house.fill" size={24} color="#000" />
 * <IconSymbol name="chevron.right" weight="semibold" />
 * <IconSymbol name="gear" className="opacity-50" />
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  className,
  style,
  weight = 'regular',
  iconType,
}: {
  name: string | SymbolViewProps['name'] | IconSymbolName;
  size?: number;
  color?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
  iconType?: IconType;
}) {
  const isIOS = Platform.OS === 'ios';

  // Extract name string from potentially complex name type
  let nameString: string;
  if (typeof name === 'string') {
    nameString = name;
  } else if (typeof name === 'object' && name !== null) {
    const nameObj = name as { ios?: string; android?: string; web?: string };
    if (Platform.OS === 'ios' && nameObj.ios) {
      nameString = nameObj.ios;
    } else if (Platform.OS === 'android' && nameObj.android) {
      nameString = nameObj.android;
    } else if (Platform.OS === 'web' && nameObj.web) {
      nameString = nameObj.web;
    } else {
      nameString = nameObj.ios || nameObj.android || nameObj.web || String(name);
    }
  } else {
    nameString = String(name);
  }

  // Determine which icon type to use
  let resolvedIconType: Exclude<IconType, 'native'>;
  const iconTypeToUse = iconType ?? 'native';

  if (iconTypeToUse === 'native') {
    // Native type: SF Symbols on iOS, Material Icons on Android, Tabler Icons on Web
    if (Platform.OS === 'ios') {
      resolvedIconType = 'sf';
    } else if (Platform.OS === 'android') {
      resolvedIconType = 'material';
    } else {
      resolvedIconType = 'tabler';
    }
  } else if (!isIOS && iconTypeToUse === 'sf') {
    // Fallback to material on Android/web if sf-symbol is requested
    resolvedIconType = 'material';
  } else {
    resolvedIconType = iconTypeToUse;
  }

  // Wrapper for className styling
  const renderWithWrapper = (icon: React.ReactNode) => {
    if (className) {
      return (
        <View className={cn(className)} style={style}>
          {icon}
        </View>
      );
    }
    return icon;
  };

  // Render SF Symbols (iOS only)
  if (resolvedIconType === 'sf') {
    return renderWithWrapper(
      <SymbolView
        weight={weight}
        tintColor={color}
        resizeMode="scaleAspectFit"
        name={name as SymbolViewProps['name']}
        style={[{ width: size, height: size }, !className && style]}
      />
    );
  }

  // Render Material Icons
  if (resolvedIconType === 'material') {
    const materialIconName = ICON_MAPPING[nameString]?.material || 'help-outline';
    return renderWithWrapper(
      <MaterialIcons
        name={materialIconName}
        size={size}
        color={color}
        style={!className ? style : undefined}
      />
    );
  }

  // Render Tabler icons
  const TablerIcon = ICON_MAPPING[nameString]?.tabler;
  if (!TablerIcon) {
    return renderWithWrapper(
      <IconQuestionMark
        size={size}
        color={color}
        style={!className ? style : undefined}
      />
    );
  }

  // Convert weight to stroke width (Tabler uses strokeWidth prop)
  const strokeWidth =
    weight === 'bold' ? 2.5 :
    weight === 'semibold' ? 2 :
    weight === 'medium' ? 1.75 :
    1.5;

  return renderWithWrapper(
    <TablerIcon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      style={!className ? style : undefined}
    />
  );
}
