<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";

    const swatches = [
        { name: "background", class: "bg-background", note: "App surface" },
        { name: "foreground", class: "bg-foreground", note: "Text / hard edges" },
        { name: "primary", class: "bg-primary", note: "Lavender" },
        { name: "secondary", class: "bg-secondary", note: "Peach" },
        { name: "success", class: "bg-success", note: "Green" },
        { name: "warning", class: "bg-warning", note: "Yellow" },
        { name: "destructive", class: "bg-destructive", note: "Red" },
        { name: "muted", class: "bg-muted", note: '== accent (alias)' },
        { name: "card", class: "bg-card", note: "Elevated panels" },
        { name: "ring", class: "bg-ring", note: "Focus outlines" },
        { name: "border", class: "bg-border", note: "shadcn-compat" },
        { name: "input", class: "bg-input", note: "shadcn-compat" },
    ];

    const radii = [
        { name: "brutalist", value: "0px", desc: "Sharp, default" },
        { name: "soft", value: "6px", desc: "Subtle corners" },
        { name: "rounded", value: "12px", desc: "Pill-friendly" },
    ];

    const depths = [
        { name: "shadow-brutalist", value: "0 5px 0 0", note: "Resting hard shadow" },
        { name: "shadow-brutalist-hover", value: "0 8px 0 0", note: "Lifted on hover" },
        { name: "--lift-brutalist", value: "2px", note: "Hover rise" },
        { name: "--press-brutalist / -sm", value: "5px / 2px", note: "Press travel" },
    ];

    const z = [
        "z-dropdown-backdrop 40 / z-dropdown 41",
        "z-select-backdrop 38 / z-select 39",
        "z-modal-backdrop 49 / z-modal 50",
        "z-sheet-backdrop 54 / z-sheet 55",
        "z-popover-backdrop 59 / z-popover 60",
        "z-tooltip 70",
        "z-toast 100",
    ];
</script>

<DocPage
    title="Design Tokens"
    description="The color, depth, motion, and sizing language behind every NeoBr-UI component."
