<script lang="ts">
    import {
        Badge,
        Button,
        DatePicker,
        Form,
        Icon,
        Input,
        Slider,
    } from "@neobr/svelte";
    import { today, getLocalTimeZone } from "@internationalized/date";
    import { onMount } from "svelte";
    import {
        ArrowRight02Icon,
        CheckmarkCircle02Icon,
        CodeIcon,
        Copy01Icon,
        LayoutGridIcon,
        Package01Icon,
        Rocket02Icon,
        Shield01Icon,
        TerminalIcon,
        ZapIcon,
    } from "@hugeicons/core-free-icons";

    let copied = $state(false);
    const installCommand = "$ pnpm add @neobr/svelte @neobr/tailwind-preset";
    let sliderValue = $state(45);
    let username = $state("neobr");
    let dateValue = $state(today(getLocalTimeZone()));
    let version = $state("");

    const metrics = [
        { label: "Components", value: "43" },
        { label: "Runtime", value: "Svelte 5" },
        { label: "Styling", value: "Tailwind 4" },
    ];

    const features = [
        {
            title: "CSS-First Tokens",
            description: "Theme variables live in one Tailwind v4 stylesheet.",
            icon: CodeIcon,
        },
        {
            title: "Accessible Primitives",
            description: "Keyboard and screen-reader behavior comes from tested foundations.",
            icon: Shield01Icon,
        },
        {
            title: "Brutalist Utilities",
            description: "Borders, shadows, radius, and interaction states stay consistent.",
            icon: ZapIcon,
        },
    ];

    onMount(async () => {
        try {
            const res = await fetch("/api/version");
            const data = await res.json();
            version = data.version;
        } catch {
            version = "1.0.0";
        }
    });

    function copyInstall() {
        navigator.clipboard.writeText(installCommand.replace("$ ", ""));
        copied = true;
        setTimeout(() => (copied = false), 1500);
    }
</script>

<svelte:head>
    <title>NeoBr UI - Svelte 5 Brutalist Components</title>
    <meta
        name="description"
        content="A high-contrast, accessible neo-brutalist component library for Svelte 5 and Tailwind CSS v4."
    />
</svelte:head>

