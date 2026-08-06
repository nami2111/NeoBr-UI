<script lang="ts">
    import { cn } from "../../../utils";

    type Props = {
        /**
         * Width-to-height ratio (width / height). E.g. `16 / 9` for widescreen.
         * @default 1
         */
        ratio?: number;
        /** Additional classes for the wrapper. */
        class?: string;
        /** Content constrained to the aspect ratio. */
        children?: import("svelte").Snippet;
    };

    let { ratio = 1, class: className, children, ...rest }: Props = $props();
</script>

<div class={cn("relative w-full", className)} style="aspect-ratio: {ratio}" {...rest}>
    {@render children?.()}
</div>
