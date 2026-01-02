import { ThemedScrollView } from '@/components/scroll-view';
import {
  Button,
  Host,
  ContextMenu,
  RNHostView,
  Text,
  Section as SwiftUISection,
  Divider,
} from '@expo/ui/swift-ui';
import {
  buttonStyle,
  tint,
} from '@expo/ui/swift-ui/modifiers';
import * as React from 'react';
import { StyleSheet, View, Text as RNText } from 'react-native';
export default function ContextMenuScreen() {

  return (
    <ThemedScrollView>
      <View>
        <View>
          <Host matchContents modifiers={[tint('red')]}>
          <ContextMenu modifiers={[buttonStyle('glass')]}>
            <ContextMenu.Items>
              <Button role="destructive" label="Delete" />
              <Divider />
              <Button onPress={() => console.log('Pressed3')} label="Add to favorites" />
              <SwiftUISection title="Primary actions">
                <Button onPress={() => console.log('Pressed1')} label="First" />
                <Button onPress={() => console.log('Pressed2')} label="Second" />
              </SwiftUISection>
            </ContextMenu.Items>
            <ContextMenu.Trigger>
                <Text>Show menu</Text>
              </ContextMenu.Trigger>
            </ContextMenu>
          </Host>
        </View>
      </View>
    </ThemedScrollView>
  );
}

ContextMenuScreen.navigationOptions = {
  title: 'Context Menu',
};

const styles = StyleSheet.create({
  menuIcon: {
    width: 32,
    height: 32,
  },
  longPressMenu: {
    width: 200,
    height: 200,
  },
  preview: {
    width: 300,
    height: 200,
    padding: 20,
    backgroundColor: '#ffeeee',
  },
});
