<script lang="ts" module>
    import { setContext, getContext } from "svelte";

    const COLLAPSIBLE_CONTEXT = Symbol("COLLAPSIBLE_CONTEXT");

    export function setCollapsibleState(state: {
        open: boolean;
        toggle: () => void;
        disabled: boolean;
    }) {
        setContext(COLLAPSIBLE_CONTEXT, state);
    }

    export function getCollapsibleState() {
        return getContext<{
            open: boolean;
            toggle: () => void;
            disabled: boolean;
        }>(COLLAPSIBLE_CONTEXT);
    }
</script>

<script lang="ts">
    import { cn } from "../../../utils";

    type Props = {
        open?: boolean;
        class?: string;
        children?: import("svelte").Snippet;
        disabled?: boolean;
    };

    let {
        open = $bindable(false),
        class: className,
        children,
        disabled = false,
        ...rest
    }: Props = $props();

    setCollapsibleState({
        get open() {
            return open;
        },
        set open(value) {
            open = value;
        },
        toggle: () => {
            if (!disabled) open = !open;
        },
        get disabled() {
            return disabled;
        },
    });
</script>

<div
    class={cn("w-full", className)}
    data-state={open ? "open" : "closed"}
    {...rest}
>
    {@render children?.()}
</div>
