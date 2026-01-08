import * as React from 'react';
import { Platform, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useResolveStyles } from '@/hooks/useResolveStyles';
import { useUniwind } from 'uniwind'
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
// MARK: - iOS Imports (SwiftUI)
import {
  DatePicker as SwiftUIDatePicker,
  Host as SwiftUIHost,
} from '@expo/ui/swift-ui';
import { datePickerStyle } from '@expo/ui/swift-ui/modifiers';

// MARK: - Android Imports
import RNDatePicker from 'react-native-date-picker';
import { useTailwindToHex } from '@/hooks/useTailwindToHex';

// MARK: - Types

/** Display style for the date picker */
export type DatePickerDisplayStyle = 'compact' | 'inline';

/** What components to show in the picker */
export type DatePickerMode = 'date' | 'time' | 'datetime';

// Variants for the date picker host container
const datePickerVariants = cva('', {
  variants: {
    align: {
      start: 'self-start',
      center: 'self-center',
      end: 'self-end',
      stretch: 'self-stretch',
    },
  },
  defaultVariants: {
    align: 'start',
  },
});

export type DatePickerProps = VariantProps<typeof datePickerVariants> & {
  /** Currently selected date */
  value: Date;
  /** Callback when date changes */
  onValueChange: (date: Date) => void;
  /** What to show: date, time, or both (datetime only on iOS) */
  mode?: DatePickerMode;
  /** Display style (iOS only - Android uses native style) */
  displayStyle?: DatePickerDisplayStyle;
  /** Optional title/label */
  title?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Additional className for the host container */
  className?: string;
  /** Custom tint color (Android only) */
  tintColor?: string;
};

// MARK: - iOS Implementation (SwiftUI)

/**
 * Maps mode to iOS displayed components
 */
function getIOSDisplayedComponents(mode: DatePickerMode): ('date' | 'hourAndMinute')[] {
  switch (mode) {
    case 'date':
      return ['date'];
    case 'time':
      return ['hourAndMinute'];
    case 'datetime':
      return ['date', 'hourAndMinute'];
    default:
      return ['date'];
  }
}

/**
 * iOS DatePicker using SwiftUI (compact) or RNDatePicker (inline)
 */
function IOSDatePicker({
  value,
  onValueChange,
  mode = 'date',
  displayStyle = 'compact',
  title,
  minDate,
  maxDate,
  className,
  align,
}: DatePickerProps) {
  const hostStyles = useResolveStyles(cn(datePickerVariants({ align }), className));
  const dividerColor = useTailwindToHex('border');
  const { theme } = useUniwind();

  // Use RNDatePicker for inline style (better wheel picker experience)
  if (displayStyle === 'inline') {
    return (
      <View style={hostStyles}>
        <RNDatePicker
          date={value}
          onDateChange={onValueChange}
          mode={mode}
          minimumDate={minDate}
          maximumDate={maxDate}
          theme={theme === 'dark' ? 'dark' : 'light'}
          dividerColor={dividerColor}
        />
      </View>
    );
  }

  // Use SwiftUI for compact style
  const displayedComponents = getIOSDisplayedComponents(mode);
  const range = (minDate || maxDate) ? {
    start: minDate,
    end: maxDate,
  } : undefined;

  return (
    <SwiftUIHost style={hostStyles} matchContents>
      <SwiftUIDatePicker
        modifiers={[datePickerStyle('compact')]}
        title={title}
        selection={value}
        range={range}
        displayedComponents={displayedComponents}
        onDateChange={onValueChange}
      />
    </SwiftUIHost>
  );
}

// MARK: - Android Implementation (react-native-date-picker)

/**
 * Checks if a date is today
 */
function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

/**
 * Formats a date for display in compact mode
 */
function formatDisplayValue(date: Date, mode: DatePickerMode): string {
  const dateStr = isToday(date)
    ? 'Today'
    : date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

  switch (mode) {
    case 'time':
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    case 'datetime':
      return dateStr + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    case 'date':
    default:
      return dateStr;
  }
}

/**
 * Android DatePicker using react-native-date-picker
 * - compact: Shows formatted text, opens modal on press
 * - inline: Shows wheel picker inline
 */
function AndroidDatePicker({
  value,
  onValueChange,
  mode = 'date',
  displayStyle = 'compact',
  title,
  minDate,
  maxDate,
  className,
  align,
}: DatePickerProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const hostStyles = useResolveStyles(cn(
    datePickerVariants({ align }),
    className
  ));
  const dividerColor = useTailwindToHex('border');
  const { theme } = useUniwind();

  // Compact mode: show button that opens modal
  if (displayStyle === 'compact') {
    return (
      <View style={hostStyles}>
        <Button variant="secondary" className='px-3' onPress={() => setModalOpen(true)}>
          <Text>{formatDisplayValue(value, mode)}</Text>
        </Button>
        <RNDatePicker
          modal
          open={modalOpen}
          date={value}
          onConfirm={(date) => {
            setModalOpen(false);
            onValueChange(date);
          }}
          onCancel={() => setModalOpen(false)}
          mode={mode}
          minimumDate={minDate}
          maximumDate={maxDate}
          theme={theme === 'dark' ? 'dark' : 'light'}
          title={title}
        />
      </View>
    );
  }

  // Inline mode: show wheel picker directly
  return (
    <View style={hostStyles}>
      <RNDatePicker
        date={value}
        onDateChange={onValueChange}
        mode={mode}
        minimumDate={minDate}
        maximumDate={maxDate}
        theme={theme === 'dark' ? 'dark' : 'light'}
        dividerColor={dividerColor}
      />
    </View>
  );
}

// MARK: - Main Component

/**
 * A native date picker component for iOS and Android.
 *
 * - iOS: Uses native SwiftUI DatePicker with compact/graphical styles
 * - Android: Uses react-native-date-picker with native wheel picker
 *
 * @example
 * // Date picker
 * <DatePicker
 *   value={date}
 *   onValueChange={setDate}
 *   mode="date"
 * />
 *
 * @example
 * // Time picker
 * <DatePicker
 *   value={date}
 *   onValueChange={setDate}
 *   mode="time"
 * />
 *
 * @example
 * // Date and time picker (iOS only, Android shows date)
 * <DatePicker
 *   value={date}
 *   onValueChange={setDate}
 *   mode="datetime"
 *   displayStyle="inline"
 * />
 *
 * @example
 * // With date range
 * <DatePicker
 *   value={date}
 *   onValueChange={setDate}
 *   minDate={new Date()}
 *   maxDate={new Date(2025, 11, 31)}
 * />
 */
function DatePicker(props: DatePickerProps) {
  if (Platform.OS === 'ios') {
    return <IOSDatePicker {...props} />;
  }

  return <AndroidDatePicker {...props} />;
}

export { DatePicker, datePickerVariants };
