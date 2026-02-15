<script lang="ts">
    import Modal from "./modal.svelte";

    let {
        open = $bindable(false),
        title,
        size,
        onClose,
    }: { open?: boolean; title?: string; size?: any; onClose?: () => void } = $props();
</script>

<Modal bind:open {title} {size} {onClose}>
    <p>Modal Content</p>
    <button>Inside Button</button>
</Modal>
