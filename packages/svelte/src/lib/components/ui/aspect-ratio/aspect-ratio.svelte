<script lang="ts">
    import { cn } from "../../../utils";

    type Props = {
        ratio?: number;
        class?: string;
        children?: import("svelte").Snippet;
    };

    let { ratio = 1, class: className, children, ...rest }: Props = $props();

    const paddingBottom = $derived(`${(1 / ratio) * 100}%`);
</script>

<div
    class={cn("relative w-full", className)}
    style="padding-bottom: {paddingBottom}"
    {...rest}
>
    <div class="absolute inset-0">
        {@render children?.()}
    </div>
</div>
