<script lang="ts">
    import { cn } from "../../../utils";

    type Props = {
        for?: string;
        class?: string;
        children?: import("svelte").Snippet;
        [key: string]: any;
    };

    let { for: htmlFor, class: className, children, ...rest }: Props = $props();
</script>

<label
    for={htmlFor}
    class={cn(
        "text-sm leading-none font-bold peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
    )}
    {...rest}
>
    {@render children?.()}
</label>
