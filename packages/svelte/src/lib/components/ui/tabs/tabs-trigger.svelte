<script lang="ts">
    import { cn } from "../../../utils";
    import { requireTabsState } from "./tabs-context";

    import type { HTMLButtonAttributes } from "svelte/elements";

    type Props = HTMLButtonAttributes & {
        /** Value of the tab this trigger activates. Must match a `TabsContent` value. */
        value: string;
    };

    let { value: triggerValue, class: className, children, ...rest }: Props = $props();

    const root = requireTabsState("TabsTrigger");

    let isActive = $derived(root.value === triggerValue);
    let triggerId = $derived(root.getTriggerId(triggerValue));
    let panelId = $derived(root.getPanelId(triggerValue));
</script>

<button
    type="button"
    class={cn(
        "rounded-brutalist ring-offset-background focus-visible:ring-ring inline-flex h-full items-center justify-center px-3 py-1.5 text-sm font-bold whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        isActive
            ? "bg-primary text-primary-foreground"
            : "hover:bg-accent hover:text-accent-foreground",
        className,
    )}
    onclick={() => (root.value = triggerValue)}
    aria-selected={isActive}
    aria-controls={panelId}
    role="tab"
    id={triggerId}
    tabindex={isActive ? 0 : -1}
    {...rest}
>
    {@render children?.()}
</button>
