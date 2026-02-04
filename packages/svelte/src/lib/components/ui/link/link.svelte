<script lang="ts">
    import type { HTMLAnchorAttributes } from "svelte/elements";
    import { cva, type VariantProps } from "class-variance-authority";
    import { cn } from "$lib/utils";

    const linkVariants = cva("font-medium underline-offset-4 hover:underline", {
        variants: {
            variant: {
                default: "text-primary",
                muted: "text-muted-foreground",
                destructive: "text-destructive",
            },
            brutalist: {
                true: "tracking-brutalist font-bold",
                false: "",
            },
        },
        defaultVariants: {
            variant: "default",
            brutalist: true,
        },
    });

    type $$Props = HTMLAnchorAttributes & VariantProps<typeof linkVariants>;

    let className: $$Props["class"] = undefined;
    export { className as class };
    export let variant: $$Props["variant"] = "default";
    export let brutalist: $$Props["brutalist"] = true;
</script>

<a class={cn(linkVariants({ variant, brutalist, className }))} {...$$restProps}>
    <slot />
</a>
