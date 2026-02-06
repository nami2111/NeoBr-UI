<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    let { class: className, children, ...rest }: HTMLAttributes<HTMLElement> = $props();
</script>

<caption class={cn("text-muted-foreground mt-4 text-sm font-bold italic", className)} {...rest}>
    {@render children?.()}
</caption>
