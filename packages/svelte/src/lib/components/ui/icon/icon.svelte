<script lang="ts">
    import type { ComponentType } from "svelte";
    import { cn } from "../../../utils";

    type Props = {
        icon: ComponentType;
        size?: number | string;
        color?: string;
        class?: string;
        [key: string]: any;
    };

    let {
        icon: IconComponent,
        size = 24,
        color = undefined,
        class: className,
        ...rest
    }: Props = $props();
</script>

<IconComponent
    {size}
    {color}
    class={cn("inline-block shrink-0", className)}
    {...rest}
/>
