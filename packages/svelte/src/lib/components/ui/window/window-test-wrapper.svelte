<script lang="ts">
    import Window from "./window.svelte";

    let {
        title = "Window",
        closable = true,
        minimizable = true,
        maximizable = true,
        onClose = undefined,
        class: className = undefined,
    }: {
        title?: string;
        closable?: boolean;
        minimizable?: boolean;
        maximizable?: boolean;
        onClose?: () => void;
        class?: string;
    } = $props();
</script>

<Window {title} {closable} {minimizable} {maximizable} {onClose} class={className}>
    Window content here
</Window>
