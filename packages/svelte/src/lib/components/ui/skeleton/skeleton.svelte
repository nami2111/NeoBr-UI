<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    /** Placeholder block shown while content loads. Size it with `class`. */
    type Props = HTMLAttributes<HTMLDivElement>;

    let { class: className, ...rest }: Props = $props();
</script>

<div
    role="status"
    aria-busy="true"
    aria-label="Loading content"
    class={cn(
        "bg-muted/60 border-foreground/20 relative animate-skeleton-pulse overflow-hidden rounded-sm border-2",
        className,
    )}
    {...rest}
>
    <!-- Sweep bar: animation + sweep geometry live in design-system.css
         (--animate-skeleton-shimmer token + global .animate-skeleton-shimmer
         rule) so CSS-only consumers can theme them. -->
    <div class="animate-skeleton-shimmer"></div>
</div>