<div class="space-y-16 pb-12">
    <section
        class="relative grid min-h-[calc(100dvh-5rem)] items-center gap-10 overflow-hidden py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16"
    >
        <div class="absolute inset-0 -z-10 bg-grid opacity-35"></div>

        <div class="space-y-8">
            <div class="flex flex-wrap items-center gap-3">
                <Badge>v{version || "..."}</Badge>
                <Badge variant="outline">Svelte 5</Badge>
                <Badge variant="secondary">Tailwind CSS 4</Badge>
            </div>

            <div class="space-y-5">
                <h1 class="max-w-4xl text-5xl leading-none font-black text-balance md:text-7xl">
                    NeoBr UI
                </h1>
                <p class="text-muted-foreground max-w-2xl text-lg leading-relaxed font-bold md:text-xl">
                    High-contrast Svelte components with sharp borders, centered shadows, typed
                    APIs, and CSS-first design tokens.
                </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row">
                <Button href="/docs/installation" class="gap-2">
                    Get Started
                    <Icon icon={ArrowRight02Icon} class="h-5 w-5" />
                </Button>
                <Button variant="outline" href="/components" class="gap-2">
                    <Icon icon={LayoutGridIcon} class="h-5 w-5" />
                    Browse Components
                </Button>
            </div>

            <div
                class="border-foreground bg-muted flex max-w-2xl flex-col overflow-hidden border-2 shadow-[0_5px_0_0_var(--color-shadow-color)] sm:flex-row"
            >
                <div class="border-foreground flex min-w-0 flex-1 items-center gap-3 px-4 py-3 sm:border-r-2">
                    <Icon icon={TerminalIcon} class="h-5 w-5 shrink-0 text-primary" />
                    <code class="min-w-0 overflow-x-auto text-sm font-black whitespace-nowrap">
                        {installCommand}
                    </code>
                </div>
                <button
                    onclick={copyInstall}
                    class="hover:bg-accent flex min-h-11 cursor-pointer items-center justify-center gap-2 border-t-2 border-foreground px-4 py-3 text-sm font-black transition-all sm:border-t-0"
                    aria-label={copied ? "Copied install command" : "Copy install command"}
                >
                    <Icon
                        icon={copied ? CheckmarkCircle02Icon : Copy01Icon}
                        class="h-5 w-5 {copied ? 'text-success' : ''}"
                    />
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
        </div>

        <div class="relative mx-auto w-full max-w-lg">
            <div
                class="border-foreground bg-background relative overflow-hidden border-2 shadow-brutalist"
            >
                <div
                    class="border-foreground bg-primary flex items-center justify-between border-b-2 px-4 py-3 text-primary-foreground"
                >
                    <div class="flex items-center gap-2">
                        <Icon icon={Package01Icon} class="h-5 w-5" />
                        <span class="text-sm font-black">Component Lab</span>
                    </div>
                    <span class="text-xs font-black">LIVE</span>
                </div>

                <div class="space-y-6 p-5">
                    <div class="border-foreground bg-accent/10 space-y-4 border-2 p-4">
                        <div class="flex flex-wrap items-center gap-3">
                            <Button>Primary</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="secondary">Secondary</Button>
                        </div>
                        <div class="max-w-xs">
                            <Slider bind:value={sliderValue} max={100} step={1} />
                        </div>
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="border-foreground bg-secondary/20 border-2 p-4">
                            <p class="mb-3 text-xs font-black tracking-[0.16em] uppercase">Date</p>
                            <DatePicker bind:value={dateValue} />
                        </div>
                        <div class="border-foreground bg-success/10 border-2 p-4">
                            <p class="mb-3 text-xs font-black tracking-[0.16em] uppercase">Form</p>
                            <Form class="space-y-3">
                                <Input placeholder="Username" bind:value={username} />
                                <Button type="submit" class="w-full">Submit</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="border-foreground bg-secondary absolute -right-4 -bottom-4 hidden border-2 px-4 py-3 shadow-[0_5px_0_0_var(--color-shadow-color)] md:block"
            >
                <div class="flex items-center gap-2 text-sm font-black">
                    <Icon icon={Rocket02Icon} class="h-5 w-5" />
                    Ready to ship
                </div>
            </div>
        </div>
    </section>

    <section class="grid gap-4 md:grid-cols-3" aria-label="NeoBr UI highlights">
        {#each metrics as metric (metric.label)}
            <div class="border-foreground bg-card border-2 p-5 shadow-[0_5px_0_0_var(--color-shadow-color)]">
                <p class="text-muted-foreground text-xs font-black tracking-[0.16em] uppercase">
                    {metric.label}
                </p>
                <p class="mt-2 text-3xl font-black">{metric.value}</p>
            </div>
        {/each}
    </section>

    <section class="space-y-6">
        <div class="flex flex-col justify-between gap-4 border-b-2 border-foreground pb-4 md:flex-row md:items-end">
            <div>
                <p class="text-muted-foreground text-xs font-black tracking-[0.16em] uppercase">
                    System
                </p>
                <h2 class="mt-2 text-3xl font-black">Built For Sharp Interfaces</h2>
            </div>
            <Button variant="outline" href="/components" class="gap-2 self-start md:self-auto">
                View All
                <Icon icon={ArrowRight02Icon} class="h-5 w-5" />
            </Button>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
            {#each features as feature (feature.title)}
                <article
                    class="border-foreground bg-background group border-2 p-6 shadow-[0_5px_0_0_var(--color-shadow-color)] transition-all hover:-translate-y-[2px] hover:shadow-brutalist-hover"
                >
                    <div class="border-foreground bg-primary mb-5 inline-flex h-12 w-12 items-center justify-center border-2 text-primary-foreground">
                        <Icon icon={feature.icon} class="h-6 w-6" />
                    </div>
                    <h3 class="text-xl font-black">{feature.title}</h3>
                    <p class="text-muted-foreground mt-3 text-sm leading-relaxed font-bold">
                        {feature.description}
                    </p>
                </article>
            {/each}
        </div>
    </section>
</div>
