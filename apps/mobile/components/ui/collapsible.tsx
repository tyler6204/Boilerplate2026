import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as CollapsiblePrimitive from '@rn-primitives/collapsible';
import { Platform, View } from 'react-native';

const Collapsible = CollapsiblePrimitive.Root;

function CollapsibleTrigger({
  className,
  children,
  ...props
}: CollapsiblePrimitive.TriggerProps & {
  children?: React.ReactNode;
} & React.RefAttributes<CollapsiblePrimitive.TriggerRef>) {
  return (
    <TextClassContext.Provider
      value={cn(
        'text-left font-body font-medium',
        Platform.select({ web: 'group-hover:underline' })
      )}>
      <CollapsiblePrimitive.Trigger className={className} {...props}>
        {children}
      </CollapsiblePrimitive.Trigger>
    </TextClassContext.Provider>
  );
}

function CollapsibleContent({
  className,
  children,
  ...props
}: CollapsiblePrimitive.ContentProps & React.RefAttributes<CollapsiblePrimitive.ContentRef>) {
  return (
    <TextClassContext.Provider value="font-body">
      <CollapsiblePrimitive.Content
        className={cn(
          'overflow-hidden',
          Platform.select({
            web: 'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
          })
        )}
        {...props}>
        <View className={cn(className)}>
          {children}
        </View>
      </CollapsiblePrimitive.Content>
    </TextClassContext.Provider>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
