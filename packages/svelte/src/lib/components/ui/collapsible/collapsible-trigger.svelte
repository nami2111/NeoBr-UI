<script lang="ts">
    import { getCollapsibleState } from "./collapsible.svelte";
    import { cn } from "../../../utils";

    type Props = {
        class?: string;
        children?: import("svelte").Snippet;
        [key: string]: any;
    };

    let { class: className, children, ...rest }: Props = $props();
    const state = getCollapsibleState();
</script>

<button
    type="button"
    class={cn("cursor-pointer", className)}
    onclick={() => state?.toggle()}
    disabled={state?.disabled}
    aria-expanded={state?.open}
    data-state={state?.open ? "open" : "closed"}
    {...rest}
>
    {@render children?.()}
</button>
