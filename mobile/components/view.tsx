import { useThemeColor } from '@/hooks/use-theme-color';
import { cn } from '@/lib/utils';
import { View as ReactNativeView, type ViewProps } from 'react-native';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { parseThemeColorFromClassName } from '@shared/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type ThemedViewProps = ViewProps & {
  className?: string;
  ignoreSafeArea?: boolean;
};


export function ThemedView({ children, style, className, ignoreSafeArea = false, ...otherProps }: ThemedViewProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');

  // Parse theme colors from className
  const { processedClassName } = parseThemeColorFromClassName(className, colorScheme);

  const inputStyles = tw`${cn(`flex-1 bg-[${backgroundColor}]`, processedClassName)}`;

  if (!ignoreSafeArea) {
    return (
      <SafeAreaView style={inputStyles} {...otherProps}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <ReactNativeView
      style={inputStyles}
      {...otherProps}
    >
      {children}
    </ReactNativeView>
  );
}

export function View({ children, style, className, ...otherProps }: ViewProps) {
  const colorScheme = useColorScheme();
  const { processedClassName } = parseThemeColorFromClassName(className, colorScheme);

  const inputStyles = tw`${cn(``, processedClassName)}`;

  return (
    <ReactNativeView
      style={inputStyles}
      {...otherProps}
    >
      {children}
    </ReactNativeView>
  );
}