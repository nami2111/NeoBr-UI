<script lang="ts">
    import { cn } from "../../../utils";
    import { Button } from "../button";
    import type { HTMLButtonAttributes } from "svelte/elements";

    type Props = HTMLButtonAttributes & {
        isActive?: boolean;
        href?: string;
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
