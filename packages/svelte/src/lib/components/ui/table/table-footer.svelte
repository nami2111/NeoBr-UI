<script lang="ts">
    import { cn } from "$lib/utils";
    import type { HTMLAttributes } from "svelte/elements";

    let { class: className, children, ...rest }: HTMLAttributes<HTMLTableSectionElement> = $props();
</script>

<tfoot
    class={cn(
        "border-foreground bg-muted/50 border-t-2 font-bold [&>tr]:last:border-b-0",
        className,
    )}
    {...rest}
>
    {@render children?.()}
</tfoot>
