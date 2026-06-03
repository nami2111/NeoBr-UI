<script lang="ts">
    interface Props {
        title: string;
        description?: string;
        children?: import("svelte").Snippet;
    }

    let { title, description, children }: Props = $props();

    const pageTitle = $derived(`${title} - NeoBr UI`);
    const pageDescription = $derived(
        description ??
            "NeoBr UI documentation for the Svelte 5 neo-brutalist component library.",
    );
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
</svelte:head>

<div class="animate-slide-up space-y-8 overflow-x-hidden pt-6 duration-500 md:pt-10">
    <div class="space-y-5">
        <div class="flex items-center gap-3">
            <div class="bg-primary border-foreground h-6 w-6 border-2 shadow-[0_3px_0_0_var(--color-shadow-color)]"></div>
            <p class="text-muted-foreground text-xs font-black tracking-[0.16em] uppercase">
                Documentation
            </p>
        </div>
        <h1 class="max-w-3xl text-4xl leading-tight font-black md:text-5xl">
            {title}
        </h1>
        {#if description}
            <p class="text-muted-foreground max-w-3xl text-lg leading-relaxed font-bold md:text-xl">
                {description}
            </p>
        {/if}
        <div class="flex h-2 w-36 border-2 border-foreground">
            <div class="bg-primary flex-1"></div>
            <div class="bg-secondary flex-1 border-l-2 border-foreground"></div>
            <div class="bg-success flex-1 border-l-2 border-foreground"></div>
        </div>
    </div>

    <div>
        {@render children?.()}
    </div>
</div>
