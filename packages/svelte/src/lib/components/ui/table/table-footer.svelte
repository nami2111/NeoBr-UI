<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    /** Table footer (`<tfoot>`), e.g. for totals. */
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
