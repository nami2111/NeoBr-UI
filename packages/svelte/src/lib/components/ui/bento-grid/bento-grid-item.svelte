<script lang="ts">
    import { cn } from "../../../utils";

    interface Props {
        /** Additional classes for the item. Use `md:col-span-*` / `md:row-span-*` to size within the grid. */
        class?: string;
        /** Item title, as text or a snippet. */
        title?: string | import("svelte").Snippet;
        /** Item description, as text or a snippet. */
        description?: string | import("svelte").Snippet;
        /** Optional header/media area rendered above the title. */
        header?: import("svelte").Snippet;
        /** Optional icon rendered alongside the title. */
        icon?: import("svelte").Snippet;
        /** Custom body content, rendered instead of title/description when provided. */
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
