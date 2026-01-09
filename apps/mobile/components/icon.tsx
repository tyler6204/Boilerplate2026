import { IconQuestionMark } from '@tabler/icons-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { Platform } from 'react-native';
import { cn } from '@/lib/utils';
import { getTablerIcon, getMaterialIconName, type IconSymbolName } from './icon-mapping';
import { useResolveClassNames } from 'uniwind';
type IconType = 'tabler' | 'sf' | 'material' | 'native';

/**
 * An icon component that supports multiple icon libraries.
 * - iOS: SF Symbols (default)
 * - Android: Material Icons (default, can be overridden with androidNative={false})
 * - Web: Tabler Icons (default)
 *
 * Icon types:
 * - 'native': Automatically selects SF Symbols (iOS), Material Icons (Android), or Tabler Icons (Web) [default]
 * - 'sf': SF Symbols (iOS only, falls back to Tabler on other platforms)
 * - 'material': Material Icons
 * - 'tabler': Tabler Icons
 *
 * Icon names are based on SF Symbols and require manual mapping to Tabler/Material Icons.
 * All styling (size, color, weight) is controlled via className.
 *
 * @example
 * <IconSymbol name="house.fill" className="size-6 text-primary" />
 * <IconSymbol name="chevron.right" className="w-5 h-5 font-semibold text-foreground" />
 * <IconSymbol name="gear" className="opacity-50" />
 * <IconSymbol name="gear" androidNative={false} /> // Uses Tabler on Android
 */
export function IconSymbol({
  name,
  className,
  iconType,
  androidNative = true,
}: {
  name: string | SymbolViewProps['name'] | IconSymbolName;
  className?: string;
  iconType?: IconType;
  androidNative?: boolean;
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

  // Resolve styles from className
  const resolvedStyles = useResolveClassNames(cn(className ?? ''));

  // Extract size from width/height (default to 24 if not specified)
  const size = resolvedStyles?.width
    ? typeof resolvedStyles.width === 'number'
      ? resolvedStyles.width
      : 24
    : resolvedStyles?.height
      ? typeof resolvedStyles.height === 'number'
        ? resolvedStyles.height
        : 24
      : 24;

  // Extract color
  const resolvedColor = resolvedStyles?.color?.toString();

  // Extract weight from font-weight or className
  // Check for font-weight classes in className
  const getWeightFromClassName = (): SymbolWeight => {
    if (!className) return 'regular';
    const classStr = className.toLowerCase();
    if (classStr.includes('font-thin') || classStr.includes('font-100')) return 'ultraLight';
    if (classStr.includes('font-light') || classStr.includes('font-300')) return 'light';
    if (classStr.includes('font-normal') || classStr.includes('font-400')) return 'regular';
    if (classStr.includes('font-medium') || classStr.includes('font-500')) return 'medium';
    if (classStr.includes('font-semibold') || classStr.includes('font-600')) return 'semibold';
    if (classStr.includes('font-bold') || classStr.includes('font-700')) return 'bold';
    if (classStr.includes('font-extrabold') || classStr.includes('font-800')) return 'heavy';
    if (classStr.includes('font-black') || classStr.includes('font-900')) return 'black';
    return 'regular';
  };

  const weight = resolvedStyles?.fontWeight
    ? typeof resolvedStyles.fontWeight === 'number'
      ? resolvedStyles.fontWeight >= 900 ? 'black'
        : resolvedStyles.fontWeight >= 800 ? 'heavy'
          : resolvedStyles.fontWeight >= 700 ? 'bold'
            : resolvedStyles.fontWeight >= 600 ? 'semibold'
              : resolvedStyles.fontWeight >= 500 ? 'medium'
                : resolvedStyles.fontWeight >= 300 ? 'light'
                  : resolvedStyles.fontWeight >= 200 ? 'ultraLight'
                    : 'regular'
      : getWeightFromClassName()
    : getWeightFromClassName();

  // Determine which icon type to use
  let resolvedIconType: Exclude<IconType, 'native'>;
  const iconTypeToUse = iconType ?? 'native';

  if (iconTypeToUse === 'native') {
    // Native type: SF Symbols on iOS, Material Icons on Android (or Tabler if androidNative=false), Tabler Icons on Web
    if (Platform.OS === 'ios') {
      resolvedIconType = 'sf';
    } else if (Platform.OS === 'android') {
      resolvedIconType = androidNative ? 'material' : 'tabler';
    } else {
      resolvedIconType = 'tabler';
    }
  } else if (!isIOS && iconTypeToUse === 'sf') {
    // Fallback to tabler on Android/web if sf-symbol is requested
    resolvedIconType = 'tabler';
  } else {
    resolvedIconType = iconTypeToUse;
  }

  // Render SF Symbols (iOS only)
  if (resolvedIconType === 'sf') {
    return (
      <SymbolView
        weight={weight}
        tintColor={resolvedColor}
        resizeMode="scaleAspectFit"
        name={name as SymbolViewProps['name']}
        size={size}
        className={className}
      />
    );
  }

  // Render Material Icons
  if (resolvedIconType === 'material') {
    const materialIconName = getMaterialIconName(nameString, 'IconSymbol');
    return (
      <MaterialIcons
        name={materialIconName}
        size={size}
        color={resolvedColor}
        className={className}
      />
    );
  }

  // Render Tabler icons
  const TablerIcon = getTablerIcon(nameString, 'IconSymbol');
  if (!TablerIcon) {
    return (
      <IconQuestionMark
        size={size}
        color={resolvedColor}
        className={className}
      />
    );
  }

  // Convert weight to stroke width (Tabler uses strokeWidth prop)
  const strokeWidth =
    weight === 'bold' ? 4 :
    weight === 'semibold' ? 3.25 :
    weight === 'medium' ? 2.75 :
    weight === 'regular' ? 2 :
    weight === 'light' ? 1.25 :
    1;

  return (
    <TablerIcon
      size={size}
      color={resolvedColor}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
}
