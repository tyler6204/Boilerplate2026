import {
  Button as SwiftUIButton,
  Host as SwiftUIHost,
} from '@expo/ui/swift-ui';
import { Button as JetpackButton, Host as JetpackHost } from '@expo/ui/jetpack-compose';
import { buttonStyle, disabled as disabledModifier } from '@expo/ui/swift-ui/modifiers';
import { Platform, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';

type ButtonProps = {
  onPress: () => void | Promise<void>;
  children?: React.JSX.Element;
  useNative?: boolean;
  disabled?: boolean;
};

export default function Button({
  onPress,
  children,
  useNative = undefined,
  disabled = false,
}: ButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.9975, {
      duration: 150,
      easing: Easing.out(Easing.ease),
    });
    opacity.value = withTiming(0.5, {
      duration: 150,
      easing: Easing.out(Easing.ease),
    });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, {
      duration: 150,
      easing: Easing.in(Easing.ease),
    });
    opacity.value = withTiming(1, {
      duration: 150,
      easing: Easing.in(Easing.ease),
    });
  };

  // On Android, default useNative to false; otherwise true
  const shouldUseNative =
    typeof useNative !== 'undefined'
      ? useNative
      : Platform.OS === 'android'
        ? false
        : true;
        
  if (Platform.OS === 'ios' && shouldUseNative) {
    return (
      <SwiftUIHost matchContents>
        <SwiftUIButton onPress={onPress} modifiers={[buttonStyle('plain'), disabledModifier(disabled)]}>
          {children}
        </SwiftUIButton>
      </SwiftUIHost>
    );
  }

  if (Platform.OS === 'android' && shouldUseNative) {
    return (
      <JetpackHost matchContents>
        <JetpackButton variant="borderless" disabled={disabled}>
          {children}
        </JetpackButton>
      </JetpackHost>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View style={[animatedStyle, { alignItems: 'center', justifyContent: 'center' }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}