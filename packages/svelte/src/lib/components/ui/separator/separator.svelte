<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        orientation?: "horizontal" | "vertical";
        decorative?: boolean;
    };

    let {
        orientation = "horizontal",
        decorative = true,
        class: className,
        ...rest
    }: Props = $props();
</script>

<div
    role={decorative ? "none" : "separator"}
    aria-orientation={decorative ? undefined : orientation}
    class={cn(
        "shrink-0 bg-foreground",
        orientation === "horizontal" ? "h-[3px] w-full" : "h-full w-[3px]",
        className,
    )}
    {...rest}
></div>
