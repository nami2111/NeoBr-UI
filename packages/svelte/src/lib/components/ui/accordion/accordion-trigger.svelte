<script lang="ts">
    import { Accordion } from "bits-ui";
    import { cn } from "../../../utils";
    import Icon from "../icon/icon.svelte";
    import { ChevronDown } from "@hugeicons/core-free-icons";

    type Props = Accordion.TriggerProps & {
        class?: string;
    };

    let { class: className, children, ...rest }: Props = $props();
</script>

<Accordion.Header class="flex">
    <Accordion.Trigger
        class={cn(
            "hover:bg-accent focus-visible:ring-ring group flex w-full cursor-pointer items-center justify-between px-4 py-4 text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:translate-y-[var(--press-brutalist-sm)] disabled:cursor-not-allowed disabled:opacity-50",
            "hover:border-foreground data-[state=open]:border-foreground border-b-2 border-transparent",
            className,
        )}
        {...rest}
    >
        {@render children?.()}
        <Icon
            icon={ChevronDown}
            strokeWidth={3}
            class="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
    </Accordion.Trigger>
</Accordion.Header>
