import * as React from 'react';
import { Platform } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useResolveStyles } from '@/hooks/useResolveStyles';
import { type IconSymbolName } from '@/components/icon-mapping';

// MARK: - iOS Imports (SwiftUI)
import {
  ContextMenu as SwiftUIContextMenu,
  Host as SwiftUIHost,
  Button as SwiftUIButton,
} from '@expo/ui/swift-ui';

// MARK: - Android Imports (Jetpack Compose)
import {
  ContextMenu as JetpackContextMenu,
  Submenu as JetpackSubmenu,
  Host as JetpackHost,
  Button as JetpackButton,
} from '@expo/ui/jetpack-compose';
import { useTailwindToHex } from '@/hooks/useTailwindToHex';

// MARK: - Types

// Extract prop types for type safety
type JetpackButtonProps = React.ComponentProps<typeof JetpackButton>;
type SwiftUIButtonProps = React.ComponentProps<typeof SwiftUIButton>;
type SFSymbolName = SwiftUIButtonProps['systemImage'];

/** Context menu item configuration */
export interface ContextMenuItem {
  /** Display label for the menu item */
  label: string;
  /** Icon name (SF Symbol) - only supported on iOS, ignored on Android */
  icon?: IconSymbolName;
  /** Callback when item is pressed (ignored if submenu is provided) */
  onPress?: () => void;
  /** Whether this is a destructive action (renders in red) */
  destructive?: boolean;
  /** Nested submenu items - when provided, this item becomes a submenu trigger */
  submenu?: ContextMenuItem[];
}

/** Group of context menu items with optional title */
export interface ContextMenuGroup {
  /** Optional group title */
  title?: string;
  /** Items in this group */
  items: ContextMenuItem[];
}

// Variants for the context menu host container
const contextMenuVariants = cva('', {
  variants: {
    align: {
      start: 'self-start',
      center: 'self-center',
      end: 'self-end',
      stretch: 'self-stretch',
    },
  },
  defaultVariants: {
    align: 'start',
  },
});

export type ContextMenuProps = VariantProps<typeof contextMenuVariants> & {
  /** Menu items - can be flat array or grouped */
  items: ContextMenuItem[] | ContextMenuGroup[];
  /** The trigger element that opens the context menu */
  children: React.ReactNode;
  /** Additional className for the host container */
  className?: string;
  /** How the menu is activated - defaults to 'longPress' (iOS only) */
  activationMethod?: 'longPress' | 'singlePress';
};

// MARK: - Helper Functions

/**
 * Checks if items are grouped or flat
 */
function isGroupedItems(items: ContextMenuItem[] | ContextMenuGroup[]): items is ContextMenuGroup[] {
  return items.length > 0 && 'items' in items[0];
}

/**
 * Flattens grouped items into a flat array
 */
function flattenItems(items: ContextMenuItem[] | ContextMenuGroup[]): ContextMenuItem[] {
  if (isGroupedItems(items)) {
    return items.flatMap(group => group.items);
  }
  return items;
}

// MARK: - iOS Implementation (SwiftUI)

/**
 * Renders iOS menu items recursively (handles submenus)
 */
function renderIOSMenuItems(items: ContextMenuItem[]): React.ReactNode {
  return items.map((item, index) => (
    <IOSContextMenuItemButton key={index} item={item} />
  ));
}

/**
 * Renders a single iOS menu item button or submenu
 */
function IOSContextMenuItemButton({ item }: { item: ContextMenuItem }) {
  // If item has a submenu, render as nested ContextMenu
  if (item.submenu && item.submenu.length > 0) {
    return (
      <SwiftUIContextMenu>
        <SwiftUIContextMenu.Items>
          {renderIOSMenuItems(item.submenu)}
        </SwiftUIContextMenu.Items>
        <SwiftUIContextMenu.Trigger>
          {item.icon ? (
            <SwiftUIButton
              systemImage={item.icon as SFSymbolName}
              label={item.label}
              role={item.destructive ? 'destructive' : undefined}
            />
          ) : (
            <SwiftUIButton
              label={item.label}
              role={item.destructive ? 'destructive' : undefined}
            >
              <></>
            </SwiftUIButton>
          )}
        </SwiftUIContextMenu.Trigger>
      </SwiftUIContextMenu>
    );
  }

  // Regular button item
  if (item.icon) {
    return (
      <SwiftUIButton
        systemImage={item.icon as SFSymbolName}
        label={item.label}
        role={item.destructive ? 'destructive' : undefined}
        onPress={item.onPress}
      />
    );
  }

  return (
    <SwiftUIButton
      label={item.label}
      role={item.destructive ? 'destructive' : undefined}
      onPress={item.onPress}
    >
      <></>
    </SwiftUIButton>
  );
}

/**
 * iOS Context Menu using SwiftUI
 */
