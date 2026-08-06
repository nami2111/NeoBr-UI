<script lang="ts">
    import { cn, RADIUS, type Radius } from "../../../utils";
    import { setCommandState } from "./command-context";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        /**
         * Corner radius: brutalist (sharp), soft (6px), or rounded (12px).
         * @default "brutalist"
         */
        radius?: Radius;
    };

    let { class: className, children, radius = "brutalist", ...rest }: Props = $props();

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
        "flex h-full w-full flex-col overflow-hidden bg-background text-foreground border-2 border-foreground shadow-brutalist",
        RADIUS[radius],
        className,
    )}
    {...rest}
>
    {@render children?.()}
</div>
