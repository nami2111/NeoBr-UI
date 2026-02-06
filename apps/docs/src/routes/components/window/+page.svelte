<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Window, Button } from "@neobr/svelte";

    const basicUsage = `<Window title="Terminal">
    <p class="font-mono text-sm">cody@neobr:~$ neo-brutalist install</p>
    <p class="font-mono text-sm text-success">Success! Library installed.</p>
</Window>`;

    const customControls = `<Window 
    title="Minimal Popup" 
    minimizable={false} 
    maximizable={false}
>
    <p>This window only has a close button.</p>
</Window>`;
</script>

<DocPage title="Window" description="A container component that mimics a classic OS window.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Retro Window</h2>
            <CodePreview code={basicUsage}>
                <Window title="Terminal" class="max-w-md">
                    <div class="space-y-2">
                        <p class="font-mono text-sm">cody@neobr:~$ neo-brutalist install</p>
                        <p class="text-success font-mono text-sm">Success! Library installed.</p>
                        <Button size="sm" class="mt-4">Run Build</Button>
                    </div>
                </Window>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Custom Controls</h2>
            <CodePreview code={customControls}>
                <div class="flex flex-wrap gap-8">
                    <Window title="No Minimize" minimizable={false} class="max-w-xs">
                        <p>Minimize button is hidden.</p>
                    </Window>
                    <Window
                        title="No Controls"
                        closable={false}
                        minimizable={false}
                        maximizable={false}
                        class="max-w-xs"
                    >
                        <p>All controls are hidden.</p>
                    </Window>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
