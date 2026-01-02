import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { View } from "@/components/view";
import { Text } from "@/components/native/text";
import { Skeleton } from "@/components/skeleton";
import { GlassView } from "@/components/glass-view";
import { IconSymbol } from "@/components/native/icon";
import Button from "@/components/native/button";

export default function CounterView() {
  let count = useQuery(api.counter.get);
  const increment = useMutation(api.counter.increment);
  const decrement = useMutation(api.counter.decrement);

  return (
    <GlassView className="p-6 rounded-xl gap-4 items-center mt-2">
      <Text className="font-caption text-foreground-secondary">Convex Counter Example</Text>
      {count === undefined ? (
        <Skeleton className="h-10 w-12" />
      ) : (
        <Text className="font-large-title font-extrabold text-foreground">
          {count}
        </Text>
      )}
      <View className="flex-row items-center gap-3">
        <Button
          onPress={count === undefined ? () => { } : () => decrement()}
          disabled={count === undefined}
        >
          <GlassView className={`size-8 rounded-md items-center justify-center`}>
            <IconSymbol name="minus" className="size-5 text-foreground" />
          </GlassView>
        </Button>
        <Button
          onPress={count === undefined ? () => { } : () => increment()}
          disabled={count === undefined}
        >
          <GlassView tintColor="brand" className={`size-8 rounded-md items-center justify-center`}>
            <IconSymbol name="plus" className="size-5 text-background" />
          </GlassView>
        </Button>
      </View>
    </GlassView>
  );
}
