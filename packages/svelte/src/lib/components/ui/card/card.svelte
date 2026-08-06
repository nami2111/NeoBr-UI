<script lang="ts">
    /**
     * High-level container component with Neo-Brutalist styling.
     * Can be used to group related content.
     *
     * @example
     * ```svelte
     * <Card class="max-w-md">
     *   <CardHeader>
     *     <CardTitle>Title</CardTitle>
     *   </CardHeader>
     *   <CardContent>Content</CardContent>
     * </Card>
     * ```
     */
    import { cn, RADIUS, type Radius } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        /**
         * Card content.
         */
        children?: import("svelte").Snippet;
        /**
         * Corner radius: brutalist (sharp), soft (6px), or rounded (12px).
         * @default "brutalist"
         */
        radius?: Radius;
    };

    let { class: className, children, radius = "brutalist", ...rest }: Props = $props();
</script>

<div
    class={cn(
        "bg-card text-card-foreground border-foreground shadow-brutalist border-2",
        RADIUS[radius],
        className,
    )}
    {...rest}
>
    {@render children?.()}
</div>
