<script lang="ts" module>
    import { setContext, getContext } from "svelte";

    const COMMAND_CONTEXT = Symbol("COMMAND_CONTEXT");

    export type CommandState = {
        search: string;
        visibleCount: number;
        onSearch: (value: string) => void;
        upsertItem: (id: string, value: string) => void;
        unregisterItem: (id: string) => void;
    };

    export function setCommandState(state: CommandState) {
        setContext(COMMAND_CONTEXT, state);
    }

    export function getCommandState() {
        return getContext<CommandState>(COMMAND_CONTEXT);
    }
</script>

<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement>;

    let { class: className, children, ...rest }: Props = $props();

    let search = $state("");
    let itemValues = $state<Record<string, string>>({});
    let normalizedSearch = $derived(search.trim().toLowerCase());
    let visibleCount = $derived(
        Object.values(itemValues).filter(
            (value) => !normalizedSearch || value.toLowerCase().includes(normalizedSearch),
        ).length,
    );

    setCommandState({
        get search() {
            return search;
        },
        get visibleCount() {
            return visibleCount;
        },
        onSearch: (value: string) => {
            search = value;
        },
        upsertItem: (id: string, value: string) => {
            itemValues[id] = value;
        },
        unregisterItem: (id: string) => {
            delete itemValues[id];
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
