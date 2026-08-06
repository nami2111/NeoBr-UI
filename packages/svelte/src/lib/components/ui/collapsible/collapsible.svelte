<script lang="ts">
    import { cn } from "../../../utils";
    import { setCollapsibleState } from "./collapsible-context";

    type Props = {
        /**
         * Open state. Bindable.
         * @default false
         */
        open?: boolean;
        /** Additional classes for the root. */
        class?: string;
        /** Trigger and content. */
        children?: import("svelte").Snippet;
        /**
         * Disables toggling.
         * @default false
         */
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
