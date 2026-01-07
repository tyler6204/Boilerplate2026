import { View } from './view';
import { Text } from './native/text';
import { IconSymbol } from './native/icon';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: string;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  icon = 'face.smiling',
  className,
}: EmptyStateProps) {
  return (
    <View className={cn('items-center justify-center w-full py-6', className)}>
      <View className="rounded-full bg-background-secondary mb-3 p-3">
        <IconSymbol name={icon} className="size-8 font-semibold text-foreground-secondary" />
      </View>
      <Text className="font-title3 font-semibold text-center">{title}</Text>
      {description ? (
        <Text className="font-callout mt-0.5 text-foreground-secondary text-center">
          {description}
        </Text>
      ) : null}
      {action ? <View className="mt-3">{action}</View> : null}
    </View>
  );
}

export default EmptyState;
