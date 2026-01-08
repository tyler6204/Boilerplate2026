import { useTailwindToHex } from "@/hooks/useTailwindToHex";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from "react-native-reanimated";

export type ShimmerProps = {
  children: ReactNode;
  tintColor?: string;
  enabled?: boolean;
  opacity?: number;
  rotation?: number;
  duration?: number;
  shimmerWidthRatio?: number;
  delay?: number;
};

export function Shimmer({
  children,
  tintColor,
  enabled = true,
  opacity = 0.7,
  rotation = 0,
  duration = 1000,
  shimmerWidthRatio = 0.4,
  delay = 0
}: ShimmerProps) {
  const themeTintColor = useTailwindToHex('primary');
  // If tintColor is provided, it's a Tailwind color name; otherwise use the resolved theme color
  const tintColorName = tintColor ?? 'primary';
  const gradientColor1 = useTailwindToHex(tintColorName, 0.2) ?? '';
  const gradientColor2 = tintColor ? tintColor : (themeTintColor ?? '');
  const gradientColor3 = useTailwindToHex(tintColorName, 0.2) ?? '';
  const shimmerPosition = useSharedValue(-1);
  const [layout, setLayout] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (!enabled || !layout) {
      shimmerPosition.value = -1;
      return;
    }

    // Start from 0 so shimmer is immediately visible, then animate to 1
    shimmerPosition.value = 0;
    shimmerPosition.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration,
          easing: Easing.linear,
        }),
        -1,
        false
      )
    );
  }, [enabled, layout, shimmerPosition, duration, delay]);

  const shimmerStyle = useAnimatedStyle(() => {
    if (!layout || !enabled) {
      return { opacity: 0 };
    }

    const { width } = layout;
    const shimmerWidth = width * shimmerWidthRatio;
    const startX = shimmerPosition.value * (width + shimmerWidth) - shimmerWidth;

    return {
      position: 'absolute',
      left: startX,
      top: 0,
      width: shimmerWidth,
      height: layout.height,
      opacity: 1,
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const handleLayout = (event: { nativeEvent: { layout: { width: number; height: number } } }) => {
    const { width, height } = event.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setLayout({ width, height });
    }
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {/* Base children - slightly dimmed when shimmer is active */}
      <View style={[styles.childrenContainer, enabled && { opacity }]}>
        {children}
      </View>
      {/* Masked shimmer overlay - gradient is clipped to children shapes */}
      {layout && enabled && (
        <View style={[styles.shimmerContainer, { width: layout.width, height: layout.height }]} pointerEvents="none">
          <MaskedView
            style={StyleSheet.absoluteFill}
            maskElement={
              <View style={styles.maskElement}>
                {children}
              </View>
            }
          >
            {/* Animated gradient - masked to children shapes */}
            <Animated.View style={[shimmerStyle, styles.shimmerGradient]}>
              <LinearGradient
                colors={[gradientColor1, gradientColor2, gradientColor3]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </MaskedView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  childrenContainer: {
    position: 'relative',
  },
  shimmerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  maskElement: {
    backgroundColor: 'transparent',
  },
  shimmerGradient: {
    overflow: 'hidden',
  },
});
