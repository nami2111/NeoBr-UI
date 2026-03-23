<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement>;

    let { class: className, children, ...rest }: Props = $props();
</script>

<div
    role="tablist"
    class={cn(
        "border-foreground bg-muted text-muted-foreground shadow-brutalist rounded-brutalist inline-flex h-12 items-center justify-center border-2 p-1",
        className,
    )}
    {...rest}
>
    {@render children?.()}
</div>
