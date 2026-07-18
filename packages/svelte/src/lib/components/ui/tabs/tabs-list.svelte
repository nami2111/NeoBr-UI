<script lang="ts">
    import { cn, RADIUS, type Radius } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        /**
         * Corner radius: brutalist (sharp), soft (6px), or rounded (12px).
         * @default "brutalist"
         */
        radius?: Radius;
    };

    let { class: className, children, radius = "brutalist", ...rest }: Props = $props();
</script>

<div
    role="tablist"
    class={cn(
        "border-foreground bg-muted text-muted-foreground shadow-brutalist inline-flex h-12 items-center justify-center border-2 p-1",
        RADIUS[radius],
        className,
    )}
    {...rest}
>
    {@render children?.()}
</div>
