<script lang="ts">
    import { getContext } from "svelte";
    import { cn } from "../../../utils";
    import Toggle from "../toggle/toggle.svelte";

    type Props = {
        value: string;
        class?: string;
        children?: import("svelte").Snippet;
        [key: string]: any;
    };

    let { value, class: className, children, ...rest }: Props = $props();

    const context = getContext<any>("toggle-group");

    const pressed = $derived(
        context.type === "single"
            ? context.value === value
            : context.value.includes(value),
    );

    function handleToggle() {
        context.setValue(value);
    }
</script>

<Toggle {pressed} onclick={handleToggle} class={cn(className)} {...rest}>
    {@render children?.()}
</Toggle>
