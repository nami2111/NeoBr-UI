<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
</script>

<DocPage
    title="Introduction"
    description="Welcome to NeoBr-UI, a bold, high-contrast design system for Svelte 5."
>
    <div class="space-y-12">
        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">What is NeoBr-UI?</h2>
            <p class="text-lg leading-relaxed font-medium">
                NeoBr-UI is an unashamedly bold UI library built on the principles of
                **Neo-Brutalism**. It rejects the soft, muted aesthetics of modern web design in
                favor of high contrast, heavy borders, and vibrant colors.
            </p>
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Core Philosophy</h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div class="border-foreground shadow-brutalist space-y-2 border-2 p-6">
                    <h3 class="text-xl font-black uppercase">High Impact</h3>
                    <p class="font-bold italic">
                        Design that demands attention. No subtle shadows, just raw geometric power.
                    </p>
                </div>
                <div class="border-foreground shadow-brutalist space-y-2 border-2 p-6">
                    <h3 class="text-xl font-black uppercase">User Centric</h3>
                    <p class="font-bold italic">
                        High contrast isn't just an aesthetic; it's a commitment to readability and
                        clarity.
                    </p>
                </div>
            </div>
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Key Features</h2>
            <ul class="grid grid-cols-1 gap-4 font-bold md:grid-cols-2">
                <li class="flex items-center gap-3">
                    <span class="bg-primary border-foreground h-3 w-3 border-2"></span>
                    Svelte 5 Runes for ultra-fast reactivity
                </li>
                <li class="flex items-center gap-3">
                    <span class="bg-secondary border-foreground h-3 w-3 border-2"></span>
                    Tailwind CSS 4 integration
                </li>
                <li class="flex items-center gap-3">
                    <span class="bg-accent border-foreground h-3 w-3 border-2"></span>
                    WAI-ARIA compliant components
                </li>
                <li class="flex items-center gap-3">
                    <span class="bg-success border-foreground h-3 w-3 border-2"></span>
                    Fully customizable styling
                </li>
            </ul>
        </section>
    </div>
</DocPage>
