<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Badge } from "@neobr/svelte";

    const variants = `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`;

    const brutalist = `<Badge brutalist={true}>Brutalist</Badge>
<Badge brutalist={false}>Rounded</Badge>`;
</script>

<DocPage title="Badge" description="Displays a badge or a component that looks like a badge.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={variants}>
                <div class="flex flex-wrap gap-4">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Brutalist Style</h2>
            <CodePreview code={brutalist}>
                <div class="flex flex-wrap gap-4">
                    <Badge brutalist={true}>Brutalist</Badge>
                    <Badge brutalist={false}>Rounded</Badge>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
