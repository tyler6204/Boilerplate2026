import { ScrollView, type ScrollViewProps } from 'react-native';
import { cn } from '@/lib/utils';
import { useResolveClassNames } from 'uniwind';

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
  const resolvedClassNames = useResolveClassNames(cn("bg-background", className ?? ''));
  return (
    <ScrollView
      style={resolvedClassNames}
      contentContainerClassName={contentContainerClassName}
      {...otherProps}
    >
      {children}
    </ScrollView>
  );
}
