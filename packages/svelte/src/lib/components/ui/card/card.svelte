<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "$lib/utils";

    type $$Props = HTMLAttributes<HTMLDivElement>;

    let className: $$Props["class"] = undefined;
    export { className as class };
</script>

<div
    class={cn(
        "rounded-none border-2 bg-card text-card-foreground shadow-brutalist",
        className,
    )}
    {...$$restProps}
>
    <slot />
</div>
