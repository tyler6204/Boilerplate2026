import * as React from 'react';
import { Platform } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useResolveStyles } from '@/hooks/useResolveStyles';

// MARK: - iOS Imports (SwiftUI)
import {
  Picker as SwiftUIPicker,
  Host as SwiftUIHost,
  Text as SwiftUIText,
} from '@expo/ui/swift-ui';
import { pickerStyle, tag } from '@expo/ui/swift-ui/modifiers';

// MARK: - Android Imports (Jetpack Compose)
import {
  Picker as JetpackPicker,
  Host as JetpackHost,
} from '@expo/ui/jetpack-compose';
import { useTailwindToHex } from '@/hooks/useTailwindToHex';

// MARK: - Types

/** Picker option configuration (input) */
export interface PickerOption {
  /** Display label for the option */
  label: string;
  /** Value for the option (defaults to label if not provided) */
  value?: string;
}

/** Normalized picker option (value is always defined) */
interface NormalizedPickerOption {
  label: string;
  value: string;
}

// Variants for the picker host container
const segmentedPickerVariants = cva('', {
  variants: {
    align: {
      start: 'self-start',
      center: 'self-center',
      end: 'self-end',
      stretch: 'self-stretch',
    },
  },
  defaultVariants: {
    align: 'stretch',
  },
});

export type SegmentedPickerProps = VariantProps<typeof segmentedPickerVariants> & {
  /** Array of options - can be strings or PickerOption objects */
  options: (string | PickerOption)[];
  /** Currently selected value */
  value: string;
  /** Callback when selection changes */
  onValueChange: (value: string) => void;
  /** Additional className for the host container */
  className?: string;
  /** Custom tint color (uses primary color by default, Android only) */
  tintColor?: string;
};

// MARK: - Helper Functions

/**
 * Normalizes options to ensure value is always defined
 */
function normalizeOptions(options: (string | PickerOption)[]): NormalizedPickerOption[] {
  return options.map(opt =>
    typeof opt === 'string'
      ? { label: opt, value: opt }
      : { label: opt.label, value: opt.value ?? opt.label }
  );
}

// MARK: - iOS Implementation (SwiftUI)

/**
 * iOS Segmented Picker using SwiftUI
 */
function IOSSegmentedPicker({
  options,
  value,
  onValueChange,
  className,
  align,
}: SegmentedPickerProps) {
  const hostStyles = useResolveStyles(cn(segmentedPickerVariants({ align }), className));
  const normalizedOptions = normalizeOptions(options);

  return (
    <SwiftUIHost style={hostStyles} matchContents>
      <SwiftUIPicker
        modifiers={[pickerStyle('segmented')]}
        selection={value}
        onSelectionChange={(selection) => onValueChange(selection as string)}
      >
        {normalizedOptions.map((option) => (
          <SwiftUIText key={option.value} modifiers={[tag(option.value)]}>
            {option.label}
          </SwiftUIText>
        ))}
      </SwiftUIPicker>
    </SwiftUIHost>
  );
}

// MARK: - Android Implementation (Jetpack Compose)

/**
 * Android Segmented Picker using Jetpack Compose
 */
function AndroidSegmentedPicker({
  options,
  value,
  onValueChange,
  className,
  align,
  tintColor,
}: SegmentedPickerProps) {
  const hostStyles = useResolveStyles(cn(segmentedPickerVariants({ align }), className));
  const primaryColor = useTailwindToHex('primary', 0.2);
  const normalizedOptions = normalizeOptions(options);

  // Find current selected index
  const selectedIndex = normalizedOptions.findIndex(opt => opt.value === value);

  // Get option labels for Android (it only accepts string[])
  const optionLabels = normalizedOptions.map(opt => opt.label);

  return (
    <JetpackHost style={hostStyles} matchContents={{ vertical: true }}>
      <JetpackPicker
        options={optionLabels}
        selectedIndex={selectedIndex >= 0 ? selectedIndex : 0}
        onOptionSelected={({ nativeEvent: { index } }) => {
          const selectedOption = normalizedOptions[index];
          if (selectedOption) {
            onValueChange(selectedOption.value);
          }
        }}
        variant="segmented"
        color={tintColor ?? primaryColor}
      />
    </JetpackHost>
  );
}

// MARK: - Main Component

/**
 * A native segmented picker component for iOS and Android.
 *
 * - iOS: Uses native SwiftUI segmented Picker
 * - Android: Uses native Jetpack Compose segmented Picker
 *
 * @example
 * // Simple usage with string options
 * <SegmentedPicker
 *   options={['Small', 'Medium', 'Large']}
 *   value={size}
 *   onValueChange={setSize}
 * />
 *
 * @example
 * // With custom values
 * <SegmentedPicker
 *   options={[
 *     { label: '$', value: 'cheap' },
 *     { label: '$$', value: 'moderate' },
 *     { label: '$$$', value: 'expensive' },
 *   ]}
 *   value={priceRange}
 *   onValueChange={setPriceRange}
 * />
 */
function SegmentedPicker(props: SegmentedPickerProps) {
  if (Platform.OS === 'ios') {
    return <IOSSegmentedPicker {...props} />;
  }

  return <AndroidSegmentedPicker {...props} />;
}

export { SegmentedPicker, segmentedPickerVariants };
