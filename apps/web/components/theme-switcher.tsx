"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, startTransition } from "react";
import { IconSun, IconMoon, IconDeviceDesktop } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: IconSun, emoji: "☀️" },
  { value: "dark", label: "Dark", icon: IconMoon, emoji: "🌙" },
  { value: "system", label: "System", icon: IconDeviceDesktop, emoji: "💻" },
] as const;

/**
 * Compact theme dropdown for headers/navbars.
 * Shows an icon button that opens a dropdown menu.
 */
export function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-9">
        <IconSun className="size-4" />
      </Button>
    );
  }

  const currentTheme = THEME_OPTIONS.find((t) => t.value === theme) ?? THEME_OPTIONS[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-9">
          <CurrentIcon className="size-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEME_OPTIONS.map((t) => {
          const Icon = t.icon;
          return (
            <DropdownMenuItem
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={theme === t.value ? "bg-accent" : ""}
            >
              <Icon className="size-4" />
              {t.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Full theme switcher component with buttons.
 * Displays all theme options as buttons.
 */
export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">Theme</span>
      <div className="flex flex-wrap gap-2">
        {THEME_OPTIONS.map((option) => {
          const isActive = theme === option.value;
          return (
            <button
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                isActive
                  ? "bg-brand border-brand text-white"
                  : "bg-background-secondary border-border text-foreground hover:bg-background-secondary/80"
              )}
            >
              <span>{option.emoji}</span>
              <span className={cn("text-sm", isActive && "font-semibold")}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
      <span className="text-xs text-foreground-secondary">
        Current: {resolvedTheme}
      </span>
    </div>
  );
}
