<script lang="ts">
    import { getCollapsibleState } from "./collapsible-context";
    import { cn } from "../../../utils";

    import type { HTMLButtonAttributes } from "svelte/elements";

    type Props = HTMLButtonAttributes & {
        children?: import("svelte").Snippet;
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
