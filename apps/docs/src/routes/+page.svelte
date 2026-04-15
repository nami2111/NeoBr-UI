<script lang="ts">
    import {
        Button,
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
        Icon,
        Badge,
        Slider,
        Switch,
    } from "@neobr/svelte";
    import {
        ArrowRight01Icon,
        PackageIcon,
        FlashIcon,
        Layout01Icon,
        CopyIcon,
        CheckmarkCircleIcon,
    } from "@hugeicons/core-free-icons";

    let sliderValue = $state(45);
    let systemStatus = $state(true);
    let copied = $state(false);

    const installCommand = "npm install @neobr/svelte";

    function copyInstall() {
        navigator.clipboard.writeText(installCommand);
        copied = true;
        setTimeout(() => (copied = false), 2000);
    }
</script>

<div class="mx-auto max-w-5xl px-6">
    <!-- Hero Section -->
    <section class="flex flex-col items-center py-24 text-center">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            NeoBr <span class="text-primary">UI</span>
        </h1>
        <p class="text-lg text-muted-foreground mb-8 max-w-lg">
            The foundation for your design system. Beautifully designed, accessible components built with Svelte 5.
        </p>
        <div class="flex gap-3">
            <Button href="/docs/installation">
                Get Started
                <Icon icon={ArrowRight01Icon} class="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" href="/components">
                View Components
            </Button>
        </div>
    </section>

    <!-- Installation Code -->
    <section class="mb-20 border-2 border-foreground bg-muted/30 p-6">
        <div class="flex flex-col sm:flex-row items-center gap-4">
            <code class="flex-1 font-mono text-sm">{installCommand}</code>
            <Button variant="outline" size="sm" onclick={copyInstall}>
                <Icon icon={copied ? CheckmarkCircleIcon : CopyIcon} class="mr-2 h-4 w-4" />
                {copied ? "Copied!" : "Copy"}
            </Button>
        </div>
    </section>

    <!-- Interactive Preview -->
    <section class="mb-20 border-2 border-foreground bg-card p-8">
        <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
                <Badge>Live Preview</Badge>
            </div>
            <div class="grid sm:grid-cols-2 gap-8">
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-black uppercase">Volume</span>
                        <Badge>{sliderValue}%</Badge>
                    </div>
                    <Slider bind:value={sliderValue} max={100} step={1} />
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-black uppercase">Enabled</span>
                        <Switch bind:checked={systemStatus} />
                    </div>
                </div>
                <div class="flex flex-wrap gap-2 items-center">
                    <Button>Primary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                </div>
            </div>
        </div>
    </section>

    <!-- Features -->
    <section class="mb-20 grid sm:grid-cols-3 gap-4">
        <Card>
            <CardHeader>
                <Icon icon={FlashIcon} class="mb-2 h-6 w-6 text-primary" />
                <CardTitle class="text-lg font-black uppercase">Svelte 5</CardTitle>
                <CardDescription>Built with Runes for maximum reactivity.</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <Icon icon={PackageIcon} class="mb-2 h-6 w-6 text-secondary" />
                <CardTitle class="text-lg font-black uppercase">Accessible</CardTitle>
                <CardDescription>WAI-ARIA patterns, keyboard navigation.</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <Icon icon={Layout01Icon} class="mb-2 h-6 w-6" />
                <CardTitle class="text-lg font-black uppercase">Neo-Brutalist</CardTitle>
                <CardDescription>Bold, high contrast, unique aesthetic.</CardDescription>
            </CardHeader>
        </Card>
    </section>

    <!-- Components Grid -->
    <section class="mb-20">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-black uppercase tracking-tighter">Components</h2>
            <Button variant="outline" size="sm" href="/components">
                View All
                <Icon icon={ArrowRight01Icon} class="ml-2 h-4 w-4" />
            </Button>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card class="p-4">
                <CardContent class="flex h-16 items-center justify-center p-0">
                    <Button>Button</Button>
                </CardContent>
            </Card>
            <Card class="p-4">
                <CardContent class="flex h-16 items-center justify-center p-0">
                    <Badge>Badge</Badge>
                </CardContent>
            </Card>
            <Card class="p-4">
                <CardContent class="flex h-16 items-center justify-center p-0">
                    <Switch checked />
                </CardContent>
            </Card>
            <Card class="p-4">
                <CardContent class="flex h-16 items-center justify-center p-0">
                    <Card class="w-12">
                        <CardHeader class="p-2">
                            <CardTitle class="text-[10px]">Card</CardTitle>
                        </CardHeader>
                    </Card>
                </CardContent>
            </Card>
        </div>
    </section>

    <!-- CTA -->
    <section class="mb-12 border-2 border-foreground bg-card p-10 text-center">
        <h2 class="text-2xl font-black uppercase tracking-tighter mb-2">
            Ready to build?
        </h2>
        <p class="text-muted-foreground mb-6">
            Start building with NeoBr UI today.
        </p>
        <Button href="/docs/installation">
            Get Started
            <Icon icon={ArrowRight01Icon} class="ml-2 h-4 w-4" />
        </Button>
    </section>
</div>