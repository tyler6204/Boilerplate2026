import { ThemedScrollView } from '@/components/scroll-view';
import { View } from '@/components/view';
import { Text } from "@/components/ui/text";
import { EmptyState } from '@/components/ui/empty';
import { FAQS } from "@repo/constants";
import { useNavigation } from "@react-navigation/native"
import { useLayoutEffect, useState, useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
          <Accordion
            type="single"
            collapsible
            defaultValue={query.length === 0 ? "0" : undefined}
          >
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={String(index)}>
                <AccordionTrigger className='text-red-500'>
                  <Text className="font-medium text-left flex-1">
                    {faq.title}
                  </Text>
                </AccordionTrigger>
                <AccordionContent>
                  <Text>
                    {faq.description}
                  </Text>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
