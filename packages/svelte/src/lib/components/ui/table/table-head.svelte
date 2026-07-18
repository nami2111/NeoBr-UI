<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    /** Table header cell (`<th>`). */
    let { class: className, children, ...rest }: HTMLAttributes<HTMLTableCellElement> = $props();
</script>

<th
    scope="col"
    class={cn(
        "text-foreground h-12 px-4 text-left align-middle font-bold [&:has([role=checkbox])]:pr-0",
        className,
    )}
    {...rest}
>
    {@render children?.()}
</th>
