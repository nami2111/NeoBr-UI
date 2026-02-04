<script lang="ts">
    import { cn } from "../../../utils";

    type Props = {
        class?: string;
        [key: string]: any;
    };

    let { class: className, ...rest }: Props = $props();
</script>

<div
    class={cn(
        "animate-pulse rounded-xs bg-muted/40 border-2 border-foreground/10",
        className,
    )}
    {...rest}
></div>
