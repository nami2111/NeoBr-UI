<script lang="ts">
    import { setContext } from "svelte";
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        value?: string;
    };

    let { value = $bindable(undefined), class: className, children, ...rest }: Props = $props();

    const TABS_CONTEXT = Symbol.for("tabs");
    const tabsId = $props.id();

    function tabIdPart(tabValue: string) {
        return tabValue.replace(/\s+/g, "-");
    }

    setContext(TABS_CONTEXT, {
        get value() {
            return value;
        },
        set value(v: string | undefined) {
            value = v;
        },
        getTriggerId: (tabValue: string) => `${tabsId}-trigger-${tabIdPart(tabValue)}`,
        getPanelId: (tabValue: string) => `${tabsId}-tabpanel-${tabIdPart(tabValue)}`,
    });
</script>

<div class={cn("w-full", className)} {...rest}>
    {@render children?.()}
</div>
