<script lang="ts">
    import { cn } from "../../../utils";
    import { fade } from "svelte/transition";

    type Props = {
        open?: boolean;
        trigger?: import("svelte").Snippet;
        children?: import("svelte").Snippet;
        class?: string;
        contentClass?: string;
    };

    let {
        open = $bindable(false),
        trigger,
        children,
        class: className,
        contentClass,
    }: Props = $props();

    function toggle() {
        open = !open;
    }
</script>

<div class={cn("relative inline-block text-left", className)}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div onclick={toggle} class="cursor-pointer">
        {@render trigger?.()}
    </div>

    {#if open}
        <div
            class={cn(
                "border-foreground bg-background shadow-brutalist rounded-brutalist absolute z-50 mt-2 min-w-[200px] border-2 p-4",
                contentClass,
            )}
            transition:fade={{ duration: 100 }}
        >
            {@render children?.()}
        </div>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="fixed inset-0 z-40" onclick={() => (open = false)}></div>
    {/if}
</div>
