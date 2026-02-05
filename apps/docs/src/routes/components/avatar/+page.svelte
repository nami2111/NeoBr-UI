<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Avatar } from "@neobr/svelte";

    const usage = `<Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" alt="User" />
<Avatar fallback="JD" />
<Avatar alt="Nami" />`;

    const sizes = `<Avatar size="sm" fallback="SM" />
<Avatar size="md" fallback="MD" />
<Avatar size="lg" fallback="LG" />
<Avatar size="xl" fallback="XL" />`;

    const shapes = `<Avatar shape="circle" fallback="C" />
<Avatar shape="square" fallback="S" />`;
</script>

<DocPage title="Avatar" description="An image element with a fallback for representing the user.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <div class="flex items-center gap-4">
                    <Avatar
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
                        alt="User"
                    />
                    <Avatar fallback="JD" />
                    <Avatar alt="Nami" />
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Sizes</h2>
            <CodePreview code={sizes}>
                <div class="flex items-center gap-4">
                    <Avatar size="sm" fallback="SM" />
                    <Avatar size="md" fallback="MD" />
                    <Avatar size="lg" fallback="LG" />
                    <Avatar size="xl" fallback="XL" />
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Shapes</h2>
            <CodePreview code={shapes}>
                <div class="flex items-center gap-4">
                    <Avatar shape="circle" fallback="C" />
                    <Avatar shape="square" fallback="S" />
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
