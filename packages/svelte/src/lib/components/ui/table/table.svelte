<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLTableAttributes } from "svelte/elements";

    /** Table root. Wrap header/body/footer sub-components. */
    let { class: className, children, ...rest }: HTMLTableAttributes = $props();
</script>

<div class="relative w-full overflow-auto">
    <table
        class={cn("border-foreground w-full caption-bottom border-2 text-sm", className)}
        {...rest}
    >
        {@render children?.()}
    </table>
</div>
