"use client";

import * as React from "react";
import Link from "next/link";
import { IconTerminal2, IconAlertCircle, IconPlus } from "@tabler/icons-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function logButtonPress(name: string) {
  console.log(`Button "${name}" was pressed`);
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-body font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  );
}

export default function UIPage() {
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [progress, setProgress] = React.useState(45);
  const [togglePressed, setTogglePressed] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState<string | undefined>(
    undefined
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center px-4">
          <Link href="/" className="font-semibold">
            ← Back to Home
          </Link>
          <h1 className="ml-auto font-body font-semibold">UI Components</h1>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Buttons */}
          <Section title="Buttons">
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => logButtonPress("Default")}>Default</Button>
              <Button variant="secondary" onClick={() => logButtonPress("Secondary")}>Secondary</Button>
              <Button variant="destructive" onClick={() => logButtonPress("Destructive")}>Destructive</Button>
              <Button variant="outline" onClick={() => logButtonPress("Outline")}>Outline</Button>
              <Button variant="ghost" onClick={() => logButtonPress("Ghost")}>Ghost</Button>
              <Button variant="link" onClick={() => logButtonPress("Link")}>Link</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={() => logButtonPress("Small")}>Small</Button>
              <Button size="default" onClick={() => logButtonPress("Default Size")}>Default</Button>
              <Button size="lg" onClick={() => logButtonPress("Large")}>Large</Button>
              <Button size="icon" onClick={() => logButtonPress("Icon")}>
                <IconPlus className="size-4" />
              </Button>
            </div>
            <Button disabled onClick={() => logButtonPress("Disabled")}>Disabled</Button>
            <div className="flex flex-wrap gap-2 items-center">
              <Button variant="plain" size="sm" onClick={() => logButtonPress("Plain Small")}>Plain Small</Button>
              <Button variant="plain" size="default" onClick={() => logButtonPress("Plain Default")}>Plain Default</Button>
              <Button variant="plain" size="lg" onClick={() => logButtonPress("Plain Large")}>Plain Large</Button>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Button variant="plain" className="text-primary" onClick={() => logButtonPress("Custom Primary")}>Custom Primary</Button>
              <Button variant="plain" className="text-destructive font-bold" onClick={() => logButtonPress("Custom Destructive")}>Custom Destructive</Button>
              <Button variant="plain" className="text-blue-500 font-body" onClick={() => logButtonPress("Custom Blue")}>Custom Blue</Button>
            </div>
          </Section>

          <Separator />

          {/* Badges */}
          <Section title="Badges">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
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
                <p className="text-foreground">
                  This is the card content area.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>
          </Section>

          <Separator />

          {/* Inputs */}
          <Section title="Input & Textarea">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="disabled">Disabled Input</Label>
                <Input id="disabled" placeholder="Disabled" disabled />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message" />
              </div>
            </div>
          </Section>

          <Separator />

          {/* Switch & Checkbox */}
          <Section title="Switch & Checkbox">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Switch
                  id="notifications"
                  checked={switchChecked}
                  onCheckedChange={setSwitchChecked}
                />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="terms"
                  checked={checkboxChecked}
                  onCheckedChange={(checked) =>
                    setCheckboxChecked(checked === true)
                  }
                />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
            </div>
          </Section>

          <Separator />

          {/* Toggle */}
          <Section title="Toggle">
            <div className="flex gap-2">
              <Toggle pressed={togglePressed} onPressedChange={setTogglePressed}>
                {togglePressed ? "Pressed" : "Not Pressed"}
              </Toggle>
              <Toggle variant="outline" pressed={false}>
                Outline
              </Toggle>
            </div>
          </Section>

          <Separator />

          {/* Select */}
          <Section title="Select">
            <Select value={selectValue} onValueChange={setSelectValue}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Section>

          <Separator />

          {/* Progress & Spinner */}
          <Section title="Progress & Spinner">
            <Progress value={progress} />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setProgress(Math.max(0, progress - 10))}
              >
                -10
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setProgress(Math.min(100, progress + 10))}
              >
                +10
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Spinner />
              <Spinner className="size-6" />
              <Spinner className="size-8 text-primary" />
              <Spinner className="size-10 text-destructive" />
            </div>
          </Section>

          <Separator />

          {/* Avatar */}
          <Section title="Avatar">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="size-12">
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <Avatar className="size-16">
                <AvatarFallback className="font-body">XY</AvatarFallback>
              </Avatar>
            </div>
          </Section>

          <Separator />

          {/* Accordion */}
          <Section title="Accordion">
            <Accordion type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes. It comes with default styles that match your design
                  system.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes. It&apos;s animated by default with smooth transitions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>

          <Separator />

          {/* Alert */}
          <Section title="Alert">
            <Alert>
              <IconTerminal2 className="size-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <IconAlertCircle className="size-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Something went wrong. Please try again.
              </AlertDescription>
            </Alert>
          </Section>

          <Separator />

          {/* Dialog */}
          <Section title="Dialog">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>Save changes</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Section>

          <Separator />

          {/* Alert Dialog */}
          <Section title="Alert Dialog">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Section>

          <Separator />

          {/* Skeleton */}
          <Section title="Skeleton">
            <div className="flex items-center gap-4">
              <Skeleton className="size-12 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
}
