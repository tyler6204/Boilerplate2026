import { useResolveClassNames, } from 'uniwind';
import { type ViewStyle, StyleProp } from 'react-native';
import { cn } from '@/lib/utils';

/**
 * Hook that converts a className string to resolved React Native styles.
 *
 * @param className - The Tailwind className string(s) to resolve. Can be a string, array of strings, or undefined.
 * @returns A React Native style object that can be used with the `style` prop.
 *
 * @example
 * const styles = useResolveStyles('bg-primary p-4 rounded-lg');
 * <View style={styles}>Content</View>
 *
 * @example
 * const styles = useResolveStyles(['bg-background', 'p-2', className]);
 * <View style={styles}>Content</View>
 */
export function useResolveStyles(
  className?: string | string[] | null
): StyleProp<ViewStyle> | undefined {
  const resolvedClassName = cn(className);
  const resolvedStyles = useResolveClassNames(resolvedClassName);

  return resolvedStyles as StyleProp<ViewStyle> | undefined;
}
