import { BlurView } from 'expo-blur';
import { GlassView as ExpoGlassView, isLiquidGlassAvailable, type GlassStyle } from 'expo-glass-effect';
import { Pressable, type ViewProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { cn } from '@/lib/utils';
import tw from 'twrnc';
import { Platform } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { parseThemeColorFromClassName, type ThemeColorKey, theme, oklchToHex, hexWithAlpha } from '@shared/constants/theme';

export type GlassViewProps = ViewProps & {
  className?: string;
  tintColor?: string | ThemeColorKey;
  glassEffectStyle?: GlassStyle;
  interactive?: boolean;
};

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
  const colorScheme = useColorScheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (interactive) {
      scale.value = withSpring(1.0175, {
        damping: 50,
        stiffness: 600,
      });
    }
  };

  const handlePressOut = () => {
    if (interactive) {
      scale.value = withSpring(1, {
        damping: 30,
        stiffness: 400,
      });
    }
  };

  // Helper function to resolve tintColor to a hex value
  const resolveTintColor = (tint: string | ThemeColorKey | undefined): string | undefined => {
    if (!tint) return undefined;

    // If it's already a hex color, return it as-is
    if (tint.startsWith('#')) {
      return tint;
    }

    const mode: 'light' | 'dark' = colorScheme === 'dark' ? 'dark' : 'light';

    // Check if it's a theme color with opacity (e.g., "brand/60")
    const opacityMatch = tint.match(/^([\w-]+)\/(\d+)$/);
    if (opacityMatch) {
      const [, colorName, opacityStr] = opacityMatch;
      if (colorName in theme) {
        const themeColor = theme[colorName as ThemeColorKey][mode];
        let resolvedColor: string;

        // Convert oklch to hex if needed
        if (themeColor.startsWith('oklch(')) {
          resolvedColor = oklchToHex(themeColor);
        } else {
          resolvedColor = themeColor;
        }

        // Apply opacity
        const opacity = parseInt(opacityStr, 10) / 100;
        return hexWithAlpha(resolvedColor, opacity);
      }
    }

    // Check if it's a theme color key (e.g., "brand", "success", "destructive")
    if (tint in theme) {
      const themeColor = theme[tint as ThemeColorKey][mode];

      // Convert oklch to hex if needed
      if (themeColor.startsWith('oklch(')) {
        return oklchToHex(themeColor);
      }
      return themeColor;
    }

    // Try to parse as a Tailwind color class (e.g., "red-500")
    // Use parseThemeColorFromClassName to handle it
    const { color } = parseThemeColorFromClassName(`bg-${tint}`, colorScheme);
    if (color) {
      return color;
    }

    // If all else fails, return the original value (might be a valid color string)
    return tint;
  };

  const resolvedTintColor = resolveTintColor(tintColor);

  const renderContent = () => {
    // Parse theme colors from className
    const { processedClassName } = parseThemeColorFromClassName(className, colorScheme);
    const finalClassName = cn(processedClassName);
    const classNameStyles = finalClassName ? tw`${finalClassName}` : {};

    // Use native liquid glass when available
    if (hasLiquidGlass) {
      return (
        <ExpoGlassView
          style={[classNameStyles, style]}
          glassEffectStyle={glassEffectStyle}
          isInteractive={interactive}
          tintColor={resolvedTintColor}
          {...otherProps}
        >
          {children}
        </ExpoGlassView>
      );
    }
    const isLightMode = colorScheme === 'light';
    const isIOS = Platform.OS === 'ios';
    const isAndroid = Platform.OS === 'android';

    const shadowClassName = !isLightMode ? '' : 'shadow-md shadow-foreground';
    const bgClass = isLightMode ? '' : (glassEffectStyle === 'clear' ? 'bg-foreground-secondary/10' : 'bg-foreground-secondary/5');

    // Border logic: 
    // - Show border for ios only in light mode
    // - Always show border for android
    let borderClass = '';
    if ((isIOS && !isLightMode) || isAndroid) {
      borderClass = `border border-border${isLightMode ? '/50' : ''}`;
    }

    const blurClassName = `${bgClass} overflow-hidden ${borderClass}`.trim();

    let shadowStyle = shadowClassName
      ? tw`${cn(parseThemeColorFromClassName(shadowClassName, colorScheme).processedClassName)}`
      : {};

    const { processedClassName: processedBlurClass } = parseThemeColorFromClassName(blurClassName, colorScheme);
    const blurStyles = tw`${cn(processedBlurClass, resolvedTintColor ? `bg-[${resolvedTintColor}]` : '')}`;

    const content = (
      <Animated.View style={[shadowStyle, interactive ? animatedStyle : {}]}>
        <BlurView
          intensity={8}
          tint='systemMaterial'
          style={[blurStyles, classNameStyles, style]}
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
  };

  return renderContent();
}

