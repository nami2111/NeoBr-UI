<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLInputAttributes } from "svelte/elements";

    let {
        class: className,
        type = "text",
        ...rest
    }: HTMLInputAttributes = $props();
</script>

<input
    {type}
    class={cn(
        "flex h-10 w-full border-2 border-foreground bg-background px-3 py-2 text-sm font-bold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-inner tracking-tight",
        className,
    )}
    {...rest}
/>
