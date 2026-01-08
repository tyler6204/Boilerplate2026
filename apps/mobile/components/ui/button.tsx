import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Platform, Pressable } from 'react-native';

// NOTE: group-* is not supported yet by Uniwind

const buttonVariants = cva(
  cn(
    'group shrink-0 flex-row items-center justify-center gap-2 rounded-md shadow-none',
    Platform.select({
      web: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive whitespace-nowrap outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    })
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-primary active:bg-primary/90 shadow-sm shadow-black/5',
          Platform.select({ web: 'hover:bg-primary/90' })
        ),
        destructive: cn(
          'bg-destructive active:bg-destructive/90 shadow-sm shadow-black/5',
          Platform.select({
            web: 'hover:bg-destructive/90 focus-visible:ring-destructive/20',
          })
        ),
        outline: cn(
          'border-border bg-background active:bg-accent border shadow-xs',
          Platform.select({
            web: 'hover:bg-accent',
          })
        ),
        secondary: cn(
          'bg-secondary active:bg-secondary/80 shadow-sm shadow-black/5',
          Platform.select({ web: 'hover:bg-secondary/80' })
        ),
        ghost: cn(
          'active:bg-accent',
          Platform.select({ web: 'hover:bg-accent' })
        ),
        link: '',
        plain: '',
      },
      size: {
        default: cn('h-9 px-4 py-2', Platform.select({ web: 'has-[>svg]:px-3' })),
        sm: cn('h-8 gap-1.5 rounded-md px-3', Platform.select({ web: 'has-[>svg]:px-2.5' })),
        lg: cn('h-10 rounded-md px-6', Platform.select({ web: 'has-[>svg]:px-4' })),
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    compoundVariants: [
      {
        variant: 'plain',
        size: 'default',
        class: 'px-0 py-0 h-auto',
      },
      {
        variant: 'plain',
        size: 'sm',
        class: 'px-0 py-0 h-auto',
      },
      {
        variant: 'plain',
        size: 'lg',
        class: 'px-0 py-0 h-auto',
      },
      {
        variant: 'plain',
        size: 'icon',
        class: 'px-0 py-0 h-auto',
      },
      {
        variant: 'plain',
        size: 'icon-sm',
        class: 'px-0 py-0 h-auto',
      },
      {
        variant: 'plain',
        size: 'icon-lg',
        class: 'px-0 py-0 h-auto',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  cn(
    'text-foreground font-footnote font-medium',
    Platform.select({ web: 'pointer-events-none transition-colors' })
  ),
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-white',
        outline: cn(
          'group-active:text-accent-foreground',
          Platform.select({ web: 'group-hover:text-accent-foreground' })
        ),
        secondary: 'text-secondary-foreground',
        ghost: 'group-active:text-accent-foreground',
        link: cn(
          'text-primary group-active:underline',
          Platform.select({ web: 'underline-offset-4 hover:underline group-hover:underline' })
        ),
        plain: 'text-foreground',
      },
      size: {
        default: 'font-footnote',
        sm: 'font-caption',
        lg: 'font-callout',
        icon: 'font-footnote',
        'icon-sm': 'font-caption',
        'icon-lg': 'font-callout',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

function extractTextColorClasses(className?: string): string {
  if (!className) return '';
  // Extract text color classes (text-*)
  const textColorRegex = /\btext-[\w-]+(?:\/[\d]+)?\b/g;
  const matches = className.match(textColorRegex);
  return matches ? matches.join(' ') : '';
}

function removeTextColorClasses(className?: string): string | undefined {
  if (!className) return className;
  // Remove text color classes and clean up extra spaces
  const cleaned = className.replace(/\btext-[\w-]+(?:\/[\d]+)?\b/g, '').replace(/\s+/g, ' ').trim();
  return cleaned || undefined;
}

function Button({ className, variant, size, ...props }: ButtonProps) {
  // Extract text color classes from className to pass to Text context
  const textColorClasses = extractTextColorClasses(className);
  const textContextValue = cn(buttonTextVariants({ variant, size }), textColorClasses);

  // Remove text color classes from Pressable className since they should only apply to Text
  const pressableClassName = removeTextColorClasses(className);

  return (
    <TextClassContext.Provider value={textContextValue}>
      <Pressable
        className={cn(props.disabled && 'opacity-50', buttonVariants({ variant, size }), pressableClassName)}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
