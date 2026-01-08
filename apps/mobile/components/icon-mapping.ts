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
    material?: keyof typeof MaterialIcons.glyphMap;
  }
>;

/**
 * Icon mapping configuration.
 *
 * Add your SF Symbols to icon mappings here.
 * - see Tabler Icons at https://tabler.io/icons
 * - see Material Icons at https://icons.expo.fyi/
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
export const ICON_MAPPING: IconMapping = {
  house: {
    tabler: TablerIcons.IconHome,
    material: "home",
  },
  "house.fill": {
    tabler: TablerIcons.IconHomeFilled,
    material: "home",
  },
  "questionmark.circle": {
    tabler: TablerIcons.IconHelpCircle,
    material: "help-outline",
  },
  "questionmark.circle.fill": {
    tabler: TablerIcons.IconHelpCircleFilled,
    material: "help",
  },
  atom: {
    tabler: TablerIcons.IconAtom,
    material: "science",
  },
  iphone: {
    tabler: TablerIcons.IconDeviceMobile,
    material: "smartphone",
  },
  "server.rack": {
    tabler: TablerIcons.IconServer,
    material: "dns",
  },
  "checkmark.circle.fill": {
    tabler: TablerIcons.IconCircleCheckFilled,
    material: "check-circle",
  },
  terminal: {
    tabler: TablerIcons.IconTerminal2,
    material: "terminal",
  },
  "chevron.right": {
    tabler: TablerIcons.IconChevronRight,
    material: "chevron-right",
  },
  "chevron.down": {
    tabler: TablerIcons.IconChevronDown,
    material: "keyboard-arrow-down",
  },
  plus: {
    tabler: TablerIcons.IconPlus,
    material: "add",
  },
  minus: {
    tabler: TablerIcons.IconMinus,
    material: "remove",
  },
  "face.smiling": {
    tabler: TablerIcons.IconMoodEmpty,
    material: "sentiment-neutral",
  },
  magnifyingglass: {
    tabler: TablerIcons.IconSearch,
    material: "search",
  },
  ellipsis: {
    tabler: TablerIcons.IconDots,
    material: "more-horiz",
  },
  checkmark: {
    tabler: TablerIcons.IconCheck,
    material: "check",
  },
  "chevron.up": {
    tabler: TablerIcons.IconChevronUp,
    material: "keyboard-arrow-up",
  },
  xmark: {
    tabler: TablerIcons.IconX,
    material: "close",
  },
  "info.circle": {
    tabler: TablerIcons.IconInfoCircle,
    material: "info-outline",
  },
  "exclamationmark.triangle": {
    tabler: TablerIcons.IconAlertTriangle,
    material: "warning",
  },
  "exclamationmark.circle": {
    tabler: TablerIcons.IconAlertCircle,
    material: "error-outline",
  },
};

export type IconSymbolName = keyof typeof ICON_MAPPING;
