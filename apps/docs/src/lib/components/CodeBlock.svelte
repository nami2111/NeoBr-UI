<script lang="ts">
    import { Button, Icon } from "@neobr/svelte";
    import { Copy01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";

    interface Props {
        code: string;
    }

    let { code }: Props = $props();
    let copied = $state(false);

    async function copyToClipboard() {
        await navigator.clipboard.writeText(code);
        copied = true;
        setTimeout(() => (copied = false), 2000);
    }
</script>

<div class="group relative">
    <Button
        variant="outline"
        size="sm"
        onclick={copyToClipboard}
        class="absolute top-2 right-2 gap-2 opacity-100 transition-opacity md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100"
        style="z-index: 1"
        aria-label={copied ? "Copied code" : "Copy code"}
    >
        <Icon icon={copied ? CheckmarkCircle02Icon : Copy01Icon} class="h-4 w-4" />
        {copied ? "Copied!" : "Copy"}
    </Button>
    <pre
        class="border-foreground bg-muted text-foreground min-h-24 overflow-x-auto rounded-none border-2 p-6 pt-14 font-mono text-sm leading-relaxed shadow-[0_5px_0_0_var(--color-shadow-color)] md:pt-6"
    ><code>{code}</code></pre>
</div>
