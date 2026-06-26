<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Sticker, Card, CardContent } from "@neobr/svelte";

    const variants = `<Sticker variant="default">NEW</Sticker>
<Sticker variant="primary">HOT</Sticker>
<Sticker variant="secondary">SALE</Sticker>
<Sticker variant="success">FREE</Sticker>
<Sticker variant="warning">ALERT</Sticker>
<Sticker variant="destructive">BOLD</Sticker>`;

    const fixedRotation = `<Sticker rotation={15}>ROTATED 15°</Sticker>
<Sticker rotation={-10} variant="primary">ROTATED -10°</Sticker>`;

    const cardExample = `<Card class="relative max-w-sm">
    <Sticker class="absolute -top-3 -right-3 z-10" variant="secondary">FEATURED</Sticker>
    <CardContent class="pt-6">
        <h3 class="text-xl font-black">Neo-Brutalism</h3>
        <p class="text-muted-foreground">The beauty of being bold and raw.</p>
    </CardContent>
</Card>`;
</script>

<DocPage
    title="Sticker"
    description="A decorative badge-like component with random or fixed rotation."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={variants}>
                <div class="flex flex-wrap items-center gap-6">
                    <Sticker variant="default">NEW</Sticker>
                    <Sticker variant="primary">HOT</Sticker>
                    <Sticker variant="secondary">SALE</Sticker>
                    <Sticker variant="success">FREE</Sticker>
                    <Sticker variant="warning">ALERT</Sticker>
                    <Sticker variant="destructive">BOLD</Sticker>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Shapes</h2>
            <CodePreview
                code={`<Sticker shape="rectangle">Rectangle</Sticker>
<Sticker shape="pill" variant="primary">Pill Shape</Sticker>
<Sticker shape="circle" variant="secondary">Circular</Sticker>
<Sticker shape="tape" variant="success">Tape Style</Sticker>
<Sticker shape="jagged" variant="destructive">Jagged Edge</Sticker>`}
            >
                <div class="flex flex-wrap items-center gap-8 py-4">
                    <Sticker shape="rectangle">Rectangle</Sticker>
                    <Sticker shape="pill" variant="primary">Pill Shape</Sticker>
                    <Sticker shape="circle" variant="secondary">ROUND</Sticker>
                    <Sticker shape="tape" variant="success">Tape Style</Sticker>
                    <Sticker shape="jagged" variant="destructive">Jagged Edge</Sticker>
                    <Sticker shape="star" variant="warning">STAR BURST</Sticker>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Fixed Rotation</h2>
            <CodePreview code={fixedRotation}>
                <div class="flex flex-wrap items-center gap-8 py-4">
                    <Sticker rotation={15}>ROTATED 15°</Sticker>
                    <Sticker rotation={-10} variant="primary">ROTATED -10°</Sticker>
                    <Sticker rotation={0} variant="success">NO ROTATION</Sticker>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Composition</h2>
            <CodePreview code={cardExample}>
                <Card class="relative max-w-sm">
                    <Sticker class="absolute -top-3 -right-3 z-10" variant="secondary"
                        >FEATURED</Sticker
                    >
                    <CardContent class="pt-6">
                        <h3 class="text-xl font-black italic">Neo-Brutalism</h3>
                        <p class="text-muted-foreground mt-2">
                            The beauty of being bold and raw in digital design.
                        </p>
                    </CardContent>
                </Card>
            </CodePreview>
        </section>
    </div>
</DocPage>
