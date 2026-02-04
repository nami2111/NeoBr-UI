<script lang="ts">
    import { cn } from "$lib/utils";
    import type { HTMLFormAttributes } from "svelte/elements";

    type $$Props = HTMLFormAttributes;

    let className: string | undefined = undefined;
    export { className as class };
</script>

<form class={cn("space-y-4", className)} {...$$restProps} on:submit>
    <slot />
</form>
