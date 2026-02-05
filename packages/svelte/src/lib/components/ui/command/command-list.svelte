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
    class={cn("max-h-[300px] overflow-y-auto overflow-x-hidden p-2", className)}
    {...rest}
>
    {@render children?.()}
</div>
