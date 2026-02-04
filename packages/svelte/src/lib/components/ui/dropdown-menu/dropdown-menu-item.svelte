<script lang="ts">
    import { cn } from "$lib/utils";
    import type { HTMLAttributes } from "svelte/elements";

    type $$Props = HTMLAttributes<HTMLDivElement>;

    let className: string | undefined = undefined;
    export { className as class };
</script>

<div
    role="menuitem"
    tabindex="-1"
    class={cn(
        "relative flex cursor-default select-none items-center px-2 py-1.5 text-sm font-bold outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
    )}
    {...$$restProps}
>
    <slot />
</div>
