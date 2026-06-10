<script lang="ts">
    import { componentCount } from "$lib/component-catalog";
    import { Badge, Button, Icon } from "@neobr/svelte";
    import { onMount } from "svelte";
    import {
        ArrowRight02Icon,
        CheckmarkCircle02Icon,
        CodeIcon,
        Copy01Icon,
        LayoutGridIcon,
        Shield01Icon,
        TerminalIcon,
        ZapIcon,
    } from "@hugeicons/core-free-icons";

    let copied = $state(false);
    const installCommand = "$ pnpm add @neobr/svelte @neobr/tailwind-preset";
    let version = $state("");

    const metrics = [
        { label: "Components", value: componentCount.toString() },
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
            description: "Core interactions use semantic markup, ARIA state, and keyboard support.",
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

        <div class="relative mx-auto w-full max-w-lg" aria-hidden="true">
            <div
                class="border-foreground bg-background relative overflow-hidden border-2 shadow-brutalist"
            >
                <div class="absolute inset-0 bg-grid-fine opacity-10"></div>

                <div class="relative">
                    <div
                        class="border-foreground bg-foreground text-background flex items-center justify-between border-b-2 px-4 py-3"
                    >
                        <span class="text-sm font-black">@neobr/svelte</span>
                        <span class="text-xs font-black">v{version || "..."}</span>
                    </div>

                    <div class="grid min-h-[31rem] grid-rows-[1fr_auto]">
                        <div class="relative overflow-hidden p-6 sm:p-8">
                            <div class="border-foreground bg-secondary absolute top-8 right-8 h-36 w-28 border-2"></div>
                            <div class="border-foreground bg-primary absolute top-16 right-16 h-36 w-28 border-2"></div>
                            <div class="border-foreground bg-success absolute right-8 bottom-24 h-14 w-44 border-2"></div>
                            <div class="bg-foreground absolute right-8 bottom-44 h-3 w-32"></div>

                            <div class="relative z-10 flex min-h-[22rem] flex-col justify-between">
                                <div>
                                    <p class="text-muted-foreground text-xs font-black uppercase">
                                        Brutalist Interface Kit
                                    </p>
                                    <div class="mt-8">
                                        <p class="text-6xl leading-[0.82] font-black sm:text-7xl">
                                            NEO
                                        </p>
                                        <p
                                            class="text-primary text-6xl leading-[0.82] font-black sm:text-7xl"
                                        >
                                            BR
                                        </p>
                                        <p class="text-4xl leading-none font-black sm:text-5xl">
                                            UI
                                        </p>
                                    </div>
                                </div>

                                <div class="space-y-3">
                                    <div class="bg-foreground h-3 w-40"></div>
                                    <div class="flex max-w-xs gap-2">
                                        <div class="border-foreground bg-primary h-10 flex-1 border-2"></div>
                                        <div class="border-foreground bg-secondary h-10 flex-1 border-2"></div>
                                        <div class="border-foreground bg-success h-10 flex-1 border-2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="border-foreground bg-muted grid grid-cols-3 border-t-2">
                            <div class="border-foreground px-4 py-3 first:border-r-2">
                                <p class="text-muted-foreground text-xs font-black">Runtime</p>
                                <p class="font-black">Svelte 5</p>
                            </div>
                            <div class="border-foreground px-4 py-3">
                                <p class="text-muted-foreground text-xs font-black">Styling</p>
                                <p class="font-black">Tailwind 4</p>
                            </div>
                            <div class="border-foreground px-4 py-3 last:border-l-2">
                                <p class="text-muted-foreground text-xs font-black">Preset</p>
                                <p class="font-black">CSS</p>
                            </div>
                        </div>
                    </div>
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
