<script lang="ts">
    import { cn } from "$lib/utils";
    import type { HTMLAttributes } from "svelte/elements";

    type $$Props = HTMLAttributes<HTMLHeadingElement>;

    let className: string | undefined = undefined;
    export { className as class };
</script>

<h5
    class={cn("mb-1 font-bold leading-none tracking-tight", className)}
    {...$$restProps}
>
    <slot />
</h5>
