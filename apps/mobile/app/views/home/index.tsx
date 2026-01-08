import { ThemedScrollView } from '@/components/scroll-view';
import { View } from '@/components/view';
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { IconSymbol } from '@/components/icon';
import { GlassView } from '@/components/glass-view';
import { BOILERPLATE_DESCRIPTION, TECH_STACK_ITEMS, SECTION_TITLES } from "@repo/constants";
// Client-side env vars must be prefixed with EXPO_PUBLIC_
const appName = process.env.EXPO_PUBLIC_APP_NAME || "ENV NOT SET";
const version = process.env.EXPO_PUBLIC_VERSION || "ENV NOT SET";

export default function HomeView() {
  const technologies = TECH_STACK_ITEMS;

  return (
    <ThemedScrollView showsVerticalScrollIndicator={false} contentContainerClassName="p-4 gap-8">
      {/* Hero Section */}
      <View className="items-center gap-4">
        {/* Version Badge */}
        <View className="flex-row gap-2">
          <Badge variant="outline">
            <Text>{version}</Text>
          </Badge>
          <Badge variant="outline">
            <Text>Open Source</Text>
          </Badge>
        </View>

        <Text className="font-large-title text-center text-foreground font-extrabold">
          Build Faster with
          {"\n"}
          {appName}
        </Text>
        <Text className="font-body text-center text-muted-foreground">
          {BOILERPLATE_DESCRIPTION}
        </Text>
      </View>

      {/* Tech Stack */}
      <View className="gap-4">
        <Text className="font-title2 font-bold text-foreground">{SECTION_TITLES.TECH_STACK}</Text>
        <View className="gap-4">
          {technologies.map((tech) => (
            <GlassView key={tech.name} interactive className="p-4 rounded-xl gap-3">
              <View className="flex-row items-center justify-between">
                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                  <IconSymbol name={tech.icon as any} className="w-6 h-6 text-primary" />
                </View>
                <Badge variant="outline">
                  <Text>{tech.badge}</Text>
                </Badge>
              </View>
              <View>
                <Text className="font-headline text-foreground">{tech.name}</Text>
                <Text className="font-subheadline text-muted-foreground mt-1">{tech.description}</Text>
              </View>
            </GlassView>
          ))}
        </View>
      </View>


      {/* Developer Experience */}
      <View className="gap-4">
        <Text className="font-title2 font-bold text-foreground">{SECTION_TITLES.DEVELOPER_EXPERIENCE}</Text>
        <GlassView interactive className="p-4 rounded-xl gap-4">
          <View className="flex-row items-center gap-2">
            <IconSymbol name="terminal" className="w-6 h-6 text-primary" />
            <Text className="font-headline text-foreground">Type-safe Config</Text>
          </View>
          <Text className="font-body text-muted-foreground">
            {SECTION_TITLES.DEVELOPER_EXPERIENCE_DESCRIPTION_MOBILE}
          </Text>
          <View className="bg-background p-3 rounded-lg border border-border">
            <Text className="font-mono font-caption text-muted-foreground">EXPO_PUBLIC_APP_NAME</Text>
            <Text className="font-mono font-footnote text-primary font-bold mt-1">{appName}</Text>
          </View>
        </GlassView>
      </View>

    </ThemedScrollView>
  );
}