>
    <div class="space-y-12">
        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Colors (OKLCH)</h2>
            <p class="font-bold">
                All tokens live in
                <code class="bg-muted border-foreground border px-1">@theme</code>
                inside the imported
                <code class="bg-muted border-foreground border px-1">design-system.css</code>.
                Dark mode is class-based — add
                <code class="bg-muted border-foreground border px-1">.dark</code>
                on any ancestor.
            </p>
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {#each swatches as swatch}
                    <div class="border-foreground bg-card flex items-center gap-3 border-2 p-3 shadow-brutalist">
                        <span class={`${swatch.class} border-foreground h-10 w-10 shrink-0 border-2`}></span>
                        <div class="min-w-0">
                            <p class="truncate text-sm font-black">{swatch.name}</p>
                            <p class="text-muted-foreground truncate text-xs font-bold">{swatch.note}</p>
                        </div>
                    </div>
                {/each}
            </div>
            <p class="text-muted-foreground text-sm font-bold">
                Each colored token has <code>-hover</code> / <code>-active</code> states (e.g.
                <code>bg-primary-hover</code>) plus a <code>-foreground</code> counterpart for
                readable text on top.
            </p>
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Radius</h2>
            <p class="font-bold">
                Components accept a shared
                <code class="bg-muted border-foreground border px-1">radius="brutalist" | "soft" | "rounded"</code>
                prop. The underlying utilities
                <code class="bg-muted border-foreground border px-1">rounded-brutalist*</code> are
                also available standalone.
            </p>
            <div class="grid grid-cols-3 gap-4">
                {#each radii as r}
                    <div class="border-foreground bg-muted flex flex-col items-center gap-2 border-2 p-4 shadow-brutalist">
                        <span class="{r.name === "brutalist" ? "rounded-brutalist" : r.name === "soft" ? "rounded-brutalist-soft" : "rounded-brutalist-rounded"} bg-primary border-foreground h-14 w-14 border-2"></span>
                        <p class="text-sm font-black">{r.name}</p>
                        <p class="text-muted-foreground text-xs font-bold">{r.value} — {r.desc}</p>
                    </div>
                {/each}
            </div>
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Depth</h2>
            <p class="font-bold">
                NeoBr shadows are flat offset blocks, not fades. Interactions “lift” the element
                and press it flat against the page.
            </p>
            <div class="grid grid-cols-2 gap-4">
                {#each depths as d}
                    <div class="border-foreground bg-card border-2 p-4">
                        <p class="font-mono text-sm font-bold">{d.name}</p>
                        <p class="text-muted-foreground mt-1 text-xs font-bold">{d.value}</p>
                        <p class="text-muted-foreground text-xs font-bold">{d.note}</p>
                    </div>
                {/each}
            </div>
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Motion</h2>
            <div class="space-y-4">
                <p class="font-bold">
                    JS transitions ship as
                    <code class="bg-muted border-foreground border px-1">TRANSITION_BRUTALIST</code>,
                    <code class="bg-muted border-foreground border px-1">…_FAST</code> (100ms),
                    <code class="bg-muted border-foreground border px-1">…_BACKDROP</code> (200ms),
                    <code class="bg-muted border-foreground border px-1">…_SLOW</code> (300ms), and the
                    popup dialect <code class="bg-muted border-foreground border px-1">TRANSITION_POPUP</code>.
                    All honor <code class="bg-muted border-foreground border px-1">prefers-reduced-motion</code>
                    (duration drops to 0).
                </p>
                <p class="font-bold">
                    CSS utilities: <code class="bg-muted border-foreground border px-1">animate-fade-in</code>,
                    <code class="bg-muted border-foreground border px-1">animate-slide-up</code>,
                    <code class="bg-muted border-foreground border px-1">animate-marquee(-reverse)</code>,
                    <code class="bg-muted border-foreground border px-1">animate-neobr-tail</code>,
                    <code class="bg-muted border-foreground border px-1">animate-progress-indeterminate</code>,
                    <code class="bg-muted border-foreground border px-1">animate-skeleton-shimmer</code>,
                    <code class="bg-muted border-foreground border px-1">animate-skeleton-pulse</code>.
                    The theme's reduced-motion block neutralizes NeoBr's own looping/entry animations.
                </p>
            </div>
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Z-Index Scale</h2>
            <ul class="space-y-2 font-mono text-sm font-bold">
                {#each z as level}
                    <li class="border-foreground bg-muted border-2 px-3 py-2">{level}</li>
                {/each}
            </ul>
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">
                shadcn-compat aliases
            </h2>
            <p class="leading-relaxed font-bold">
                <code class="bg-muted border-foreground border px-1">--color-border</code> and
                <code class="bg-muted border-foreground border px-1">--color-input</code> alias the
                muted scale so <code class="bg-muted border-foreground border px-1">border-border</code> /
                <code class="bg-muted border-foreground border px-1">border-input</code> work out of
                the box. NeoBr's own components deliberately draw with
                <code class="bg-muted border-foreground border px-1">border-foreground</code> (hard
                black edges) — use the aliases when you want shadcn-flavored subtle borders.
            </p>
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Utilities</h2>
            <p class="leading-relaxed font-bold">
                <code class="bg-muted border-foreground border px-1">@utility</code> helpers:
                <code class="bg-muted border-foreground border px-1">btn-brutalist(-soft|-rounded)</code>,
                <code class="bg-muted border-foreground border px-1">input-brutalist</code>,
                <code class="bg-muted border-foreground border px-1">card-brutalist</code>,
                <code class="bg-muted border-foreground border px-1">container-brutalist</code>,
                <code class="bg-muted border-foreground border px-1">tracking-brutalist</code>,
                and the <code class="bg-muted border-foreground border px-1">z-*</code> scale above —
                usable in any consumer app that imports the design system.
            </p>
        </section>
    </div>
</DocPage>