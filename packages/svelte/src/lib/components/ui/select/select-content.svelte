<script lang="ts">
    import { Select } from "bits-ui";
    import { cn } from "../../../utils";

    type Props = Select.ContentProps & {
        class?: string;
    };

    let { class: className, children, ...rest }: Props = $props();
</script>

<Select.Content
    class={cn(
        "card-brutalist text-foreground animate-fade-in shadow-brutalist absolute min-w-[8rem] overflow-hidden p-1",
        className,
    )}
    sideOffset={8}
    {...rest}
>
    <div class="max-h-60 overflow-y-auto">
        {@render children?.()}
    </div>
</Select.Content>
