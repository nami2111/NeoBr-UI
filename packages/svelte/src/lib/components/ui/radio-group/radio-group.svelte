<script lang="ts">
    import { setContext } from "svelte";
    import { cn } from "../../../utils";

    type Props = {
        value?: string;
        disabled?: boolean;
        class?: string;
        children?: import("svelte").Snippet;
        name?: string;
        [key: string]: any;
    };

    let {
        value = $bindable(),
        disabled = false,
        class: className,
        children,
        name,
        ...rest
    }: Props = $props();

    const RADIO_CONTEXT = "radio-group";

    setContext(RADIO_CONTEXT, {
        get value() {
            return value;
        },
        set value(v: string | undefined) {
            value = v;
        },
        get disabled() {
            return disabled;
        },
        get name() {
            return name;
        },
    });
</script>

<div role="radiogroup" class={cn("grid gap-2", className)} {...rest}>
    {@render children?.()}
</div>
