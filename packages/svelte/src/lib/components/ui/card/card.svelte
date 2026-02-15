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
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        /**
         * Card content.
         */
        children?: import("svelte").Snippet;
    };

    let { class: className, children, ...rest }: Props = $props();
</script>

<div class={cn("card-brutalist", className)} {...rest}>
    {@render children?.()}
</div>