function IOSContextMenu({ items, children, className, align, activationMethod = 'longPress' }: ContextMenuProps) {
  const hostStyles = useResolveStyles(cn(contextMenuVariants({ align }), className));
  const flatItems = flattenItems(items);

  return (
    <SwiftUIHost style={hostStyles}>
      <SwiftUIContextMenu activationMethod={activationMethod}>
        <SwiftUIContextMenu.Items>
          {renderIOSMenuItems(flatItems)}
        </SwiftUIContextMenu.Items>
        <SwiftUIContextMenu.Trigger>
          {children}
        </SwiftUIContextMenu.Trigger>
      </SwiftUIContextMenu>
    </SwiftUIHost>
  );
}

// MARK: - Android Implementation (Jetpack Compose)

// Type for valid Android menu children (matches SubmenuElement from @expo/ui)
type AndroidMenuElement = React.ReactElement<JetpackButtonProps> | React.ReactElement<React.ComponentProps<typeof JetpackSubmenu>>;

// Theme colors for Android menu items
interface AndroidMenuColors {
  background: string | undefined;
  destructive: string | undefined;
  foreground: string | undefined;
}

/**
 * Renders Android menu items recursively - supports nested submenus
 * Note: Icons are not supported on Android due to @expo/ui limitations
 */
function renderAndroidMenuItems(items: ContextMenuItem[], colors: AndroidMenuColors): AndroidMenuElement[] {
  return items.map((item, index) => {
    // If item has a submenu, render as Submenu (recursive for nested submenus)
    if (item.submenu && item.submenu.length > 0) {
      return (
        <JetpackSubmenu
          key={index}
          button={
            item.destructive ? (
              <JetpackButton
                elementColors={{ containerColor: colors.background, contentColor: colors.destructive }}
              >
                {item.label}
              </JetpackButton>
            ) : (
              <JetpackButton
                elementColors={{ containerColor: colors.background, contentColor: colors.foreground }}
              >
                {item.label}
              </JetpackButton>
            )
          }
        >
          {renderAndroidMenuItems(item.submenu, colors)}
        </JetpackSubmenu>
      );
    }

    // Regular button item
    if (item.destructive) {
      return (
        <JetpackButton
          key={index}
          elementColors={{ containerColor: colors.background, contentColor: colors.destructive }}
          onPress={item.onPress}
        >
          {item.label}
        </JetpackButton>
      );
    }

    return (
      <JetpackButton
        key={index}
        onPress={item.onPress}
        elementColors={{ containerColor: colors.background, contentColor: colors.foreground }}
      >
        {item.label}
      </JetpackButton>
    );
  });
}

/**
 * Android Context Menu using Jetpack Compose
 */
function AndroidContextMenu({ items, children, className, align }: ContextMenuProps) {
  const hostStyles = useResolveStyles(cn(contextMenuVariants({ align }), className));
  const backgroundColor = useTailwindToHex('background');
  const destructiveColor = useTailwindToHex('destructive');
  const foregroundColor = useTailwindToHex('foreground');
  const flatItems = flattenItems(items);

  const menuColors: AndroidMenuColors = {
    background: backgroundColor,
    destructive: destructiveColor,
    foreground: foregroundColor,
  };

  return (
    <JetpackContextMenu style={hostStyles} color={backgroundColor}>
      <JetpackContextMenu.Items>
        {renderAndroidMenuItems(flatItems, menuColors)}
      </JetpackContextMenu.Items>
      <JetpackContextMenu.Trigger>
        <JetpackHost>
          {children}
        </JetpackHost>
      </JetpackContextMenu.Trigger>
    </JetpackContextMenu>
  );
}

// MARK: - Main Component

/**
 * A native context menu component for iOS and Android.
 *
 * - iOS: Uses native SwiftUI ContextMenu with SF Symbols
 * - Android: Uses native Jetpack Compose ContextMenu (icons not supported)
 *
 * @example
 * // Simple usage (icons only show on iOS)
 * <ContextMenu
 *   items={[
 *     { label: 'Search', icon: 'magnifyingglass', onPress: handleSearch },
 *     { label: 'Delete', icon: 'trash', destructive: true, onPress: handleDelete },
 *   ]}
 * >
 *   <Button><Text>Long press me</Text></Button>
 * </ContextMenu>
 *
 * @example
 * // With submenus
 * <ContextMenu
 *   items={[
 *     { label: 'Home', icon: 'house', onPress: handleHome },
 *     {
 *       label: 'More',
 *       icon: 'ellipsis',
 *       submenu: [
 *         { label: 'Settings', icon: 'gearshape', onPress: handleSettings },
 *         { label: 'Help', icon: 'questionmark.circle', onPress: handleHelp },
 *       ],
 *     },
 *   ]}
 * >
 *   <Card>...</Card>
 * </ContextMenu>
 */
function ContextMenu(props: ContextMenuProps) {
  if (Platform.OS === 'ios') {
    return <IOSContextMenu {...props} />;
  }

  return <AndroidContextMenu {...props} />;
}

export { ContextMenu, contextMenuVariants };
