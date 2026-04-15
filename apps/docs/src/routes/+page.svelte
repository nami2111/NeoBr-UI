<script lang="ts">
    import { Button, Badge, Card, CardContent, Input, Form } from "@neobr/svelte";
    import { BentoGrid, BentoGridItem } from "@neobr/svelte";
    import { Slider, DatePicker } from "@neobr/svelte";
    import { today, getLocalTimeZone } from "@internationalized/date";
    import { onMount } from "svelte";

    let copied = $state(false);
    let installCommand = "$ npm install @neobr/svelte";
    let sliderValue = $state(45);
    let username = $state("neobr");
    let dateValue = $state(today(getLocalTimeZone()));
    let version = $state("");

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

<!-- Hero -->
<section class="py-16 text-center">
    <Badge class="mb-6">v{version || "..."}</Badge>
    <h1 class="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
        NeoBr UI
    </h1>
    <p class="text-muted-foreground mb-6 max-w-md mx-auto">
        A neo-brutalist component library for Svelte 5. Bold, accessible, and easy to customize.
    </p>
    <div class="flex gap-3 justify-center mb-8">
        <Button href="/docs/installation">Get Started</Button>
        <Button variant="outline" href="/components">Components</Button>
    </div>

    <div class="inline-flex items-center border-2 border-foreground rounded-brutalist overflow-hidden">
        <code class="text-sm font-mono px-3 py-2">{installCommand}</code>
        <button 
            onclick={copyInstall} 
            class="px-2.5 py-2 border-l-2 border-foreground hover:bg-accent transition-all cursor-pointer"
            aria-label="Copy install command"
        >
            {#if copied}
                <svg class="h-5 w-5 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
            {:else}
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
            {/if}
        </button>
    </div>
</section>

<!-- Bento Grid -->
<section class="py-8 overflow-x-hidden">
    <h2 class="text-xl font-black uppercase mb-6 text-center px-4">Components</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-0 max-w-4xl mx-auto auto-rows-[14rem] md:auto-rows-[18rem]">
        <BentoGridItem title="Button" description="Variants" class="md:col-span-2 h-full">
            <div class="flex gap-2 justify-center items-center h-full flex-wrap">
                <Button>Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
            </div>
        </BentoGridItem>

        <BentoGridItem title="Slider" description="Range" class="h-full">
            <div class="w-full max-w-[200px] mx-auto flex items-center h-full">
                <Slider bind:value={sliderValue} max={100} step={1} />
            </div>
        </BentoGridItem>

        <BentoGridItem title="DatePicker" description="Date" class="h-full">
            <div class="flex justify-center items-center h-full">
                <DatePicker bind:value={dateValue} />
            </div>
        </BentoGridItem>

        <BentoGridItem title="Input" description="Form field" class="md:col-span-2 h-full">
            <div class="flex justify-center items-center h-full w-full">
                <Form class="flex gap-2 flex-wrap justify-center">
                    <Input placeholder="Username" bind:value={username} />
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        </BentoGridItem>
    </div>
</section>