<script lang="ts">
    import { cn } from "../../../utils";

    interface Props {
        class?: string;
        title?: string | import("svelte").Snippet;
        description?: string | import("svelte").Snippet;
        header?: import("svelte").Snippet;
        icon?: import("svelte").Snippet;
        children?: import("svelte").Snippet;
    }

    let {
        class: className = undefined,
        title,
        description,
        header,
        icon,
        children,
    }: Props = $props();
</script>

<div
    class={cn(
        "group/bento bg-card text-card-foreground border-foreground shadow-brutalist rounded-brutalist hover:shadow-brutalist-hover flex flex-col justify-between space-y-4 border-2 p-4 transition-all",
        className,
    )}
>
    {#if header}
        <div
            class="rounded-brutalist border-foreground/10 group-hover/bento:border-foreground/20 flex min-h-[6rem] w-full flex-1 overflow-hidden border-2 transition-colors"
        >
            {@render header()}
        </div>
    {/if}
    <div class="transition duration-200 group-hover/bento:translate-x-2">
        {#if icon}
            <div class="mb-2">
                {@render icon()}
            </div>
        {/if}
        <div class="text-foreground mt-2 mb-1 font-black tracking-tighter uppercase">
            {#if typeof title === "string"}
                {title}
            {:else if title}
                {@render title()}
            {/if}
        </div>
        <div class="text-muted-foreground text-xs font-medium italic">
            {#if typeof description === "string"}
                {description}
            {:else if description}
                {@render description()}
            {/if}
        </div>
    </div>
    {@render children?.()}
</div>
