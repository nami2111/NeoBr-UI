<script lang="ts">
    import { cn } from "$lib/utils";
    import type { HTMLAttributes } from "svelte/elements";

    let { class: className, children, ...rest }: HTMLAttributes<HTMLTableSectionElement> = $props();
</script>

<thead class={cn("border-foreground bg-muted/50 [&_tr]:border-b-2", className)} {...rest}>
    {@render children?.()}
</thead>
