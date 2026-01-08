import * as TablerIcons from "@tabler/icons-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

export type TablerIconComponent = ComponentType<
  SvgProps & { size?: string | number; strokeWidth?: string | number }
>;

export type IconMapping = Record<
  string,
  {
    tabler?: TablerIconComponent;
    /** Material icon for @expo/vector-icons (e.g., "home", "search") */
    material?: keyof typeof MaterialIcons.glyphMap;
    /** Native Material icon for @expo/ui Jetpack Compose (e.g., "filled.Home", "filled.Search") */
    nativeMaterial?: string;
  }
>;

/**
 * Icon mapping configuration.
 *
 * Add your SF Symbols to icon mappings here.
 * - see Tabler Icons at https://tabler.io/icons
 * - see Material Icons at https://icons.expo.fyi/
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 * - Native Material Icons for @expo/ui use format: "filled.IconName", "outlined.IconName", etc.
 */
/**
 * Available native Material icons for @expo/ui Jetpack Compose:
 * AccountBox, AccountCircle, Add, AddCircle, ArrowBack, ArrowDropDown, ArrowForward,
 * Build, Call, Check, CheckCircle, Clear, Close, Contrast, Create,
 * DarkMode, DateRange, Delete, Done, Edit, Email, ExitToApp,
 * Face, Favorite, FavoriteBorder, Home, Info,
 * KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp,
 * LightMode, List, LocationOn, Lock, MailOutline, Menu, MoreVert,
 * Notifications, Person, Phone, Place, PlayArrow, Refresh,
 * Search, Send, Settings, Share, ShoppingCart, Star, ThumbUp, Warning
 *
 * Variants: filled, outlined, rounded, twotone, sharp
 */
