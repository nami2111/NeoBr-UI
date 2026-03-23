<script lang="ts">
    import { setContext } from "svelte";
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        value?: string | string[];
        type?: "single" | "multiple";
    };

    let {
        value = $bindable(undefined),
        type = "single",
        class: className,
        children,
        ...rest
    }: Props = $props();

    if (value === undefined) {
        // svelte-ignore state_referenced_locally
        value = type === "multiple" ? [] : "";
    }

    const TOGGLE_GROUP_CONTEXT = Symbol.for("toggle-group");

    setContext(TOGGLE_GROUP_CONTEXT, {
        get value() {
            return value;
        },
        get type() {
            return type;
        },
        setValue: (v: string) => {
            const currentType = type;
            if (currentType === "single") {
                value = value === v ? "" : v;
            } else if (Array.isArray(value)) {
                if (value.includes(v)) {
                    value = value.filter((i) => i !== v);
                } else {
                    value = [...value, v];
                }
            }
        },
    });
</script>

<div class={cn("flex items-center justify-center gap-1", className)} {...rest}>
    {@render children?.()}
</div>
