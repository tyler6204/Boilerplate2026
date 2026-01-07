import { cn } from '@/lib/utils';
import { View as ReactNativeView, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps & {
  className?: string;
  ignoreSafeArea?: boolean;
};

export function ThemedView({
  children,
  style,
  className,
  ignoreSafeArea = false,
  ...otherProps
}: ThemedViewProps) {
  const finalClassName = cn("flex-1 bg-background", className);

  if (!ignoreSafeArea) {
    return (
      <SafeAreaView className={finalClassName} style={style} {...otherProps}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <ReactNativeView className={finalClassName} style={style} {...otherProps}>
      {children}
    </ReactNativeView>
  );
}

export function View({ children, style, className, ...otherProps }: ViewProps & { className?: string }) {
  return (
    <ReactNativeView className={className} style={style} {...otherProps}>
      {children}
    </ReactNativeView>
  );
}
