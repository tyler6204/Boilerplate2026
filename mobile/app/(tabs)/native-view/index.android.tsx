import { useState } from 'react';
import { Button, Switch } from '@expo/ui/jetpack-compose';
import { ThemedScrollView } from '@/components/scroll-view';
import { View } from '@/components/view';
import { Text } from '@/components/native/text';

export default function NativeViewAndroid() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  return (
    <ThemedScrollView showsVerticalScrollIndicator={false} contentContainerStyle="p-4 gap-8">
      <View className="gap-6">
        <View className="gap-4">
          <Text className="font-title2 font-bold text-foreground">Button</Text>
          <View className="gap-4">
            <Button
              onPress={() => console.log('Button pressed')}
            >
              Default Button
            </Button>
            <Button
              variant="outlined"
              onPress={() => console.log('Outlined button pressed')}
            >
              Outlined Button
            </Button>
            <Button
              variant="elevated"
              onPress={() => console.log('Elevated button pressed')}
            >
              Elevated Button
            </Button>
          </View>
        </View>

        <View className="gap-4">
          <Text className="font-title2 font-bold text-foreground">Toggle</Text>
          <View className="gap-4">
            <Switch
              label="Toggle Switch"
              value={isSwitchOn}
              onValueChange={setIsSwitchOn}
            />
            <Text className="font-body text-foreground-secondary">
              Switch is {isSwitchOn ? 'ON' : 'OFF'}
            </Text>
          </View>
        </View>
      </View>
    </ThemedScrollView>
  );
}
