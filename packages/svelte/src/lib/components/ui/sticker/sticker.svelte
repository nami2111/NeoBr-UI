<script lang="ts">
    import { cn, RADIUS, type Radius } from "../../../utils";

    interface Props {
        /** Additional classes for the sticker. */
        class?: string;
        /**
         * Rotation in degrees.
         * @default 0
         */
        rotation?: number;
        /**
         * Color scheme.
         * @default "default"
         */
        variant?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive";
        /**
         * Sticker outline shape.
         * @default "rectangle"
         */
        shape?: "rectangle" | "pill" | "circle" | "tape" | "jagged" | "star";
        /**
         * Corner radius style (applies to the rectangle shape).
         * @default "brutalist"
         */
        radius?: Radius;
        /** Sticker content. */
        children?: import("svelte").Snippet;
    }

    let {
        class: className = undefined,
        rotation = undefined,
        variant = "default",
        shape = "rectangle",
        radius = "brutalist",
        children,
    }: Props = $props();

    const actualRotation = $derived(rotation ?? 0);

    const variants = {
        default: "bg-background text-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        destructive: "bg-destructive text-destructive-foreground",
    };

    // ponytail: clip-path eats a real `border`, so clipped shapes fake a 2px
    // outline with 4 stacked drop-shadows that follow the clip edge instead.
    const clipOutline =
        "[filter:drop-shadow(2px_0_0_var(--color-foreground))_drop-shadow(-2px_0_0_var(--color-foreground))_drop-shadow(0_2px_0_var(--color-foreground))_drop-shadow(0_-2px_0_var(--color-foreground))]";

    const shapes = $derived({
        rectangle: `border-2 px-3 py-1 ${RADIUS[radius]}`,
        pill: "border-2 px-4 py-1 rounded-full",
        circle: "border-2 aspect-square w-14 flex items-center justify-center rounded-full text-[10px] text-center p-2",
        tape: `${clipOutline} px-6 py-1 [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)]`,
        jagged: `${clipOutline} px-4 py-2 [clip-path:polygon(0%_10%,_10%_0%,_20%_10%,_30%_0%,_40%_10%,_50%_0%,_60%_10%,_70%_0%,_80%_10%,_90%_0%,_100%_10%,_100%_90%,_90%_100%,_80%_90%,_70%_100%,_60%_90%,_50%_100%,_40%_90%,_30%_100%,_20%_90%,_10%_100%,_0%_90%)]`,
        star: `${clipOutline} aspect-square w-16 flex items-center justify-center text-[10px] text-center p-2 [clip-path:polygon(50%_0%,_61%_20%,_83%_11%,_75%_33%,_95%_42%,_75%_55%,_85%_78%,_62%_75%,_50%_95%,_38%_75%,_15%_78%,_25%_55%,_5%_42%,_25%_33%,_17%_11%,_39%_20%)]`,
    });
</script>

<div
    class={cn(
        "border-foreground inline-block font-black tracking-tight uppercase transition-transform select-none",
        variants[variant],
        shapes[shape],
        className,
    )}
    style="transform: rotate({actualRotation}deg);"
>
    {@render children?.()}
</div>
