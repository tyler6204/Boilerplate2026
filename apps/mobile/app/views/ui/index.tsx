import * as React from 'react';
import { ThemedScrollView } from '@/components/scroll-view';
import { View } from '@/components/view';
import { Text } from '@/components/ui/text';
import { IconSymbol } from '@/components/icon';
import { Uniwind } from 'uniwind'
// UI Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Toggle } from '@/components/ui/toggle';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ContextMenu } from '@/components/ui/context-menu';
import { SegmentedPicker } from '@/components/ui/segmented-picker';
import { cn } from '@/lib/utils';

function logButtonPress(name: string) {
  console.log(`Button "${name}" was pressed`);
}

function Section({ title, variant = 'default', children }: { title: string; variant?: 'default' | 'secondary'; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className={cn('font-title font-semibold text-foreground', variant === 'secondary' && 'font-body')}>{title}</Text>
      {children}
    </View>
  );
}

export default function UIView() {
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [progress, setProgress] = React.useState(45);
  const [accordionValue, setAccordionValue] = React.useState<string[]>([]);
  const [togglePressed, setTogglePressed] = React.useState(false);
  const [collapsibleOpen, setCollapsibleOpen] = React.useState(false);
  const [pickerValue, setPickerValue] = React.useState('medium');
  const [priceRange, setPriceRange] = React.useState('$$');

  return (
    <ThemedScrollView showsVerticalScrollIndicator={false} contentContainerClassName="p-4 gap-8 pb-12">
      {/* Context Menu */}
      <Section title="Native Components">
        <Section title="Context Menu" variant="secondary">
          <View className="flex-row gap-4">
            <ContextMenu
              activationMethod='singlePress'
              items={[
                { label: 'Search', icon: 'magnifyingglass', onPress: () => console.log('Search pressed') },
                { label: 'Add', icon: 'plus', onPress: () => console.log('Add pressed') },
                { label: 'Edit', icon: 'pencil', onPress: () => console.log('Edit pressed') },
                { label: 'Delete', icon: 'trash', destructive: true, onPress: () => console.log('Delete pressed') },
              ]}
            >
              <Button variant="ghost" haptic='light'>
                <Text>Basic (Press)</Text>
              </Button>
            </ContextMenu>
            <ContextMenu
              items={[
                { label: 'Home', icon: 'house', onPress: () => console.log('Home pressed') },
                {
                  label: 'Share',
                  icon: 'square.and.arrow.up',
                  submenu: [
                    { label: 'Copy Link', icon: 'link', onPress: () => console.log('Copy Link') },
                    { label: 'Messages', icon: 'message', onPress: () => console.log('Messages') },
                    { label: 'Mail', icon: 'envelope', onPress: () => console.log('Mail') },
                  ],
                },
                {
                  label: 'Move to',
                  icon: 'folder',
                  submenu: [
                    { label: 'Documents', icon: 'doc', onPress: () => console.log('Documents') },
                    { label: 'Downloads', icon: 'arrow.down.circle', onPress: () => console.log('Downloads') },
                    { label: 'Archive', icon: 'archivebox', onPress: () => console.log('Archive') },
                  ],
                },
                { label: 'Delete', icon: 'trash', destructive: true, onPress: () => console.log('Delete pressed') },
              ]}
            >
              <Button variant="ghost">
                <Text>With Submenus (Long Press iOS)</Text>
              </Button>
            </ContextMenu>
          </View>
        </Section>
        <Section title="Segmented Picker" variant="secondary">
          <View className="gap-4">
            <View className="gap-2">
              <Text className="text-muted-foreground text-sm">Size: {pickerValue}</Text>
              <SegmentedPicker
                options={['small', 'medium', 'large']}
                value={pickerValue}
                onValueChange={setPickerValue}
              />
            </View>
            <View className="gap-2 w-full">
              <Text className="text-muted-foreground text-sm">Price: {priceRange}</Text>
              <SegmentedPicker
                options={[
                  { label: '$', value: '$' },
                  { label: '$$', value: '$$' },
                  { label: '$$$', value: '$$$' },
                  { label: '$$$$', value: '$$$$' },
                ]}
                value={priceRange}
                onValueChange={setPriceRange}
              />
            </View>
          </View>
        </Section>
      </Section>

      <Separator />

      <Section title="Theme">
        <View className="flex-row flex-wrap gap-2">
          <Button variant='outline' onPress={() => {
            Uniwind.setTheme('system');
          }}>
            <Text>System</Text>
          </Button>
          <Button variant="secondary" onPress={() => {
            Uniwind.setTheme('light');
          }}>
            <Text>Light</Text>
          </Button>
          <Button onPress={() => {
            Uniwind.setTheme('dark');
          }}>
            <Text>Dark</Text>
          </Button>
        </View>
        <Button disabled>
          <Text>Disabled</Text>
        </Button>
      </Section>


      {/* Buttons */}
      <Section title="Buttons">
        <View className="flex-row flex-wrap gap-2">
          <Button onPress={() => logButtonPress("Default")}>
            <Text>Default</Text>
          </Button>
          <Button variant="secondary" onPress={() => logButtonPress("Secondary")}>
            <Text>Secondary</Text>
          </Button>
          <Button variant="destructive" onPress={() => logButtonPress("Destructive")}>
            <Text>Destructive</Text>
          </Button>
          <Button variant="outline" onPress={() => logButtonPress("Outline")}>
            <Text>Outline</Text>
          </Button>
          <Button variant="ghost" onPress={() => logButtonPress("Ghost")}>
            <Text>Ghost</Text>
          </Button>
          <Button variant="link" onPress={() => logButtonPress("Link")}>
            <Text>Link</Text>
          </Button>
        </View>
        <View className="flex-row flex-wrap gap-2">
          <Button size="sm" haptic='light' onPress={() => logButtonPress("Small")}>
            <Text>Small</Text>
          </Button>
          <Button size="default" haptic='light' onPress={() => logButtonPress("Default Size")}>
            <Text>Default</Text>
          </Button>
          <Button size="lg" haptic='light' onPress={() => logButtonPress("Large")}>
            <Text>Large</Text>
          </Button>
          <Button size="icon" haptic='light' onPress={() => logButtonPress("Icon")}>
            <IconSymbol name="plus" className="size-4 text-primary-foreground" />
          </Button>
        </View>
        <Button disabled onPress={() => logButtonPress("Disabled")}>
          <Text>Disabled</Text>
        </Button>
        <View className="flex-row flex-wrap gap-2 items-center">
          <Button variant="plain" size="sm" onPress={() => logButtonPress("Plain Small")}>
            <Text>Plain Small</Text>
          </Button>
          <Button variant="plain" size="default" onPress={() => logButtonPress("Plain Default")}>
            <Text>Plain Default</Text>
          </Button>
          <Button variant="plain" size="lg" onPress={() => logButtonPress("Plain Large")}>
            <Text>Plain Large</Text>
          </Button>
        </View>
        <View className="flex-row flex-wrap gap-2 items-center">
          <Button variant="plain" className="text-primary" onPress={() => logButtonPress("Custom Primary")}>
            <Text>Custom Primary</Text>
          </Button>
          <Button variant="plain" className="text-destructive" onPress={() => logButtonPress("Custom Destructive")}>
            <Text className="font-bold">Custom Destructive</Text>
          </Button>
          <Button variant="plain" className="text-blue-500" onPress={() => logButtonPress("Custom Blue")}>
            <Text className="italic underline">Custom Blue</Text>
          </Button>
        </View>
      </Section>

      <Separator />

      {/* Badges */}
      <Section title="Badges">
        <View className="flex-row flex-wrap gap-2">
          <Badge>
            <Text>Default</Text>
          </Badge>
          <Badge variant="secondary">
            <Text>Secondary</Text>
          </Badge>
          <Badge variant="destructive">
            <Text>Destructive</Text>
          </Badge>
          <Badge variant="outline">
            <Text>Outline</Text>
          </Badge>
        </View>
      </Section>

      <Separator />

      {/* Card */}
      <Section title="Card">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <Text className="text-foreground">This is the card content area.</Text>
          </CardContent>
          <CardFooter>
            <Button size="sm">
              <Text>Action</Text>
            </Button>
          </CardFooter>
        </Card>
      </Section>

      <Separator />

      {/* Inputs */}
      <Section title="Input & Textarea">
        <View className="gap-4">
          <View className="gap-2">
            <Text>Email</Text>
            <Input placeholder="Enter your email" />
          </View>
          <View className="gap-2">
            <Text>Disabled Input</Text>
            <Input placeholder="Disabled" editable={false} />
          </View>
          <View className="gap-2">
            <Text>Message</Text>
            <Textarea placeholder="Enter your message" />
          </View>
        </View>
      </Section>

      <Separator />

      {/* Switch & Checkbox */}
      <Section title="Switch & Checkbox">
        <View className="gap-4">
          <View className="flex-row items-center gap-3">
            <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} className="bg-primary text-red-500" />
            <Text>Enable notifications</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Checkbox checked={checkboxChecked} onCheckedChange={setCheckboxChecked} />
            <Text>Accept terms and conditions</Text>
          </View>
        </View>
      </Section>

      <Separator />

      {/* Toggle */}
      <Section title="Toggle">
        <View className="flex-row gap-2">
          <Toggle pressed={togglePressed} onPressedChange={setTogglePressed}>
            <Text>{togglePressed ? 'Pressed' : 'Not Pressed'}</Text>
          </Toggle>
          <Toggle variant="outline" pressed={false} onPressedChange={() => { }}>
            <Text>Outline</Text>
          </Toggle>
        </View>
      </Section>

      <Separator />


      {/* Progress & Spinner */}
      <Section title="Progress & Spinner">
        <Progress value={progress} />
        <View className="flex-row gap-2">
          <Button size="sm" variant="outline" onPress={() => setProgress(Math.max(0, progress - 10))}>
            <Text>-10</Text>
          </Button>
          <Button size="sm" variant="outline" onPress={() => setProgress(Math.min(100, progress + 10))}>
            <Text>+10</Text>
          </Button>
        </View>
        <View className="flex-row items-center gap-4">
          <Spinner />
          <Spinner className="size-6" />
          <Spinner className="size-8 text-primary" />
          <Spinner className="size-10 text-destructive" />
        </View>
      </Section>

      <Separator />

      {/* Avatar */}
      <Section title="Avatar">
        <View className="flex-row items-center gap-3">
          <Avatar alt="User avatar">
            <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
            <AvatarFallback>
              <Text className="font-caption">CN</Text>
            </AvatarFallback>
          </Avatar>
          <Avatar alt="User AB" className="size-12">
            <AvatarFallback>
              <Text>AB</Text>
            </AvatarFallback>
          </Avatar>
          <Avatar alt="User XY" className="size-16">
            <AvatarFallback>
              <Text className="font-body">XY</Text>
            </AvatarFallback>
          </Avatar>
        </View>
      </Section>

      <Separator />

      {/* Accordion */}
      <Section title="Accordion">
        <Accordion type="multiple" value={accordionValue} onValueChange={setAccordionValue}>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <Text>Is it accessible?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text className="text-muted-foreground">
                Yes. It adheres to the WAI-ARIA design pattern.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <Text>Is it styled?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text className="text-muted-foreground">
                Yes. It comes with default styles that match your design system.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <Text>Is it animated?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text className="text-muted-foreground">
                Yes. It&apos;s animated by default with smooth transitions.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Separator />

      {/* Alert */}
      <Section title="Alert">
        <Alert icon="terminal">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
        <Alert icon="exclamationmark.circle" variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Something went wrong. Please try again.
          </AlertDescription>
        </Alert>
      </Section>

      <Separator />


      {/* Collapsible */}
      <Section title="Collapsible">
        <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="plain" size="lg" className="justify-between">
              <Text>{collapsibleOpen ? 'Close' : 'Open'} Collapsible</Text>
              <IconSymbol name={collapsibleOpen ? 'chevron.up' : 'chevron.down'} className="w-4 h-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <Text className="text-foreground">
              This is collapsible content. It can be expanded and collapsed.
            </Text>
          </CollapsibleContent>
        </Collapsible>
      </Section>

      <Separator />

      {/* Skeleton */}
      <Section title="Skeleton">
        <View className="flex-row items-center gap-4">
          <Skeleton className="size-12 rounded-full" />
          <View className="gap-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </View>
        </View>
      </Section>
    </ThemedScrollView>
  );
}
