import { Text as ReactNativeText } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { cn } from '@/lib/utils';
import tw from 'twrnc';
import { parseThemeColorFromClassName, parseFontSizeFromClassName } from '@shared/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ReactNode } from 'react';

type TextProps = {
  children: ReactNode;
  className?: string;
};

export function Text({ children, className, ...props }: TextProps) {
  const colorScheme = useColorScheme();
  const defaultTextColor = useThemeColor({}, 'foreground');
  let fontSize = 17; // Default to body size

  // Check if headline is present in the original className
  const isHeadline = /\b(text-|font-)headline\b/.test(className || '');

  // Extract font-weight classes from the original className before parsing
  // This ensures font-weight classes are preserved and applied correctly
  const fontWeightMatch = className?.match(/\b(font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black))\b/);
  const fontWeightClass = fontWeightMatch ? fontWeightMatch[1] : null;

  // Remove font-weight classes from className to avoid duplication during parsing
  // Replace with word boundaries and clean up multiple spaces
  const classNameWithoutFontWeight = fontWeightClass
    ? className?.replace(new RegExp(`\\b${fontWeightClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'), '').replace(/\s+/g, ' ').trim()
    : className;

  // Parse className for theme colors (without font-weight classes)
  const { processedClassName: colorProcessedClassName } = parseThemeColorFromClassName(classNameWithoutFontWeight, colorScheme);

  // Parse className for font sizes
  const { fontSize: themeFontSize, processedClassName: finalClassName } = parseFontSizeFromClassName(colorProcessedClassName);
  if (themeFontSize) {
    fontSize = themeFontSize;
  }

  // Check if there's already a text color in the processed className
  // This matches both arbitrary values (text-[#hex]) and standard Tailwind classes (text-blue-500, text-brand, etc.)
  // We use word boundary to match any text- class (excluding the font-size one we add later)
  const hasTextColor = /\btext-/.test(finalClassName);

  // Build className parts - add font-semibold first for headlines so user classes can override it
  const classNameParts: string[] = [];
  if (isHeadline && !fontWeightClass) {
    classNameParts.push('font-semibold');
  }
  // Add user-specified font-weight class if present (this will override headline default)
  if (fontWeightClass) {
    classNameParts.push(fontWeightClass);
  }
  classNameParts.push(finalClassName);

  // Only apply default text color if no text color class is present
  if (!hasTextColor) {
    classNameParts.push(`text-[${defaultTextColor}]`);
  }
  classNameParts.push(`text-[${fontSize}px]`);

  const finalClassNameForTw = cn(...classNameParts);
  const inputStyles = tw`${finalClassNameForTw}`;

  return (
    <ReactNativeText style={inputStyles} {...props}>
      {children}
    </ReactNativeText>
  );
}