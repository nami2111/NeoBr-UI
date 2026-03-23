<script lang="ts">
    import { setContext } from "svelte";
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    const RADIO_CONTEXT = Symbol.for("radio-group");

    type Props = HTMLAttributes<HTMLDivElement> & {
        value?: string;
        disabled?: boolean;
        name?: string;
    };

    let {
        value = $bindable(),
        disabled = false,
        class: className,
        children,
        name,
        ...rest
    }: Props = $props();

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
