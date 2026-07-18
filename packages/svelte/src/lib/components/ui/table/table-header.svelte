<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    /** Table header section (`<thead>`). */
    let { class: className, children, ...rest }: HTMLAttributes<HTMLTableSectionElement> = $props();
</script>

<thead class={cn("border-foreground bg-muted/50 [&_tr]:border-b-2", className)} {...rest}>
    {@render children?.()}
</thead>
