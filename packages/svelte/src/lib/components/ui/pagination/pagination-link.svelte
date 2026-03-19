<script lang="ts">
    import { cn } from "../../../utils";
    import { Button } from "../button";

    type Props = {
        isActive?: boolean;
        class?: string;
        children?: import("svelte").Snippet;
        [key: string]: any;
    };

    let { isActive = false, class: className, children, ...rest }: Props = $props();
</script>

<Button
    variant={isActive ? "default" : "outline"}
    size="sm"
    class={cn("min-w-[40px]", className)}
    {...rest}
>
    {@render children?.()}
</Button>
