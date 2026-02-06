<script lang="ts">
    import {
        Button,
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
        Icon,
    } from "@neobr/svelte";
    import {
        ArrowRight01Icon,
        PackageIcon,
        FlashIcon,
        Layout01Icon,
    } from "@hugeicons/core-free-icons";
</script>

<div class="space-y-20 py-10">
    <!-- Hero Section -->
    <section class="space-y-8">
        <div class="space-y-4">
            <h1
                class="animate-in fade-in slide-in-from-top-10 text-6xl leading-[0.8] font-black tracking-tighter uppercase duration-700 md:text-8xl"
            >
                Neo Brutalist <br />
                <span class="text-primary text-stroke-2">Component</span> <br />
                System
            </h1>
            <p
                class="border-foreground animate-in fade-in slide-in-from-left-10 max-w-2xl border-l-4 py-2 pl-6 text-2xl font-bold delay-200 duration-700"
            >
                A high-contrast, high-impact UI library built for speed and accessibility. Designed
                with Svelte 5 runes.
            </p>
        </div>

        <div
            class="animate-in fade-in slide-in-from-bottom-10 flex flex-wrap gap-6 delay-500 duration-700"
        >
            <Button size="lg" href="/docs/installation" class="h-auto px-12 py-8 text-xl">
                Get Started
                <Icon icon={ArrowRight01Icon} class="ml-2 h-6 w-6" />
            </Button>
            <Button
                variant="outline"
                size="lg"
                href="/components"
                class="h-auto px-12 py-8 text-xl"
            >
                View Components
            </Button>
        </div>
    </section>

    <!-- Features -->
    <section class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card
            class="bg-primary/10 hover:shadow-brutalist-hover transition-all hover:-translate-y-1"
        >
            <CardHeader>
                <div
                    class="bg-primary border-foreground mb-6 flex h-16 w-16 items-center justify-center border-2"
                >
                    <Icon icon={FlashIcon} class="text-primary-foreground h-10 w-10" />
                </div>
                <CardTitle class="text-2xl font-black uppercase">Svelte 5 Powered</CardTitle>
                <CardDescription class="text-foreground font-bold italic"
                    >Built from the ground up with Svelte 5 Runes for maximum reactivity and
                    performance.</CardDescription
                >
            </CardHeader>
        </Card>

        <Card
            class="bg-secondary/10 hover:shadow-brutalist-hover transition-all hover:-translate-y-1"
        >
            <CardHeader>
                <div
                    class="bg-secondary border-foreground mb-6 flex h-16 w-16 items-center justify-center border-2"
                >
                    <Icon icon={PackageIcon} class="text-secondary-foreground h-10 w-10" />
                </div>
                <CardTitle class="text-2xl font-black uppercase">Accessible</CardTitle>
                <CardDescription class="text-foreground font-bold italic"
                    >Adheres to WAI-ARIA patterns and ensures proper keyboard navigation and screen
                    reader support.</CardDescription
                >
            </CardHeader>
        </Card>

        <Card class="bg-accent/10 hover:shadow-brutalist-hover transition-all hover:-translate-y-1">
            <CardHeader>
                <div
                    class="bg-accent border-foreground mb-6 flex h-16 w-16 items-center justify-center border-2"
                >
                    <Icon icon={Layout01Icon} class="text-accent-foreground h-10 w-10" />
                </div>
                <CardTitle class="text-2xl font-black uppercase">Neo-Brutalist</CardTitle>
                <CardDescription class="text-foreground font-bold italic"
                    >Bold shadows, hard borders, and high contrast. A unique aesthetic that stands
                    out.</CardDescription
                >
            </CardHeader>
        </Card>
    </section>

    <!-- Call to Action -->
    <section
        class="border-foreground bg-accent shadow-brutalist relative flex flex-col items-center space-y-6 overflow-hidden rounded-none border-2 p-12 text-center"
    >
        <div
            class="bg-primary border-foreground absolute top-0 right-0 h-32 w-32 -translate-y-16 translate-x-16 -rotate-45 border-b-2 border-l-2"
        ></div>
        <h2 class="relative z-10 text-4xl font-black tracking-tighter uppercase md:text-5xl">
            Ready to build something bold?
        </h2>
        <p class="relative z-10 max-w-lg text-xl font-bold">
            Join the movement and start building websites that people will actually remember.
        </p>
        <Button
            size="lg"
            variant="default"
            href="/docs/installation"
            class="relative z-10 h-auto px-12 py-6 text-xl"
        >
            Show Me How
        </Button>
    </section>
</div>
