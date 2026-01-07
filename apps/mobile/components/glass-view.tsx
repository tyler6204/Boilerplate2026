import { BlurView } from 'expo-blur';
import { GlassView as ExpoGlassView, isLiquidGlassAvailable, type GlassStyle } from 'expo-glass-effect';
import { Pressable, View, type ViewProps, Platform } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';
import { type ThemeColorKey, theme, oklchToHex, hexWithAlpha } from '@repo/theme';
import { useResolveClassNames } from 'uniwind'

export type GlassViewProps = ViewProps & {
  className?: string;
  tintColor?: string | ThemeColorKey;
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
  const { resolvedTheme, isDark } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (interactive) {
      scale.value = withSpring(1.0175, { damping: 50, stiffness: 600 });
    }
  };

  const handlePressOut = () => {
    if (interactive) {
      scale.value = withSpring(1, { damping: 30, stiffness: 400 });
    }
  };

  // Helper function to resolve tintColor to a hex value
  const resolveTintColor = (tint: string | ThemeColorKey | undefined): string | undefined => {
    if (!tint) return undefined;

    // If it's already a hex color, return it as-is
    if (tint.startsWith('#')) {
      return tint;
    }

    const mode = resolvedTheme;

    // Check if it's a theme color with opacity (e.g., "brand/60")
    const opacityMatch = tint.match(/^([\w-]+)\/(\d+)$/);
    if (opacityMatch) {
      const [, colorName, opacityStr] = opacityMatch;
      if (colorName in theme) {
        const themeColor = theme[colorName as ThemeColorKey][mode];
        let resolvedColor: string;

        if (themeColor.startsWith('oklch(')) {
          resolvedColor = oklchToHex(themeColor);
        } else {
          resolvedColor = themeColor;
        }

        const opacity = parseInt(opacityStr, 10) / 100;
        return hexWithAlpha(resolvedColor, opacity);
      }
    }

    // Check if it's a theme color key (e.g., "brand", "success", "destructive")
    if (tint in theme) {
      const themeColor = theme[tint as ThemeColorKey][mode];

      if (themeColor.startsWith('oklch(')) {
        return oklchToHex(themeColor);
      }
      return themeColor;
    }

    // Return as-is (might be a valid color string like "red", "rgb(...)", etc.)
    return tint;
  };

  const resolvedTintColorStyle = useResolveClassNames(cn("bg-background", tintColor));
  const resolvedTintColor = resolvedTintColorStyle?.backgroundColor?.toString();

  const resolvedClassNames = useResolveClassNames(cn("bg-background", className ?? ''));

  // Use native liquid glass when available (iOS 26+)
  if (hasLiquidGlass) {
    return (
      <ExpoGlassView
        className={className}
        style={resolvedClassNames}
        isInteractive={interactive}
        tintColor={resolvedTintColor}
        {...otherProps}
      >
        {children}
      </ExpoGlassView>
    );
  }

  // Fallback to blur effect
  const isLightMode = !isDark;
  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';

  // Build fallback blur styles
  const bgClassName = isLightMode ? '' : (glassEffectStyle === 'clear' ? 'bg-foreground-secondary/10' : 'bg-foreground-secondary/5');
  const borderClassName = ((isIOS && isDark) || isAndroid) ? `border border-border${isLightMode ? '/50' : ''}` : '';
  const shadowClassName = isLightMode ? 'shadow-md' : '';

  const content = (
    <Animated.View
      className={shadowClassName}
      style={interactive ? animatedStyle : undefined}
    >
      <BlurView
        intensity={8}
        tint="systemMaterial"
        className={cn(bgClassName, borderClassName, 'overflow-hidden', className)}
        style={[
          resolvedTintColor ? { backgroundColor: resolvedTintColor } : undefined,
          style,
        ]}
      >
        {children}
      </BlurView>
    </Animated.View>
  );

  if (interactive) {
    return (
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        {content}
      </Pressable>
    );
  }

  return content;
}
