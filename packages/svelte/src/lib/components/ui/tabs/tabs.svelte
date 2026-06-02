<script lang="ts">
    import { cn } from "../../../utils";
    import { setTabsState } from "./tabs-context";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        value?: string;
    };

    let { value = $bindable(undefined), class: className, children, ...rest }: Props = $props();

    const tabsId = $props.id();

    function tabIdPart(tabValue: string) {
        return tabValue.replace(/\s+/g, "-");
    }

    setTabsState({
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
