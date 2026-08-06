<script lang="ts">
    /**
     * Mounts the toast viewport. Place once near your app root; renders all active toasts
     * from the shared `toast` store (see `toast/toast-state.svelte.js`).
     */
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import {
        TRANSITION_BRUTALIST_BACKDROP,
        TRANSITION_BRUTALIST_SLOW,
    } from "../../../utils/motion";
    import { toast } from "./toast-state.svelte.js";
    import Toast from "./toast.svelte";
</script>

<div
    class="z-toast pointer-events-none fixed right-0 bottom-0 flex max-h-screen w-full flex-col-reverse gap-4 p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]"
>
    {#each toast.toasts as item (item.id)}
        <div
            animate:flip={TRANSITION_BRUTALIST_SLOW()}
            in:fly={{ x: 100, ...TRANSITION_BRUTALIST_SLOW() }}
            out:fly={{ x: 100, ...TRANSITION_BRUTALIST_BACKDROP() }}
        >
            <Toast {item} />
        </div>
    {/each}
</div>
