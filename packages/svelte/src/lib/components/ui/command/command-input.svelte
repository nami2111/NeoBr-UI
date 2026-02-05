<script lang="ts">
    import { getCommandState } from "./command.svelte";
    import { cn } from "../../../utils";
    import Icon from "../icon/icon.svelte";

    type Props = {
        class?: string;
        placeholder?: string;
        [key: string]: any;
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
    <div class="mr-2 h-4 w-4 shrink-0 opacity-50">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg
        >
    </div>
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
