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
                <strong>Neo-Brutalism</strong>. It rejects the soft, muted aesthetics of modern web
                design in favor of high contrast, heavy borders, and vibrant colors.
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
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">
                Migrating to v2
            </h2>
            <div class="space-y-4 text-base leading-relaxed font-medium">
                <p>
                    Version 2 standardizes bordered components around the shared
                    <code class="bg-muted border-foreground border px-1 font-bold">radius</code>
                    prop. Replace removed
                    <code class="bg-muted border-foreground border px-1 font-bold"
                        >brutalist</code
                    >
                    boolean props with
                    <code class="bg-muted border-foreground border px-1 font-bold"
                        >radius="brutalist"</code
                    >,
                    <code class="bg-muted border-foreground border px-1 font-bold"
                        >radius="soft"</code
                    >, or
                    <code class="bg-muted border-foreground border px-1 font-bold"
                        >radius="rounded"</code
                    >.
                </p>
                <p>
                    Popover triggers now receive props and are no longer wrapped in an internal
                    button. Use
                    <code class="bg-muted border-foreground border px-1 font-bold"
                        >{`{#snippet trigger(props)}`}</code
                    >
                    and spread those props onto the trigger element.
                </p>
            </div>
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Key Features</h2>
            <ul class="grid grid-cols-1 gap-4 font-bold md:grid-cols-2">
                <li class="flex items-center gap-3">
                    <span class="bg-primary border-foreground h-3 w-3 border-2"></span>
                    Svelte 5 runes and snippets throughout
                </li>
                <li class="flex items-center gap-3">
                    <span class="bg-secondary border-foreground h-3 w-3 border-2"></span>
                    Tailwind CSS 4 integration
                </li>
                <li class="flex items-center gap-3">
                    <span class="bg-accent border-foreground h-3 w-3 border-2"></span>
                    Semantic markup, ARIA state, and keyboard support where components need it
                </li>
                <li class="flex items-center gap-3">
                    <span class="bg-success border-foreground h-3 w-3 border-2"></span>
                    Customizable styling through Tailwind classes and CSS tokens
                </li>
            </ul>
        </section>

        <section class="space-y-6">
            <h2
                class="border-foreground border-b-2 pb-2 text-2xl font-bold tracking-tighter uppercase italic"
            >
                Acknowledgments
            </h2>
            <p class="text-lg leading-relaxed font-medium">
                NeoBr-UI is built upon the shoulders of giants. Special thanks to the teams behind:
            </p>
            <ul class="space-y-4 font-bold italic underline decoration-2 underline-offset-4">
                <li>
                    <a
                        href="https://bits-ui.com"
                        target="_blank"
                        class="hover:text-primary transition-colors"
                    >
                        Bits UI
                    </a>
                    - For the headless primitives used by Accordion, Calendar, Date Picker, and
                    Select.
                </li>
                <li>
                    <a
                        href="https://hugeicons.com"
                        target="_blank"
                        class="hover:text-secondary transition-colors"
                    >
                        Hugeicons
                    </a>
                    - For the stunning icon library that gives our components character.
                </li>
                <li>
                    <a
                        href="https://svelte.dev"
                        target="_blank"
                        class="hover:text-accent transition-colors"
                    >
                        Svelte
                    </a>
                    - The framework that makes UI development a joy.
                </li>
                <li>
                    <a
                        href="https://tailwindcss.com"
                        target="_blank"
                        class="hover:text-success transition-colors"
                    >
                        Tailwind CSS
                    </a>
                    - For the utility-first styling power.
                </li>
            </ul>
        </section>
    </div>
</DocPage>
