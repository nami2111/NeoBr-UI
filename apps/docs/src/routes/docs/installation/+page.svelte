<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
</script>

<DocPage title="Installation" description="How to install and configure NeoBr-UI in your project.">
    <div class="space-y-12">
        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">
                1. Install dependencies
            </h2>
            <p class="font-medium">Run the following command in your project root:</p>
            <pre
                class="border-foreground bg-muted text-foreground overflow-x-auto rounded-none border-4 p-6 font-mono text-sm leading-relaxed">
<code>pnpm add @neobr/svelte @neobr/tailwind-preset</code>
            </pre>
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">
                2. Configure Tailwind CSS
            </h2>
            <p class="font-medium">
                Add the NeoBr-UI preset to your <code>tailwind.config.js</code> or
                <code>app.css</code>:
            </p>
            <pre
                class="border-foreground bg-muted text-foreground overflow-x-auto rounded-none border-4 p-6 font-mono text-sm leading-relaxed">
<code
                    >@import "tailwindcss";
@import "@neobr/tailwind-preset/style";</code
                >
            </pre>
        </section>

        <section class="space-y-6">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">3. Usage</h2>
            <p class="font-medium">Import components directly in your Svelte files:</p>
            <pre
                class="border-foreground bg-muted text-foreground overflow-x-auto rounded-none border-4 p-6 font-mono text-sm leading-relaxed">
<code
                    >&lt;script&gt;
  import &#123; Button &#125; from "@neobr/svelte";
&lt;/script&gt;

&lt;Button&gt;Click me&lt;/Button&gt;</code
                >
            </pre>
        </section>
    </div>
</DocPage>
