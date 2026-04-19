<script lang="ts" module>
    import { setContext, getContext } from "svelte";

    const COMMAND_CONTEXT = Symbol("COMMAND_CONTEXT");

    export function setCommandState(state: {
        search: string;
        onSearch: (value: string) => void;
    }) {
        setContext(COMMAND_CONTEXT, state);
    }

    export function getCommandState() {
        return getContext<{
            search: string;
            onSearch: (value: string) => void;
        }>(COMMAND_CONTEXT);
    }
</script>

<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement>;

    let { class: className, children, ...rest }: Props = $props();

    let search = $state("");

    setCommandState({
        get search() {
            return search;
        },
        onSearch: (value: string) => {
            search = value;
        },
    });
</script>

<div
    class={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-brutalist bg-background text-foreground border-2 border-foreground shadow-brutalist",
        className,
    )}
    {...rest}
>
    {@render children?.()}
</div>
