<script lang="ts">
    import Modal from "./modal.svelte";
    import type { ComponentProps } from "svelte";

    type Props = Pick<ComponentProps<typeof Modal>, "title" | "size" | "onClose"> & {
        open?: boolean;
    };

    let { open = $bindable(false), title, size, onClose }: Props = $props();
</script>

<Modal bind:open {title} {size} {onClose}>
    <p>Modal Content</p>
    <button>Inside Button</button>
</Modal>
