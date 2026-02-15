<script lang="ts">
    import { cn } from "../../../utils";

    type Props = {
        class?: string;
        children?: import("svelte").Snippet;
        [key: string]: any;
    };

    let { class: className, children, ...rest }: Props = $props();
</script>

<div
    role="tablist"
    class={cn(
        "border-foreground bg-muted text-muted-foreground rounded-brutalist inline-flex h-12 items-center justify-center border-2 p-1",
        className,
    )}
    {...rest}
>
    {@render children?.()}
</div>
