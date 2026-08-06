<script lang="ts">
    import { cn } from "../../../utils";
    import { setToggleGroupState, type ToggleGroupType } from "./toggle-group-context";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        /** Selected value(s). A string for single mode, an array for multiple. Bindable. */
        value?: string | string[];
        /**
         * Selection mode.
         * @default "single"
         */
        type?: ToggleGroupType;
    };

    let {
        value = $bindable(undefined),
        type = "single",
        class: className,
        children,
        ...rest
    }: Props = $props();

    setToggleGroupState({
        get value() {
            return value ?? (type === "multiple" ? [] : "");
        },
        get type() {
            return type;
        },
        setValue: (nextValue: string) => {
            if (type === "single") {
                value = value === nextValue ? "" : nextValue;
            } else {
                const selectedValues = Array.isArray(value) ? value : [];

                if (selectedValues.includes(nextValue)) {
                    value = selectedValues.filter((item) => item !== nextValue);
                } else {
                    value = [...selectedValues, nextValue];
                }
            }
        },
    });
</script>

<div class={cn("flex items-center justify-center gap-1", className)} {...rest}>
    {@render children?.()}
</div>
