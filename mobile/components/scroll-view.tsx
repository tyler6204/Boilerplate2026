import { useThemeColor } from '@/hooks/use-theme-color';
import { cn } from '@/lib/utils';
import { ScrollView, type ScrollViewProps, type StyleProp, type ViewStyle } from 'react-native';
import tw from 'twrnc';
import { parseThemeColorFromClassName } from '@shared/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type ThemedScrollViewProps = Omit<ScrollViewProps, 'contentContainerStyle'> & {
  className?: string;
  hasTransparentHeader?: boolean;
  contentContainerStyle?: string | StyleProp<ViewStyle>;
};

export function ThemedScrollView({
  children,
  style,
  className,
  hasTransparentHeader = false,
  contentContainerStyle,
  ...otherProps
}: ThemedScrollViewProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');

  // Parse theme colors from className
  const { processedClassName } = parseThemeColorFromClassName(className, colorScheme);

  // Parse contentContainerStyle if it's a className string
  let resolvedContentContainerStyle: StyleProp<ViewStyle> | undefined;
  if (typeof contentContainerStyle === 'string') {
    const { processedClassName: processedContentClassName } = parseThemeColorFromClassName(contentContainerStyle, colorScheme);
    resolvedContentContainerStyle = processedContentClassName ? tw`${cn(processedContentClassName)}` : undefined;
  } else {
    resolvedContentContainerStyle = contentContainerStyle;
  }

  const scrollViewStyles = tw`${cn(`bg-[${backgroundColor}]`, processedClassName)}`;

  return (
    <ScrollView
      style={[scrollViewStyles, style]}
      contentContainerStyle={resolvedContentContainerStyle}
      {...otherProps}
    >
      {children}
    </ScrollView>
  );
}
