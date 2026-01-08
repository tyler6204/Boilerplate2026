import { IconSymbol } from '@/components/icon';
import { Text, TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import type { IconSymbolName } from '@/components/icon-mapping';
import { useContext } from 'react';
import type React from 'react';
import { View, type ViewProps } from 'react-native';

function Alert({
  className,
  variant,
  children,
  icon,
  iconClassName,
  ...props
}: ViewProps &
  React.RefAttributes<View> & {
    icon: IconSymbolName | string;
    variant?: 'default' | 'destructive';
    iconClassName?: string;
  }) {
  return (
    <TextClassContext.Provider
      value={cn(
        'font-body text-foreground',
        variant === 'destructive' && 'text-destructive',
        className
      )}>
      <View
        role="alert"
        className={cn(
          'bg-card border-border relative w-full rounded-lg border px-4 py-3 flex-row gap-3 items-start',
          className
        )}
        {...props}>
        <View className="mt-0.5">
          <IconSymbol
            name={icon}
            className={cn('size-4', variant === 'destructive' && 'text-destructive', iconClassName)}
          />
        </View>
        <View className="flex-1 gap-0.5">
          {children}
        </View>
      </View>
    </TextClassContext.Provider>
  );
}

function AlertTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  return (
    <Text
      className={cn('line-clamp-1 min-h-4 font-subheadline font-semibold tracking-tight', className)}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  const textClass = useContext(TextClassContext);
  return (
    <Text
      className={cn(
        'text-muted-foreground font-footnote leading-relaxed',
        textClass?.includes('text-destructive') && 'text-destructive/90',
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };
