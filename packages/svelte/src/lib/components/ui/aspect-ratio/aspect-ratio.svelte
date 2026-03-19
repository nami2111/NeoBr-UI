<script lang="ts">
    import { cn } from "../../../utils";

    type Props = {
        ratio?: number;
        class?: string;
        children?: import("svelte").Snippet;
    };

    let { ratio = 1, class: className, children, ...rest }: Props = $props();
</script>

<div class={cn("relative w-full", className)} style="aspect-ratio: {ratio}" {...rest}>
    {@render children?.()}
</div>
