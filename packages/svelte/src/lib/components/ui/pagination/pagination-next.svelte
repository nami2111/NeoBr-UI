<script lang="ts">
    import { cn } from "../../../utils";
    import Icon from "../icon/icon.svelte";
    import PaginationLink from "./pagination-link.svelte";
    import { ChevronRight } from "@hugeicons/core-free-icons";

    type Props = {
        class?: string;
        href?: string;
        children?: import("svelte").Snippet;
    };

    let { class: className, children, ...rest }: Props = $props();
</script>

<PaginationLink
    aria-label="Go to next page"
    class={cn("gap-1 pr-2.5", className)}
    {...rest}
>
    <span>Next</span>
    <Icon icon={ChevronRight} class="h-4 w-4" />
</PaginationLink>
