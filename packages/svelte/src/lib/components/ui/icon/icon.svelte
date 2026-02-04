<script lang="ts">
    import type { ComponentType } from "svelte";
    import { cn } from "$lib/utils";

    // HugeIcons components are passed as the `icon` prop.
    // Example: <Icon icon={Home01Icon} />

    export let icon: ComponentType;
    export let size: number | string = 24;
    export let color: string | undefined = undefined;

    let className: string | undefined = undefined;
    export { className as class };
</script>

<svelte:component
    this={icon}
    {size}
    {color}
    class={cn("inline-block shrink-0", className)}
    {...$$restProps}
/>
