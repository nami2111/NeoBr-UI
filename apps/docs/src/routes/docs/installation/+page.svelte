<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodeBlock from "../../../lib/components/CodeBlock.svelte";

    const cssSetup = `@import "tailwindcss";
@import "@neobr/svelte/style";

/* Scan packaged component classes */
@source "../node_modules/@neobr/svelte/dist";

/* Optional: customize design tokens after the design-system import */
@theme {
  --color-primary: #ffeb3b;
  --color-secondary: #ff5722;
  --font-neobr-mono: "JetBrains Mono", monospace;
}`;

    // Use string concatenation to avoid <script> inside template literal
    const fontSetup = "<" + `link rel="preconnect" href="https://fonts.googleapis.com" />
<` + `link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<` + `link
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
    rel="stylesheet"
/>`;

    const optionalExampleDependencies = `pnpm add @hugeicons/core-free-icons @internationalized/date
npm install @hugeicons/core-free-icons @internationalized/date`;

    const usageExample = "<" + `script>
  import { Button, Card } from "@neobr/svelte";
</` + `script>

<Card>
  <Button variant="default">Hello NeoBr!</Button>
</Card>`;
</script>

<DocPage title="Installation" description="Set up NeoBr-UI in your project and start building.">
    <div class="space-y-16">
        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Prerequisites</h2>
            <div class="border-foreground shadow-brutalist bg-accent/5 border-2 p-6 font-bold">
                <ul class="list-inside list-disc space-y-2">
                    <li>Svelte 5 (v5.40.0 or later, below v6)</li>
                    <li>Tailwind CSS v4</li>
                    <li>Node.js v18+</li>
                </ul>
            </div>
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">1. Install Package</h2>
            <p class="font-medium">
                Run the following command in your project root using your preferred package manager:
            </p>
            <div class="space-y-4">
                <CodeBlock code="pnpm add @neobr/svelte" />
                <CodeBlock code="npm install @neobr/svelte" />
            </div>
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">
                2. Configure Tailwind CSS 4
            </h2>
            <p class="font-medium">
                In Tailwind CSS 4, you can import the design system directly in your main CSS file
                (e.g., <code>app.css</code
                >):
            </p>
            <CodeBlock code={cssSetup} />
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">
                3. Typography Setup
            </h2>
            <p class="font-medium">
                Neo-Brutalism uses <strong>JetBrains Mono</strong> as the primary typeface for its
                technical, monospace aesthetic. NeoBr-UI exposes font tokens but does not override
                your app's <code>font-sans</code> or body font.
            </p>
            <p class="text-sm font-bold italic">Add this to your app.html head:</p>
            <CodeBlock code={fontSetup} />
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">
                4. Example Dependencies
            </h2>
            <p class="font-medium">
                Component imports work from <code>@neobr/svelte</code>. Install these packages
                directly only when your app imports HugeIcons icon objects or date helpers in its
                own code examples.
            </p>
            <CodeBlock code={optionalExampleDependencies} />
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">5. Usage</h2>
            <p class="font-medium">Start using components in your Svelte pages:</p>
            <CodeBlock code={usageExample} />
        </section>
    </div>
</DocPage>
