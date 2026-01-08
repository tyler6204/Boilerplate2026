import { cn } from '@/lib/utils';
import * as SwitchPrimitives from '@rn-primitives/switch';
import { Platform, Switch as NativeSwitch } from 'react-native';
import { useTailwindToHex } from '@/hooks/useTailwindToHex';

type SwitchProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
};

function Switch({
  className,
  checked = false,
  onCheckedChange,
  disabled = false,
  ...props
}: SwitchProps) {
  // Resolve theme colors for native Switch
  const primaryColor = useTailwindToHex('primary');
  const inputColor = useTailwindToHex('input');
  const backgroundColor = useTailwindToHex('background');

  // Use native Switch on native platforms, primitives on web
  if (Platform.OS !== 'web') {
    return (
      <NativeSwitch
        value={checked}
        onValueChange={onCheckedChange || (() => { })}
        disabled={disabled}
        trackColor={{
          false: inputColor || '#e2e8f0',
          true: primaryColor || '#3b82f6',
        }}
        thumbColor={backgroundColor || '#ffffff'}
        ios_backgroundColor={inputColor || '#e2e8f0'}
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
