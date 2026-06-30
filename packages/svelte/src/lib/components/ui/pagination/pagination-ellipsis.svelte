<script lang="ts">
    import { cn } from "../../../utils";
    import Icon from "../icon/icon.svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";

    type Props = HTMLAttributes<HTMLSpanElement>;

    let { class: className, ...rest }: Props = $props();
</script>

<span
    aria-hidden="true"
    class={cn("flex h-9 w-9 items-center justify-center font-bold", className)}
    {...rest}
>
    <Icon icon={MoreHorizontalIcon} class="h-4 w-4" />
    <span class="sr-only">More pages</span>
</span>
