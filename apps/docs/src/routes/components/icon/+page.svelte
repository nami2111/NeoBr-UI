<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Icon, Button, Card, CardContent } from "@neobr/svelte";
    import {
        Home01Icon,
        Settings01Icon,
        Search01Icon,
        Notification01Icon,
        Download01Icon,
        Github01Icon,
    } from "@hugeicons/core-free-icons";

    const closingScript = `<${"/"}script>`;

    const basicUsage = `<script lang="ts">
    import { Icon } from "@neobr/svelte";
    import { Home01Icon } from "@hugeicons/core-free-icons";
${closingScript}

<Icon icon={Home01Icon} />`;

    const sizes = `<Icon icon={Home01Icon} size={16} />
<Icon icon={Home01Icon} size={24} />
<Icon icon={Home01Icon} size={32} />
<Icon icon={Home01Icon} size={40} />`;

    const buttonUsage = `<Button size="icon" aria-label="Settings">
    <Icon icon={Settings01Icon} class="h-5 w-5" />
</Button>`;

    const strokeUsage = `<Icon icon={Download01Icon} strokeWidth={1} />
<Icon icon={Download01Icon} strokeWidth={2} />
<Icon icon={Download01Icon} strokeWidth={3} />`;
</script>

<DocPage
    title="Icon"
    description="A typed wrapper around HugeIcons for consistent sizing, color, and utility-class composition."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={basicUsage}>
                <div class="flex items-center gap-5">
                    <Icon icon={Home01Icon} />
                    <Icon icon={Search01Icon} />
                    <Icon icon={Notification01Icon} />
                    <Icon icon={Github01Icon} />
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Sizes</h2>
            <CodePreview code={sizes}>
                <div class="flex items-end gap-5">
                    <Icon icon={Home01Icon} size={16} />
                    <Icon icon={Home01Icon} size={24} />
                    <Icon icon={Home01Icon} size={32} />
                    <Icon icon={Home01Icon} size={40} />
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Button Icon</h2>
            <CodePreview code={buttonUsage}>
                <div class="flex items-center gap-4">
                    <Button size="icon" aria-label="Settings">
                        <Icon icon={Settings01Icon} class="h-5 w-5" />
                    </Button>
                    <Button variant="secondary" class="gap-2">
                        <Icon icon={Download01Icon} class="h-5 w-5" />
                        Download
                    </Button>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Stroke Width</h2>
            <CodePreview code={strokeUsage}>
                <Card class="max-w-sm">
                    <CardContent class="flex items-center justify-center gap-6 p-8">
                        <Icon icon={Download01Icon} strokeWidth={1} size={32} />
                        <Icon icon={Download01Icon} strokeWidth={2} size={32} />
                        <Icon icon={Download01Icon} strokeWidth={3} size={32} />
                    </CardContent>
                </Card>
            </CodePreview>
        </section>
    </div>
</DocPage>
