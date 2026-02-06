<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    let { class: className, children, ...rest }: HTMLAttributes<HTMLTableCellElement> = $props();
</script>

<td class={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...rest}>
    {@render children?.()}
</td>
