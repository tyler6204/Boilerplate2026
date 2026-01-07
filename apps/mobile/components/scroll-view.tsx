import { ScrollView, type ScrollViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export type ThemedScrollViewProps = ScrollViewProps & {
  className?: string;
  hasTransparentHeader?: boolean;
  contentContainerClassName?: string;
};

export function ThemedScrollView({
  children,
  className,
  hasTransparentHeader = false,
  contentContainerClassName,
  ...otherProps
}: ThemedScrollViewProps) {
  return (
    <ScrollView
      className={cn("bg-background", className)}
      contentContainerClassName={contentContainerClassName}
      {...otherProps}
    >
      {children}
    </ScrollView>
  );
}
