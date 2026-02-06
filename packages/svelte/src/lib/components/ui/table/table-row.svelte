<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    let { class: className, children, ...rest }: HTMLAttributes<HTMLTableRowElement> = $props();
</script>

<tr
    class={cn(
        "border-foreground hover:bg-muted/50 data-[state=selected]:bg-muted border-b-2 transition-colors",
        className,
    )}
    {...rest}
>
    {@render children?.()}
</tr>
