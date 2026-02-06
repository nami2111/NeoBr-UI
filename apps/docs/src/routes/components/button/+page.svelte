<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Button, Icon } from "@neobr/svelte";
    import { Settings01Icon } from "@hugeicons/core-free-icons";

    const basicUsage = `<Button>Default Button</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`;

    const sizes = `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
    <Icon icon={Settings01Icon} class="h-5 w-5" />
</Button>`;

    const linkExample = `<Button href="#">
    Link Button
</Button>`;

    const brutalistExample = `<Button brutalist={false}>Rounded Button</Button>`;
</script>

<DocPage title="Button" description="Displays a button or a component that looks like a button.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Variants</h2>
            <CodePreview code={basicUsage}>
                <div class="flex flex-wrap gap-4">
                    <Button>Default Button</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Sizes</h2>
            <CodePreview code={sizes}>
                <div class="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                        <Icon icon={Settings01Icon} class="h-5 w-5" />
                    </Button>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">As Link</h2>
            <CodePreview code={linkExample}>
                <Button href="#">Link Button</Button>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Brutalist Prop</h2>
            <CodePreview code={brutalistExample}>
                <div class="flex flex-wrap gap-4">
                    <Button brutalist={true}>Brutalist</Button>
                    <Button brutalist={false}>Rounded</Button>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
