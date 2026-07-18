<script lang="ts">
    import { getCommandState } from "./command-context";
    import { cn } from "../../../utils";
    import { Search01Icon } from "@hugeicons/core-free-icons";
    import Icon from "../icon/icon.svelte";

    import type { HTMLInputAttributes } from "svelte/elements";

    /** Search field for a `Command`. Updates the command's filter as the user types. */
    type Props = HTMLInputAttributes & {
        /** Additional classes for the input. */
        class?: string;
    };

    let {
        class: className,
        placeholder = "Type a command or search...",
        ...rest
    }: Props = $props();
    const state = getCommandState();

    function handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        state?.onSearch(target.value);
    }
</script>

<div
    class="flex items-center border-b-2 border-foreground px-3"
    data-cmdk-input-wrapper=""
>
    <Icon icon={Search01Icon} size={16} class="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <input
        class={cn(
            "flex h-12 w-full rounded-none bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className,
        )}
        {placeholder}
        oninput={handleInput}
        {...rest}
    />
</div>
