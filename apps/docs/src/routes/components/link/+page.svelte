<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Link } from "@neobr/svelte";

    const variants = `<Link href="#">Default Link</Link>
<Link variant="primary" href="#">Primary Link</Link>
<Link variant="secondary" href="#">Secondary Link</Link>
<Link variant="muted" href="#">Muted Link</Link>`;
</script>

<DocPage title="Link" description="A text link with neo-brutalist styling.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Variants</h2>
            <CodePreview code={variants}>
                <div class="flex flex-col gap-4">
                    <Link href="#">Default Link</Link>
                    <Link variant="primary" href="#">Primary Link</Link>
                    <Link variant="secondary" href="#">Secondary Link</Link>
                    <Link variant="muted" href="#">Muted Link</Link>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
