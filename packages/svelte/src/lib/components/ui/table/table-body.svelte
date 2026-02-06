<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    let { class: className, children, ...rest }: HTMLAttributes<HTMLTableSectionElement> = $props();
</script>

<tbody class={cn("[&_tr:last-child]:border-0", className)} {...rest}>
    {@render children?.()}
</tbody>
