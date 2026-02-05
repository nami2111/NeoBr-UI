<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Separator } from "@neobr/svelte";

    const usage = `<div>
    <div class="space-y-1">
        <h4 class="text-sm font-black leading-none uppercase">NeoBr UI</h4>
        <p class="text-sm text-muted-foreground font-medium italic">
            An open-source UI component library.
        </p>
    </div>
    <Separator class="my-4" />
    <div class="flex h-5 items-center space-x-4 text-sm font-bold uppercase">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
    </div>
</div>`;
</script>

<DocPage title="Separator" description="Visually or semantically separates content.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <div>
                    <div class="space-y-1">
                        <h4 class="text-sm leading-none font-black tracking-tighter uppercase">
                            NeoBr UI
                        </h4>
                        <p class="text-muted-foreground text-sm font-medium italic">
                            An open-source UI component library.
                        </p>
                    </div>
                    <Separator class="my-4" />
                    <div
                        class="flex h-5 items-center space-x-4 text-sm font-bold tracking-tighter uppercase"
                    >
                        <div>Blog</div>
                        <Separator orientation="vertical" />
                        <div>Docs</div>
                        <Separator orientation="vertical" />
                        <div>Source</div>
                    </div>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
