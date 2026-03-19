<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
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
                <div class="border-foreground bg-muted border-2 p-6">
                    <p class="text-muted-foreground mb-2 text-xs font-black uppercase">
                        pnpm (recommended)
                    </p>
                    <code class="font-mono text-sm"
                        >pnpm add @neobr/svelte @neobr/tailwind-preset</code
                    >
                </div>
                <div class="border-foreground bg-muted border-2 p-6">
                    <p class="text-muted-foreground mb-2 text-xs font-black uppercase">npm</p>
                    <code class="font-mono text-sm"
                        >npm install @neobr/svelte @neobr/tailwind-preset</code
                    >
                </div>
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
            <pre
                class="border-foreground bg-muted text-foreground overflow-x-auto rounded-none border-2 p-6 font-mono text-sm leading-relaxed">
<code
                    >@import "tailwindcss";
@import "@neobr/tailwind-preset/style";

/* Optional: customize your design tokens */
@theme &#123;
  --color-primary: #ffeb3b;
  --color-secondary: #ff5722;
&#125;</code
                >
            </pre>
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
            <pre
                class="border-foreground bg-muted text-foreground overflow-x-auto rounded-none border-2 p-6 font-mono text-sm leading-relaxed">
<code
                    >@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');

body &#123;
  font-family: 'Outfit', sans-serif;
&#125;</code
                >
            </pre>
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">4. Usage</h2>
            <p class="font-medium">Start using components in your Svelte pages:</p>
            <pre
                class="border-foreground bg-muted text-foreground overflow-x-auto rounded-none border-2 p-6 font-mono text-sm leading-relaxed">
<code
                    >&lt;script&gt;
  import &#123; Button, Card &#125; from "@neobr/svelte";
&lt;/script&gt;

&lt;Card&gt;
  &lt;Button variant="default"&gt;Hello NeoBr!&lt;/Button&gt;
&lt;/Card&gt;</code
                >
            </pre>
        </section>
    </div>
</DocPage>
