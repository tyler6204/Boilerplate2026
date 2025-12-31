import { ThemedScrollView } from '@/components/scroll-view';
import { View } from '@/components/view';
import { Text } from "@/components/native/text";
import { Collapsible } from '@/components/collapsible';
import { FAQS } from "@shared/constants/boilerplate";

export default function FAQTab() {
  return (
    <ThemedScrollView showsVerticalScrollIndicator={false} contentContainerStyle="p-4 gap-8">
      <View className="gap-4">
        {FAQS.map((faq, index) => (
          <Collapsible key={index} title={faq.title} defaultOpen={index === 0}>
            <Text className="font-callout text-foreground-secondary">
              {faq.description}
            </Text>
          </Collapsible>
        ))}
      </View>
    </ThemedScrollView>
  );
}
