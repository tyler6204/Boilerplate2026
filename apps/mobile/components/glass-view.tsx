import { GlassView as ExpoGlassView, isLiquidGlassAvailable, type GlassStyle } from 'expo-glass-effect';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';
import { useTailwindToHex } from '@/hooks/useTailwindToHex';
import { useResolveStyles } from '@/hooks/useResolveStyles';

export type GlassViewProps = ViewProps & {
  className?: string;
  tintColor?: string;
  glassEffectStyle?: GlassStyle;
  interactive?: boolean;
};

/**
 * A glass-effect view component that uses native liquid glass on supported
 * devices (iOS 26+) and falls back to blur effects on older devices.
 *
 * @example
 * <GlassView className="p-4 rounded-xl">
 *   <Text>Content</Text>
 * </GlassView>
 * <GlassView tintColor="brand" interactive>
 *   <Text>Interactive glass button</Text>
 * </GlassView>
 */
export function GlassView({
  style,
  className,
  tintColor,
  glassEffectStyle = 'regular',
  interactive = false,
  children,
  ...otherProps
}: GlassViewProps) {
  const hasLiquidGlass = isLiquidGlassAvailable();

  const resolvedTintColor = useTailwindToHex(tintColor);
  const resolvedClassName = useResolveStyles(className);

  // Use native liquid glass when available (iOS 26+)
  if (hasLiquidGlass) {
    return (
      <ExpoGlassView
        style={resolvedClassName}
        isInteractive={interactive}
        tintColor={resolvedTintColor}
        {...otherProps}
      >
        {children}
      </ExpoGlassView>
    );
  }else{
    return (
      <View className={cn(className)}>
        {children}
      </View>
    );
  }
}
