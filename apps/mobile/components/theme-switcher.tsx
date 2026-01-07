import { View } from "react-native";
import { Text } from "@/components/native/text";
import { IconSymbol } from "@/components/native/icon";
import Button from "@/components/native/button";
import { useTheme } from "@/components/theme-provider";
import { type ThemeNameWithSystem } from "@repo/theme";

type ThemeOption = {
  value: ThemeNameWithSystem;
  label: string;
  icon: string;
};

const THEME_OPTIONS: ThemeOption[] = [
  { value: "system", label: "System", icon: "gearshape" },
  { value: "light", label: "Light", icon: "sun.max" },
  { value: "dark", label: "Dark", icon: "moon" },
  { value: "christmas", label: "Christmas", icon: "gift" },
];

/**
 * Theme switcher component for mobile apps.
 * Displays buttons to switch between available themes.
 *
 * @example
 * <ThemeSwitcher />
 */
export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <View className="gap-2">
      <Text className="font-headline font-semibold mb-2">Theme</Text>
      <View className="flex-row flex-wrap gap-2">
        {THEME_OPTIONS.map((option) => {
          const isActive = theme === option.value;
          return (
            <Button key={option.value} onPress={() => setTheme(option.value)}>
              <View
                className={`flex-row items-center gap-2 px-4 py-2 rounded-lg border ${
                  isActive
                    ? "bg-brand border-brand"
                    : "bg-background-secondary border-border"
                }`}
              >
                <IconSymbol
                  name={option.icon}
                  size={18}
                  color={isActive ? "#fff" : undefined}
                />
                <Text
                  className={`font-callout ${
                    isActive ? "text-white font-semibold" : "text-foreground"
                  }`}
                >
                  {option.label}
                </Text>
              </View>
            </Button>
          );
        })}
      </View>
      <Text className="text-foreground-secondary font-caption mt-1">
        Current: {resolvedTheme}
      </Text>
    </View>
  );
}
