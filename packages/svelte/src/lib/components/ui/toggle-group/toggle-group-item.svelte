<script lang="ts">
    import { cn } from "../../../utils";
    import { requireToggleGroupState } from "./toggle-group-context";
    import Toggle from "../toggle/toggle.svelte";

    import type { HTMLButtonAttributes } from "svelte/elements";

    type Props = HTMLButtonAttributes & {
        /** Value of this item, emitted in the group's `value`. */
        value: string;
    };

    let { value, class: className, children, ...rest }: Props = $props();

    const context = requireToggleGroupState();

    const pressed = $derived(
        context.type === "single"
            ? context.value === value
            : Array.isArray(context.value) && context.value.includes(value),
    );

    function handleToggle() {
        context.setValue(value);
    }
</script>

<Toggle {pressed} onclick={handleToggle} class={cn(className)} {...rest}>
    {@render children?.()}
</Toggle>
