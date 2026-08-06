<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /** Grid items, typically `BentoGridItem` components. */
        children?: import("svelte").Snippet;
    }

    let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<div
    class={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 auto-rows-[14rem] md:auto-rows-[18rem] md:grid-cols-3 overflow-x-hidden px-4 md:px-0",
        className,
    )}
    {...rest}
>
    {@render children?.()}
</div>