<script lang="ts">
    import { cn } from "../../../utils";
    import PaginationLink from "./pagination-link.svelte";

    type Props = {
        class?: string;
        [key: string]: any;
    };

    let { class: className, ...rest }: Props = $props();
</script>

<PaginationLink
    aria-label="Go to next page"
    class={cn("gap-1 pr-2.5", className)}
    {...rest}
>
    <span>Next</span>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4"
    >
        <polyline points="9 18 15 12 9 6" />
    </svg>
</PaginationLink>
