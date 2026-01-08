import { IconSymbol } from '@/components/icon';
import { cn } from '@/lib/utils';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';

function Spinner({ className }: { className?: string }) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
    >
      <IconSymbol name="arrow.trianglehead.2.clockwise" iconType="tabler" className={cn('size-4 font-bold', className)} />
    </Animated.View>
  );
}

export { Spinner };
