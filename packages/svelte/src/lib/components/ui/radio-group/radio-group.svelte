<script lang="ts">
    import { cn } from "../../../utils";
    import { setRadioGroupState } from "./radio-group-context";
    import type { HTMLAttributes } from "svelte/elements";

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

    setRadioGroupState({
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
