<script lang="ts">
    import { getContext } from "svelte";
    import { cn } from "../../../utils";

    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        value: string;
    };

    let { value: contentValue, class: className, children, ...rest }: Props = $props();

    const TABS_CONTEXT = Symbol.for("tabs");

    const root = getContext<{
        value: string | undefined;
    }>(TABS_CONTEXT);

    if (!root) {
        throw new Error("TabsContent must be used within Tabs");
    }

    let isActive = $derived(root.value === contentValue);
</script>

<div
    class={cn(
        "ring-offset-background focus-visible:ring-ring mt-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        !isActive && "hidden",
        className,
    )}
    role="tabpanel"
    aria-labelledby={`trigger-${contentValue}`}
    id={`tabpanel-${contentValue}`}
    tabindex="0"
    hidden={!isActive}
    {...rest}
>
    {@render children?.()}
</div>