export const ICON_MAPPING: IconMapping = {
  // Navigation & Home
  house: {
    tabler: TablerIcons.IconHome,
    material: "home",
    nativeMaterial: "filled.Home",
  },
  "house.fill": {
    tabler: TablerIcons.IconHomeFilled,
    material: "home",
    nativeMaterial: "filled.Home",
  },

  // Help & Info
  "questionmark.circle": {
    tabler: TablerIcons.IconHelpCircle,
    material: "help-outline",
    nativeMaterial: "outlined.Info",
  },
  "questionmark.circle.fill": {
    tabler: TablerIcons.IconHelpCircleFilled,
    material: "help",
    nativeMaterial: "filled.Info",
  },
  "info.circle": {
    tabler: TablerIcons.IconInfoCircle,
    material: "info-outline",
    nativeMaterial: "outlined.Info",
  },

  // Settings & System
  atom: {
    tabler: TablerIcons.IconAtom,
    material: "science",
    nativeMaterial: "filled.Build",
  },
  iphone: {
    tabler: TablerIcons.IconDeviceMobile,
    material: "smartphone",
    nativeMaterial: "filled.Phone",
  },
  "server.rack": {
    tabler: TablerIcons.IconServer,
    material: "dns",
    nativeMaterial: "filled.Build",
  },
  terminal: {
    tabler: TablerIcons.IconTerminal2,
    material: "terminal",
    nativeMaterial: "filled.Build",
  },
  "gearshape": {
    tabler: TablerIcons.IconSettings,
    material: "settings",
    nativeMaterial: "filled.Settings",
  },
  "gearshape.fill": {
    tabler: TablerIcons.IconSettingsFilled,
    material: "settings",
    nativeMaterial: "filled.Settings",
  },

  // Checkmarks & Selection
  "checkmark.circle.fill": {
    tabler: TablerIcons.IconCircleCheckFilled,
    material: "check-circle",
    nativeMaterial: "filled.CheckCircle",
  },
  checkmark: {
    tabler: TablerIcons.IconCheck,
    material: "check",
    nativeMaterial: "filled.Check",
  },

  // Chevrons & Arrows
  "chevron.right": {
    tabler: TablerIcons.IconChevronRight,
    material: "chevron-right",
    nativeMaterial: "filled.KeyboardArrowRight",
  },
  "chevron.down": {
    tabler: TablerIcons.IconChevronDown,
    material: "keyboard-arrow-down",
    nativeMaterial: "filled.KeyboardArrowDown",
  },
  "chevron.up": {
    tabler: TablerIcons.IconChevronUp,
    material: "keyboard-arrow-up",
    nativeMaterial: "filled.KeyboardArrowUp",
  },
  "chevron.left": {
    tabler: TablerIcons.IconChevronLeft,
    material: "chevron-left",
    nativeMaterial: "filled.KeyboardArrowLeft",
  },

  // Add & Remove
  plus: {
    tabler: TablerIcons.IconPlus,
    material: "add",
    nativeMaterial: "filled.Add",
  },
  minus: {
    tabler: TablerIcons.IconMinus,
    material: "remove",
    nativeMaterial: "filled.Clear",
  },

  // Faces & People
  "face.smiling": {
    tabler: TablerIcons.IconMoodEmpty,
    material: "sentiment-neutral",
    nativeMaterial: "filled.Face",
  },
  "person": {
    tabler: TablerIcons.IconUser,
    material: "person",
    nativeMaterial: "filled.Person",
  },
  "person.fill": {
    tabler: TablerIcons.IconUserFilled,
    material: "person",
    nativeMaterial: "filled.Person",
  },

  // Search & Discovery
  magnifyingglass: {
    tabler: TablerIcons.IconSearch,
    material: "search",
    nativeMaterial: "filled.Search",
  },

  // Actions & More
  ellipsis: {
    tabler: TablerIcons.IconDots,
    material: "more-horiz",
    nativeMaterial: "filled.MoreVert",
  },
  "ellipsis.circle": {
    tabler: TablerIcons.IconDotsCircleHorizontal,
    material: "more-horiz",
    nativeMaterial: "filled.MoreVert",
  },

  // Close & Delete
  xmark: {
    tabler: TablerIcons.IconX,
    material: "close",
    nativeMaterial: "filled.Close",
  },
  trash: {
    tabler: TablerIcons.IconTrash,
    material: "delete",
    nativeMaterial: "filled.Delete",
  },
  "trash.fill": {
    tabler: TablerIcons.IconTrashFilled,
    material: "delete",
    nativeMaterial: "filled.Delete",
  },

  // Alerts & Warnings
  "exclamationmark.triangle": {
    tabler: TablerIcons.IconAlertTriangle,
    material: "warning",
    nativeMaterial: "filled.Warning",
  },
  "exclamationmark.circle": {
    tabler: TablerIcons.IconAlertCircle,
    material: "error-outline",
    nativeMaterial: "filled.Warning",
  },

  // Loading & Sync
  "arrow.trianglehead.2.clockwise": {
    tabler: TablerIcons.IconLoader2,
    material: "sync",
    nativeMaterial: "filled.Refresh",
  },

  // Edit & Writing
  pencil: {
    tabler: TablerIcons.IconPencil,
    material: "edit",
    nativeMaterial: "filled.Edit",
  },
  "pencil.circle": {
    tabler: TablerIcons.IconPencil,
    material: "edit",
    nativeMaterial: "filled.Edit",
  },

  // Documents & Files
  "doc": {
    tabler: TablerIcons.IconFile,
    material: "description",
    nativeMaterial: "filled.List",
  },
  "doc.on.doc": {
    tabler: TablerIcons.IconCopy,
    material: "content-copy",
    nativeMaterial: "filled.List",
  },
  folder: {
    tabler: TablerIcons.IconFolder,
    material: "folder",
    nativeMaterial: "filled.List",
  },
  "folder.fill": {
    tabler: TablerIcons.IconFolderFilled,
    material: "folder",
    nativeMaterial: "filled.List",
  },

  // Share & Communication
  "square.and.arrow.up": {
    tabler: TablerIcons.IconShare,
    material: "share",
    nativeMaterial: "filled.Share",
  },
  "envelope": {
    tabler: TablerIcons.IconMail,
    material: "email",
    nativeMaterial: "filled.Email",
  },
  "message": {
    tabler: TablerIcons.IconMessage,
    material: "message",
    nativeMaterial: "filled.Send",
  },
  "link": {
    tabler: TablerIcons.IconLink,
    material: "link",
    nativeMaterial: "filled.Share",
  },

  // Media & Favorites
  star: {
    tabler: TablerIcons.IconStar,
    material: "star-outline",
    nativeMaterial: "outlined.Star",
  },
  "star.fill": {
    tabler: TablerIcons.IconStarFilled,
    material: "star",
    nativeMaterial: "filled.Star",
  },
  heart: {
    tabler: TablerIcons.IconHeart,
    material: "favorite-outline",
    nativeMaterial: "filled.FavoriteBorder",
  },
  "heart.fill": {
    tabler: TablerIcons.IconHeartFilled,
    material: "favorite",
    nativeMaterial: "filled.Favorite",
  },

  // Download & Archive
  "arrow.down.circle": {
    tabler: TablerIcons.IconDownload,
    material: "download",
    nativeMaterial: "filled.ArrowDropDown",
  },
  archivebox: {
    tabler: TablerIcons.IconArchive,
    material: "archive",
    nativeMaterial: "filled.List",
  },

  // Exit & Logout
  "rectangle.portrait.and.arrow.right": {
    tabler: TablerIcons.IconLogout,
    material: "logout",
    nativeMaterial: "filled.ExitToApp",
  },

  // Notifications
  bell: {
    tabler: TablerIcons.IconBell,
    material: "notifications-none",
    nativeMaterial: "outlined.Notifications",
  },
  "bell.fill": {
    tabler: TablerIcons.IconBellFilled,
    material: "notifications",
    nativeMaterial: "filled.Notifications",
  },
};

export type IconSymbolName = keyof typeof ICON_MAPPING;

/**
 * Gets icon mapping for a given icon name with console warning if not found.
 * Use this function throughout the app to ensure consistent warnings.
 *
 * @param iconName - The SF Symbol name to look up
 * @param caller - Optional caller name for better warning context (e.g., "ContextMenu", "IconSymbol")
 * @returns The icon mapping or undefined if not found
 */
export function getIconMapping(iconName: string | undefined, caller?: string): IconMapping[string] | undefined {
  if (!iconName) return undefined;

  const mapping = ICON_MAPPING[iconName];
  if (!mapping) {
    const callerPrefix = caller ? `[${caller}] ` : '';
    console.warn(
      `${callerPrefix}Icon "${iconName}" not found in ICON_MAPPING. ` +
      `Add it to apps/mobile/components/icon-mapping.ts`
    );
    return undefined;
  }

  return mapping;
}

/**
 * Gets the Tabler icon component for a given icon name.
 * Returns undefined if not found (with console warning).
 */
export function getTablerIcon(iconName: string | undefined, caller?: string) {
  const mapping = getIconMapping(iconName, caller);
  return mapping?.tabler;
}

/**
 * Gets the Material icon name for @expo/vector-icons.
 * Returns 'help-outline' as fallback if not found.
 */
export function getMaterialIconName(iconName: string | undefined, caller?: string): keyof typeof import('@expo/vector-icons').MaterialIcons.glyphMap {
  const mapping = getIconMapping(iconName, caller);
  return mapping?.material || 'help-outline';
}
