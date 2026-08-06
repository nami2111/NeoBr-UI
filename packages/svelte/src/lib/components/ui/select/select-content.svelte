<script lang="ts">
    import { Select } from "bits-ui";
    import { cn } from "../../../utils";

    /** Dropdown panel holding the select's items. */
    type Props = Select.ContentProps & {
        /** Additional classes for the content panel. */
        class?: string;
    };

    let { class: className, children, ...rest }: Props = $props();
</script>

<Select.Content
    class={cn(
        "bg-card border-foreground shadow-brutalist rounded-brutalist text-foreground animate-fade-in absolute min-w-[8rem] overflow-hidden border-2 p-1",
        className,
    )}
    sideOffset={8}
    {...rest}
>
    <div class="max-h-60 overflow-y-auto">
        {@render children?.()}
    </div>
</Select.Content>
