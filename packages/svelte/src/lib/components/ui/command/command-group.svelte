<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        heading?: string;
    };

    let { class: className, heading, children, ...rest }: Props = $props();
</script>

<div
    class={cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:text-muted-foreground",
        className,
    )}
    {...rest}
>
    {#if heading}
        <div data-cmdk-group-heading="">{heading}</div>
    {/if}
    {@render children?.()}
</div>
