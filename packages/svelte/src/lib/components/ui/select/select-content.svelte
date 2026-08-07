<script lang="ts">
    import { Select } from "bits-ui";
    import { fly } from "svelte/transition";
    import { cn } from "../../../utils";
    import { TRANSITION_POPUP } from "../../../utils/motion";

    /** Dropdown panel holding the select's items. */
    type Props = Select.ContentProps & {
        /** Additional classes for the content panel. */
        class?: string;
    };

    let { class: className, children, ...rest }: Props = $props();
</script>

<Select.Content
    class={cn(
        "bg-card border-foreground shadow-brutalist rounded-brutalist text-foreground absolute min-w-[8rem] overflow-hidden border-2 p-1",
        className,
    )}
    sideOffset={8}
    {...rest}
>
    <!-- The animated wrapper sits INSIDE the bits-ui layer so the scale/fade
         transition runs while the panel is mounted. bits-ui's popper layer
         has no transition of its own; the old CSS `animate-fade-in` class
         animated in only (no out) and at 0.3s didn't match the popup family. -->
    <div transition:fly={TRANSITION_POPUP()} class="max-h-60 overflow-y-auto">
        {@render children?.()}
    </div>
</Select.Content>
