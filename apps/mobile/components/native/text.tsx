import { Text as ReactNativeText, TextProps as RNTextProps } from 'react-native';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type TextProps = RNTextProps & {
  children: ReactNode;
  className?: string;
};

/**
 * Text component with Tailwind CSS styling via Uniwind.
 *
 * Supports all theme colors and font sizes via className:
 * - Colors: text-foreground, text-brand, text-destructive, etc.
 * - Sizes: text-xs, text-sm, text-base, text-lg, text-xl, etc.
 * - SwiftUI-style sizes: font-body, font-headline, font-title, etc.
 * - Weights: font-normal, font-medium, font-semibold, font-bold, etc.
 *
 * @example
 * <Text className="text-foreground font-body">Body text</Text>
 * <Text className="text-brand font-headline font-semibold">Headline</Text>
 * <Text className="text-destructive text-sm">Error message</Text>
 */
export function Text({ children, className, ...props }: TextProps) {
  return (
    <ReactNativeText
      className={cn('text-foreground font-body', className)}
      {...props}
    >
      {children}
    </ReactNativeText>
  );
}
