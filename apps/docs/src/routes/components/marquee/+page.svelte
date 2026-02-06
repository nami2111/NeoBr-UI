<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Marquee, Badge } from "@neobr/svelte";

    const basicUsage = `<Marquee>
    <span class="mx-4 text-2xl font-black italic">NEO-BRUTALISM IS BOLD.</span>
    <span class="mx-4 text-2xl font-black italic">REJECT THE POLISHED.</span>
    <span class="mx-4 text-2xl font-black italic">EMBRACE THE RAW.</span>
</Marquee>`;

    const speedAndDirection = `<Marquee speed={10} direction="right">
    <Badge class="mx-2">FAST & RIGHT</Badge>
    <Badge class="mx-2">FAST & RIGHT</Badge>
    <Badge class="mx-2">FAST & RIGHT</Badge>
</Marquee>`;

    const pauseOnHover = `<Marquee pauseOnHover={true} speed={30}>
    <span class="mx-4 text-xl font-bold">HOVER OVER ME TO PAUSE THE MOTION</span>
</Marquee>`;
</script>

<DocPage title="Marquee" description="A scrolling ticker component for bold messaging.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Basic Usage</h2>
            <CodePreview code={basicUsage}>
                <Marquee class="bg-primary py-4">
                    <span class="text-primary-foreground mx-4 text-2xl font-black italic"
                        >NEO-BRUTALISM IS BOLD.</span
                    >
                    <span class="text-primary-foreground mx-4 text-2xl font-black italic"
                        >REJECT THE POLISHED.</span
                    >
                    <span class="text-primary-foreground mx-4 text-2xl font-black italic"
                        >EMBRACE THE RAW.</span
                    >
                </Marquee>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Speed & Direction</h2>
            <CodePreview code={speedAndDirection}>
                <Marquee speed={10} direction="right" class="bg-secondary py-2">
                    <Badge class="mx-2">FAST & RIGHT</Badge>
                    <Badge class="mx-2">FAST & RIGHT</Badge>
                    <Badge class="mx-2">FAST & RIGHT</Badge>
                    <Badge class="mx-2">FAST & RIGHT</Badge>
                    <Badge class="mx-2">FAST & RIGHT</Badge>
                </Marquee>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Pause on Hover</h2>
            <CodePreview code={pauseOnHover}>
                <Marquee pauseOnHover={true} speed={30} class="border-foreground border-y-2 py-4">
                    <span class="mx-4 text-xl font-bold">HOVER OVER ME TO PAUSE THE MOTION</span>
                    <span class="mx-4 text-xl font-bold">HOVER OVER ME TO PAUSE THE MOTION</span>
                </Marquee>
            </CodePreview>
        </section>
    </div>
</DocPage>
