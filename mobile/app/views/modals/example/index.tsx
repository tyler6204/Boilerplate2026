import { ThemedView } from '@/components/view';
import { EmptyState } from '@/components/empty-state';

export default function ExampleModalView() {
  return (
    <ThemedView className="justify-center border-2 border-red-500 items-center flex-col" ignoreSafeArea>
      <EmptyState
        title="Modal Example"
        description="This is an example empty state in a modal"
        icon="doc.text"
      />
    </ThemedView>
  );
}
