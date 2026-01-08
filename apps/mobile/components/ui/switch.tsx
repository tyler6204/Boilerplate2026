import { cn } from '@/lib/utils';
import * as SwitchPrimitives from '@rn-primitives/switch';
import { Platform, Switch as NativeSwitch } from 'react-native';
import { useTailwindToHex } from '@/hooks/useTailwindToHex';

type SwitchProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  /** Tailwind color class for track when ON (e.g., 'primary', 'green-500') */
  trackColorOn?: string;
  /** Tailwind color class for track when OFF (e.g., 'input', 'gray-300') */
  trackColorOff?: string;
  /** Tailwind color class for thumb (e.g., 'background', 'white') */
  thumbColor?: string;
};

function Switch({
  className,
  checked = false,
  onCheckedChange,
  disabled = false,
  trackColorOn = undefined,
  trackColorOff = undefined,
  thumbColor = undefined,
  ...props
}: SwitchProps) {
  // Resolve theme colors for native Switch
  const trackOnHex = useTailwindToHex(trackColorOn);
  const trackOffHex = useTailwindToHex(trackColorOff);
  const thumbHex = useTailwindToHex(thumbColor);

  // Use native Switch on native platforms, primitives on web
  if (Platform.OS !== 'web') {
    return (
      <NativeSwitch
        value={checked}
        onValueChange={onCheckedChange || (() => { })}
        disabled={disabled}
        trackColor={{
          false: trackOffHex || undefined,
          true: trackOnHex || undefined,
        }}
        thumbColor={thumbHex || undefined}
        ios_backgroundColor={trackOffHex || undefined}
        {...props}
      />
    );
  }

  // Web: use primitives version
  return (
    <SwitchPrimitives.Root
      className={cn(
        'flex h-[1.15rem] w-8 shrink-0 flex-row items-center rounded-full border border-transparent shadow-sm shadow-black/5',
        'focus-visible:border-ring focus-visible:ring-ring/50 peer inline-flex outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed',
        checked ? 'bg-primary' : 'bg-input dark:bg-input/80',
        disabled && 'opacity-50',
        className
      )}
      checked={checked}
      onCheckedChange={onCheckedChange || (() => { })}
      disabled={disabled}
      {...props}>
      <SwitchPrimitives.Thumb
        className={cn(
          'bg-background size-4 rounded-full transition-transform pointer-events-none block ring-0',
          checked
            ? 'dark:bg-primary-foreground translate-x-3.5'
            : 'dark:bg-foreground translate-x-0'
        )}
      />
    </SwitchPrimitives.Root>
  );
}

export { Switch };
export type { SwitchProps };
