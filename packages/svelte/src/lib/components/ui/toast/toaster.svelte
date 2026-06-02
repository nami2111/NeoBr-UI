<script lang="ts">
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import { toast } from "./toast-state.svelte.js";
    import Toast from "./toast.svelte";
</script>

<div
    class="pointer-events-none fixed right-0 bottom-0 flex max-h-screen w-full flex-col-reverse gap-4 p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]"
    style="z-index: var(--z-toast)"
>
    {#each toast.toasts as item (item.id)}
        <div
            animate:flip={{ duration: 300 }}
            in:fly={{ x: 100, duration: 300 }}
            out:fly={{ x: 100, duration: 200 }}
        >
            <Toast {item} />
        </div>
    {/each}
</div>
