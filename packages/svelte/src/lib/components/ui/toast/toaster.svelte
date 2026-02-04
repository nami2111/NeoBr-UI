<script lang="ts">
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import { toast } from "./toast.svelte.ts";
    import Toast from "./toast.svelte";
</script>

<div
    class="pointer-events-none fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] gap-4"
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
