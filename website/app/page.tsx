import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BOILERPLATE_DESCRIPTION, TECH_STACK_ITEMS, SECTION_TITLES } from "@shared/constants/boilerplate";
import {
  IconBrandReact,
  IconDeviceMobile,
  IconServer,
  IconTerminal2,
} from "@tabler/icons-react";
import { Counter } from "@/app/components/counter";

// Example: Accessing environment variables
// Client-side env vars must be prefixed with NEXT_PUBLIC_
const appName = process.env.NEXT_PUBLIC_APP_NAME || "ENV NOT SET";
const version = process.env.NEXT_PUBLIC_VERSION || "ENV NOT SET";

export default function Home() {
  const iconMap = {
    [TECH_STACK_ITEMS[0].name]: <IconBrandReact className="h-10 w-10 text-brand" />,
    [TECH_STACK_ITEMS[1].name]: <IconDeviceMobile className="h-10 w-10 text-brand" />,
    [TECH_STACK_ITEMS[2].name]: <IconServer className="h-10 w-10 text-brand" />,
  };

  const technologies = TECH_STACK_ITEMS.map((tech) => ({
    ...tech,
    icon: iconMap[tech.name],
  }));

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-8 text-center sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-brand/10 via-background to-background" />

        <div className="flex flex-col items-center gap-6 max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-in-up">
            <Badge variant="outline">
              {version}
            </Badge>
            <Badge variant="outline">
              Open Source
            </Badge>
          </div>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Build Faster with <br className="hidden sm:block" />
            {appName}
          </h1>

          <p className="max-w-2xl text-xl leading-relaxed text-foreground-secondary sm:text-2xl">
            {BOILERPLATE_DESCRIPTION}. The ultimate foundation for your next big idea.
          </p>

          <Counter />

        </div>
      </section>

      <main className="flex w-full flex-col gap-24 pb-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Tech Stack Section */}
        <section className="flex flex-col gap-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {SECTION_TITLES.TECH_STACK}
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              {SECTION_TITLES.TECH_STACK_DESCRIPTION}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {technologies.map((tech) => (
              <Card key={tech.name} className="bg-background-secondary/50 border-border/50">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10">
                    {tech.icon}
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{tech.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">{tech.badge}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-foreground-secondary">
                    {tech.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Developer Tools / Env Var Section */}
        <section className="rounded-2xl border border-border bg-background-secondary/30 p-8 overflow-hidden relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-brand">
                <IconTerminal2 size={24} />
                <h3 className="text-xl font-bold text-foreground">{SECTION_TITLES.DEVELOPER_EXPERIENCE}</h3>
              </div>
              <p className="text-foreground-secondary max-w-xl">
                {SECTION_TITLES.DEVELOPER_EXPERIENCE_DESCRIPTION}
              </p>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                  <span>Environment Variable Example:</span>
                  <code className="px-1.5 py-0.5 rounded bg-background text-foreground font-mono text-xs border border-border">
                    NEXT_PUBLIC_APP_NAME
                  </code>
                </div>
                <div className="inline-flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 font-mono text-sm shadow-sm">
                  <span className="text-foreground-secondary select-none">$</span>
                  <span className="text-brand font-semibold">{appName}</span>
                </div>
                <p className="text-xs text-foreground-secondary/70 mt-2">
                  Variables prefixed with <code className="text-foreground">NEXT_PUBLIC_</code> are available in the browser.
                </p>
              </div>
            </div>

            <div className="flex-1 lg:max-w-md">
              <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                <h4 className="font-semibold text-foreground mb-4">Project Structure</h4>
                <div className="space-y-3 font-mono text-xs text-foreground-secondary">
                  <div className="flex items-center gap-2">
                    <span className="text-brand">📂</span>
                    <span>boilerplate-2026</span>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    <span className="text-brand">📂</span>
                    <span>mobile/</span>
                  </div>
                  <div className="flex items-center gap-2 pl-8">
                    <span className="text-brand">📂</span>
                    <span>components/ui/</span>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    <span className="text-brand">📂</span>
                    <span>shared/</span>
                  </div>
                  <div className="flex items-center gap-2 pl-8">
                    <span className="text-brand">📂</span>
                    <span>constants/</span>
                  </div>
                  <div className="flex items-center gap-2 pl-8">
                    <span className="text-brand">📂</span>
                    <span>types/</span>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    <span className="text-brand">📂</span>
                    <span>website/</span>
                  </div>
                  <div className="flex items-center gap-2 pl-8">
                    <span className="text-brand">📂</span>
                    <span>components/ui/</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand">📄</span>
                    <span>.env.example</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand">📄</span>
                    <span>terminal-cmd-lines.md</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}