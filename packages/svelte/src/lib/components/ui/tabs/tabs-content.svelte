<script lang="ts">
    import { cn } from "../../../utils";
    import { requireTabsState } from "./tabs-context";

    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        /** Value of the tab this panel belongs to. Must match a `TabsTrigger` value. */
        value: string;
    };

    let { value: contentValue, class: className, children, ...rest }: Props = $props();

    const root = requireTabsState("TabsContent");

    let isActive = $derived(root.value === contentValue);
    let triggerId = $derived(root.getTriggerId(contentValue));
    let panelId = $derived(root.getPanelId(contentValue));
</script>

<div
    class={cn(
        "ring-offset-background focus-visible:ring-ring mt-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        !isActive && "hidden",
        className,
    )}
    role="tabpanel"
    aria-labelledby={triggerId}
    id={panelId}
    tabindex="0"
    hidden={!isActive}
    {...rest}
>
    {@render children?.()}
</div>
