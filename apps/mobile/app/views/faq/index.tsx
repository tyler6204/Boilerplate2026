import { ThemedScrollView } from '@/components/scroll-view';
import { View } from '@/components/view';
import { Text } from "@/components/native/text";
import { Collapsible } from '@/components/collapsible';
import { EmptyState } from '@/components/empty-state';
import { FAQS } from "@repo/constants";
import { useNavigation } from "@react-navigation/native"
import { useLayoutEffect, useState, useRef } from 'react';

import type { SearchBarProps } from 'react-native-screens';
export default function FAQTab() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const searchBarQueryRef = useRef<string>('');

  // For searching inside faq titles and descriptions, case insensitive
  const filteredFaqs = FAQS.filter(
    faq =>
      faq.title.toLowerCase().includes(query.toLowerCase()) ||
      faq.description.toLowerCase().includes(query.toLowerCase())
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        hideWhenScrolling: false,
        onChangeText: (event: any) => {
          const text = event?.nativeEvent?.text ?? "";
          searchBarQueryRef.current = text;
          setQuery(text);
        },
      } as SearchBarProps,
    });
  }, [navigation]);

  return (
    <ThemedScrollView showsVerticalScrollIndicator={false} contentContainerClassName="p-4 gap-8">
      <View className="gap-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <Collapsible key={index} title={faq.title} defaultOpen={index === 0 && query.length === 0}>
              <Text className="font-callout ">
                {faq.description}
              </Text>
            </Collapsible>
          ))
        ) : (
          <EmptyState
            title="No results found"
            description="Try adjusting your search terms"
            icon="magnifyingglass"
          />
        )}
      </View>
    </ThemedScrollView>
  );
}
