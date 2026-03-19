<script lang="ts">
    interface Props {
        title: string;
        description?: string;
        children?: import("svelte").Snippet;
    }

    let { title, description, children }: Props = $props();
</script>

<div class="animate-slide-up space-y-8 duration-500">
    <div class="space-y-4">
        <h1 class="text-4xl font-black tracking-tighter uppercase md:text-5xl">
            {title}
        </h1>
        {#if description}
            <p class="text-muted-foreground max-w-2xl text-xl leading-relaxed font-medium">
                {description}
            </p>
        {/if}
        <div class="bg-primary border-foreground h-2 w-24 border-2"></div>
    </div>

    <div class="pt-4">
        {@render children?.()}
    </div>
</div>
