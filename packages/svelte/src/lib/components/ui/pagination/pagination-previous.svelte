<script lang="ts">
    import { cn } from "../../../utils";
    import Icon from "../icon/icon.svelte";
    import PaginationLink from "./pagination-link.svelte";
    import { ChevronLeft } from "@hugeicons/core-free-icons";

    /** Link to the previous page. */
    type Props = {
        /** Additional classes. */
        class?: string;
        /** Destination URL for the previous page. */
        href?: string;
        /** Custom label content; defaults to a chevron. */
        children?: import("svelte").Snippet;
    };

    let { class: className, children, ...rest }: Props = $props();
</script>

<PaginationLink
    aria-label="Go to previous page"
    class={cn("gap-1 pl-2.5", className)}
    {...rest}
>
    <Icon icon={ChevronLeft} class="h-4 w-4" />
    <span>Previous</span>
</PaginationLink>
