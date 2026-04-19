<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodeBlock from "../../../lib/components/CodeBlock.svelte";
</script>

<DocPage title="Installation" description="Set up NeoBr-UI in your project and start building.">
    <div class="space-y-16">
        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Prerequisites</h2>
            <div class="border-foreground shadow-brutalist bg-accent/5 border-2 p-6 font-bold">
                <ul class="list-inside list-disc space-y-2">
                    <li>Svelte 5 (v5.0.0 or later)</li>
                    <li>Tailwind CSS v4.0.0+</li>
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
                <CodeBlock code="pnpm add @neobr/svelte @neobr/tailwind-preset" />
                <CodeBlock code="npm install @neobr/svelte @neobr/tailwind-preset" />
            </div>
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">
                2. Configure Tailwind CSS 4
            </h2>
            <p class="font-medium">
                In Tailwind CSS 4, you can import the preset directly in your main CSS file (e.g., <code
                    >app.css</code
                >):
            </p>
<CodeBlock code={`@import "tailwindcss";
@import "@neobr/tailwind-preset/style";

/* Optional: customize your design tokens */
@theme {
  --color-primary: #ffeb3b;
  --color-secondary: #ff5722;
}`} />
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">
                3. Typography Setup
            </h2>
            <p class="font-medium">
                Neo-Brutalism looks best with geometric sans-serif fonts. We recommend <strong
                    >Inter</strong
                >
                or <strong>Outfit</strong>.
            </p>
            <p class="text-sm font-bold italic">Add this to your HTML head or CSS:</p>
<CodeBlock code={`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');

body {
  font-family: 'Outfit', sans-serif;
}`} />
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">4. Usage</h2>
            <p class="font-medium">Start using components in your Svelte pages:</p>
<CodeBlock code={`<script>
  import { Button, Card } from "@neobr/svelte";
</script>

<Card>
  <Button variant="default">Hello NeoBr!</Button>
</Card>`} />
        </section>
    </div>
</DocPage>
