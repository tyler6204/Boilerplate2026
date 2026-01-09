import { GlassView as ExpoGlassView, isLiquidGlassAvailable, type GlassStyle } from 'expo-glass-effect';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';
import { useTailwindToHex } from '@/hooks/useTailwindToHex';
import { useResolveStyles } from '@/hooks/useResolveStyles';
import { useUniwind } from 'uniwind'

export type GlassViewProps = ViewProps & {
  className?: string;
  tintColor?: string;
  glassEffectStyle?: GlassStyle;
  interactive?: boolean;
};

/**
 * A glass-effect view component that uses native liquid glass on supported
 * devices (iOS 26+) and falls back to a translucent overlay on older devices.
 *
 * @example
 * <GlassView className="p-4 rounded-xl">
 *   <Text>Content</Text>
 * </GlassView>
 * <GlassView tintColor="primary" interactive>
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

  const { theme } = useUniwind();
  const isDark = theme === 'dark';
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
  }

  // Fallback: translucent background with shadow (light) / border (dark)
  let fallbackBackground;
  if (resolvedTintColor) {
    fallbackBackground = resolvedTintColor;
  } else {
    switch (theme) {
      case 'dark':
        fallbackBackground = 'rgba(20, 20, 20, 0.975)';
        break;
      case 'light':
        fallbackBackground = 'rgba(255, 255, 255, 0.975)';
        break;
    }
  }

  return (
    <View
      className={cn(
        'overflow-hidden',
        !isDark && 'shadow-lg shadow-black/15',
        isDark && 'border',
        isDark && !resolvedTintColor && 'border-white/10',
        className
      )}
      style={[
        { backgroundColor: fallbackBackground },
        isDark && resolvedTintColor && { borderColor: resolvedTintColor },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </View>
  );
}
