import { PropsWithChildren, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Layout, Easing } from 'react-native-reanimated';
import { View } from '@/components/view';
import { Text } from '@/components/native/text';
import { IconSymbol } from '@/components/native/icon';
import Button from '@/components/native/button';

type CollapsibleProps = PropsWithChildren<{
  title: string;
  defaultOpen?: boolean;
}>;

export function Collapsible(props: CollapsibleProps) {
  const { children, title, defaultOpen = false } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const rotation = useSharedValue(defaultOpen ? 90 : 0);
  const opacity = useSharedValue(defaultOpen ? 1 : 0);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    rotation.value = withTiming(newIsOpen ? 90 : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });

    opacity.value = withTiming(newIsOpen ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  };

  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      marginTop: (1.5 * 4),
    };
  });

  return (
    <View>
      <Button onPress={handleToggle}>
        <View className="flex-row items-center gap-1.5 justify-between w-full">
          <Text className="font-semibold text-title3">{title}</Text>
          <Animated.View style={chevronStyle}>
            <IconSymbol
              name="chevron.right"
              className="text-foreground"
              weight="medium"
            />
          </Animated.View>
        </View>
      </Button>
      {isOpen && (
        <Animated.View
          style={[contentStyle]}
        >
          {children}
        </Animated.View>
      )}
    </View>
  );
}
