import { ThemedScrollView } from '@/components/scroll-view';
import { View } from '@/components/view';
import { Text } from '@/components/native/text';

export default function NativeView() {
  return (
    <ThemedScrollView showsVerticalScrollIndicator={false} contentContainerStyle="p-4 gap-8">
      <View className="gap-4">
        <Text className="font-title2 font-bold text-foreground">Native View</Text>
        <Text className="font-body text-foreground-secondary">
          Native components are only available on iOS and Android platforms.
        </Text>
      </View>
    </ThemedScrollView>
  );
}
