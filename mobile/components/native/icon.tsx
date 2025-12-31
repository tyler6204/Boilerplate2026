import { IconQuestionMark } from '@tabler/icons-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { Platform, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { cn } from '@/lib/utils';
import tw from 'twrnc';
import { parseThemeColorFromClassName, parseFontSizeFromClassName } from '@shared/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ICON_MAPPING, type IconSymbolName } from './icon-mapping';

type IconType = 'tabler' | 'sf' | 'material' | 'native';

/**
 * Parses weight from className (e.g., "font-thin", "font-bold", "font-semibold")
 * Maps Tailwind font-weight classes to SymbolWeight values
 */
function parseWeightFromClassName(className: string | undefined): { weight: SymbolWeight; processedClassName: string } {
  if (!className) {
    return { weight: 'regular', processedClassName: '' };
  }

  const weightMap: Record<string, SymbolWeight> = {
    'font-thin': 'thin',
    'font-extralight': 'ultraLight',
    'font-light': 'light',
    'font-normal': 'regular',
    'font-medium': 'medium',
    'font-semibold': 'semibold',
    'font-bold': 'bold',
    'font-extrabold': 'heavy',
    'font-black': 'black',
  };

  // Find font-weight class in className
  const fontWeightMatch = className.match(/\b(font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black))\b/);
  const fontWeightClass = fontWeightMatch ? fontWeightMatch[1] : null;
  const weight = fontWeightClass && fontWeightClass in weightMap ? weightMap[fontWeightClass] : 'regular';

  // Remove font-weight class from className
  const processedClassName = fontWeightClass
    ? className.replace(new RegExp(`\\b${fontWeightClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'), '').replace(/\s+/g, ' ').trim()
    : className;

  return { weight, processedClassName };
}

/**
 * Parses size from className (e.g., "w-4", "h-6", "size-8", "w-[24]", "text-caption", "font-body")
 * Priority: size-* > w-* or h-* > text size classes (text-* or font-*)
 * Tailwind spacing scale: 1 unit = 4px (0.25rem)
 */
function parseSizeFromClassName(className: string | undefined): { size: number | null; processedClassName: string } {
  if (!className) {
    return { size: null, processedClassName: '' };
  }

  let processedClassName = className;
  let size: number | null = null;

  // Try to match size-* first (highest priority)
  const sizeMatch = className.match(/(^|\s)size-(\d+(?:\.\d+)?)(?=\s|$)/) || className.match(/(^|\s)size-\[(\d+(?:\.\d+)?)\](?=\s|$)/);
  if (sizeMatch) {
    const numericValue = parseFloat(sizeMatch[2]);
    if (sizeMatch[0].includes('[')) {
      // Arbitrary value: use directly
      size = numericValue;
    } else {
      // Tailwind scale: multiply by 4 (1 unit = 4px)
      size = numericValue * 4;
    }
    const escapedMatch = sizeMatch[0].trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    processedClassName = processedClassName.replace(new RegExp(`(^|\\s)${escapedMatch}(?=\\s|$)`, 'g'), '$1').trim();
    return { size, processedClassName };
  }

  // Try to match w-* or h-* (second priority)
  const widthMatch = className.match(/(^|\s)w-(\d+(?:\.\d+)?)(?=\s|$)/) || className.match(/(^|\s)w-\[(\d+(?:\.\d+)?)\](?=\s|$)/);
  const heightMatch = className.match(/(^|\s)h-(\d+(?:\.\d+)?)(?=\s|$)/) || className.match(/(^|\s)h-\[(\d+(?:\.\d+)?)\](?=\s|$)/);

  const match = widthMatch || heightMatch;
  if (match) {
    const numericValue = parseFloat(match[2]);
    if (match[0].includes('[')) {
      // Arbitrary value: use directly
      size = numericValue;
    } else {
      // Tailwind scale: multiply by 4 (1 unit = 4px)
      size = numericValue * 4;
    }

    // Remove both w-* and h-* if they exist (icons are square)
    processedClassName = processedClassName
      .replace(/(^|\s)(w|h)-(\d+(?:\.\d+)?)(?=\s|$)/g, '$1')
      .replace(/(^|\s)(w|h)-\[(\d+(?:\.\d+)?)\](?=\s|$)/g, '$1')
      .trim();
    return { size, processedClassName };
  }

  // Fallback: check for text size classes (text-*/font-*) if no explicit size found
  const { fontSize: textFontSize, processedClassName: fontSizeProcessedClassName } = parseFontSizeFromClassName(processedClassName);
  if (textFontSize) {
    size = textFontSize;
    processedClassName = fontSizeProcessedClassName;
  }

  return { size, processedClassName };
}

/**
 * An icon component that supports multiple icon libraries.
 * - iOS: SF Symbols
 * - Android: Material Icons
 * - Web: Tabler Icons
 * 
 * Icon types (defaults to 'native'):
 * - 'native': Automatically selects SF Symbols (iOS), Material Icons (Android), or Tabler Icons (Web) [default]
 * - 'sf': SF Symbols (iOS only, falls back to Material on other platforms)
 * - 'material': Material Icons
 * - 'tabler': Tabler Icons
 * 
 * Icon `name`s are based on SF Symbols and require manual mapping to Tabler/Material Icons.
 * 
 * Size, color, and weight can be parsed from className (e.g., "w-6 text-brand font-bold" or "size-8 text-foreground/60 font-semibold")
 */
export function IconSymbol({
  name,
  className,
  style,
  weight,
  iconType,
}: {
  name: string | SymbolViewProps['name'] | IconSymbolName;
  className?: string;
  style?: StyleProp<ViewStyle | TextStyle>;
  weight?: SymbolWeight;
  iconType?: IconType;
}) {
  const isIOS = Platform.OS === 'ios';
  const colorScheme = useColorScheme();
  const defaultColor = useThemeColor({}, 'foreground');

  // Parse weight from className (if not provided as prop)
  const { weight: parsedWeight, processedClassName: weightProcessedClassName } = parseWeightFromClassName(className);
  const finalWeight = weight ?? parsedWeight;

  // Parse size from className
  const { size: parsedSize, processedClassName: sizeProcessedClassName } = parseSizeFromClassName(weightProcessedClassName);
  const size = parsedSize ?? 17;

  // Parse color from className
  const { color: parsedColor, processedClassName: colorProcessedClassName } = parseThemeColorFromClassName(sizeProcessedClassName, colorScheme);
  const color = parsedColor ?? defaultColor;

  // Apply remaining className styles
  const finalClassName = cn(colorProcessedClassName);
  const classNameStyles = finalClassName ? tw`${finalClassName}` : {};

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

  // Render SF Symbols (iOS only)
  if (resolvedIconType === 'sf') {
    return (
      <SymbolView
        weight={finalWeight}
        tintColor={color}
        resizeMode="scaleAspectFit"
        name={name as SymbolViewProps['name']}
        style={[
          {
            width: size,
            height: size,
          },
          classNameStyles,
          style as StyleProp<ViewStyle>,
        ]}
      />
    );
  }

  // Render Material Icons
  if (resolvedIconType === 'material') {
    const materialIconName = ICON_MAPPING[nameString]?.material || 'help-outline';
    return (
      <MaterialIcons
        name={materialIconName}
        size={size}
        color={color as string}
        style={[classNameStyles, style as StyleProp<TextStyle>]}
      />
    );
  }

  // Render Tabler icons
  const TablerIcon = ICON_MAPPING[nameString]?.tabler;
  if (!TablerIcon) {
    //return default icon
    return (
      <IconQuestionMark
        size={size}
        color={color as string}
        style={[classNameStyles, style as StyleProp<ViewStyle>]}
      />
    );
  }

  // Convert weight to stroke width (Tabler uses strokeWidth prop)
  const strokeWidth = finalWeight === 'bold' ? 2.5 : finalWeight === 'semibold' ? 2 : finalWeight === 'medium' ? 1.75 : 1.5;

  return (
    <TablerIcon
      size={size}
      color={color as string}
      strokeWidth={strokeWidth}
      style={[classNameStyles, style as StyleProp<ViewStyle>]}
    />
  );
}
