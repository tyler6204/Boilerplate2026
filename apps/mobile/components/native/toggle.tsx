import {
  Toggle as SwiftUIToggle,
  Host as SwiftUIHost,
} from '@expo/ui/swift-ui';
import { Switch as JetpackSwitch, Host as JetpackHost } from '@expo/ui/jetpack-compose';
import { disabled as disabledModifier } from '@expo/ui/swift-ui/modifiers';
import type { SFSymbol } from 'sf-symbols-typescript';
import type { ReactNode } from 'react';
import { Platform, Switch as RNSwitch, StyleSheet, View } from 'react-native';
import { Text } from './text';

type ToggleProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  systemImage?: SFSymbol;
  children?: ReactNode;
  useNative?: boolean;
  disabled?: boolean;
  variant?: 'checkbox' | 'switch' | 'button';
  color?: string;
};

export default function Toggle({
  value,
  onValueChange,
  label,
  systemImage,
  children,
  useNative = undefined,
  disabled = false,
  variant,
  color,
}: ToggleProps) {
  const shouldUseNative =
    typeof useNative !== 'undefined'
      ? useNative
      : Platform.OS === 'android'
        ? false
        : true;

  const labelNode = children ?? (label ? <Text>{label}</Text> : null);

  if (Platform.OS === 'ios' && shouldUseNative) {
    const hasCustomLabel = Boolean(children);
    return (
      <SwiftUIHost matchContents>
        <SwiftUIToggle
          isOn={value}
          onIsOnChange={disabled ? undefined : onValueChange}
          label={hasCustomLabel ? undefined : label}
          systemImage={hasCustomLabel ? undefined : systemImage}
          modifiers={[disabledModifier(disabled)]}
        >
          {children}
        </SwiftUIToggle>
      </SwiftUIHost>
    );
  }

  if (Platform.OS === 'android' && shouldUseNative) {
    const toggle = (
      <JetpackHost matchContents>
        <JetpackSwitch
          value={value}
          onValueChange={onValueChange}
          label={label}
          variant={variant}
          color={color}
        />
      </JetpackHost>
    );

    if (!labelNode) {
      return toggle;
    }

    return (
      <View style={styles.row}>
        {toggle}
        <View style={styles.label}>{labelNode}</View>
      </View>
    );
  }

  if (!labelNode) {
    return (
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      />
    );
  }

  return (
    <View style={styles.row}>
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ true: 'brand', false: 'blue' }}
      />
      <View style={styles.label}>{labelNode}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 8,
  },
});
