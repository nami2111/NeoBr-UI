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
        class="absolute right-2 top-2 z-10 gap-2 opacity-0 transition-opacity group-hover:opacity-100"
    >
        <Icon icon={copied ? CheckmarkCircle02Icon : Copy01Icon} class="h-4 w-4" />
        {copied ? "Copied!" : "Copy"}
    </Button>
    <pre class="border-foreground bg-muted text-foreground overflow-x-auto rounded-none border-2 p-6 font-mono text-sm leading-relaxed">
<code>{code}</code>
    </pre>
</div>