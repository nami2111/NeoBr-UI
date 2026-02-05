<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { AspectRatio } from "@neobr/svelte";

    const sixteenByNine = `<AspectRatio ratio={16 / 9} class="bg-muted border-4 border-foreground">
    <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcd57f7dcc?w=800&dpr=2&q=80"
        alt="Abstract artwork"
        class="h-full w-full object-cover"
    />
</AspectRatio>`;
</script>

<DocPage title="Aspect Ratio" description="Displays content within a desired ratio.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={sixteenByNine}>
                <div class="w-full max-w-md">
                    <AspectRatio
                        ratio={16 / 9}
                        class="bg-muted border-foreground rounded-brutalist overflow-hidden border-4"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1588345921523-c2dcd57f7dcc?w=800&dpr=2&q=80"
                            alt="Abstract artwork"
                            class="h-full w-full object-cover"
                        />
                    </AspectRatio>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
