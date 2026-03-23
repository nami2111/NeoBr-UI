<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement>;

    let { class: className, children, ...rest }: Props = $props();
</script>

<div
    class={cn("max-h-[300px] overflow-y-auto overflow-x-hidden p-2", className)}
    {...rest}
>
    {@render children?.()}
</div>
