<script lang="ts">
    import { cva, type VariantProps } from "class-variance-authority";
    import { cn } from "$lib/utils";

    const loadingVariants = cva("animate-spin", {
        variants: {
            variant: {
                default: "text-primary",
                secondary: "text-secondary",
                muted: "text-muted-foreground",
            },
            size: {
                sm: "h-4 w-4",
                default: "h-6 w-6",
                lg: "h-8 w-8",
                xl: "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    });

    type $$Props = VariantProps<typeof loadingVariants> & {
        class?: string;
    };

    let className: string | undefined = undefined;
    export { className as class };

    export let variant: $$Props["variant"] = "default";
    export let size: $$Props["size"] = "default";
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="square"
    stroke-linejoin="miter"
    class={cn(loadingVariants({ variant, size, className }))}
    {...$$restProps}
>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
</svg>
