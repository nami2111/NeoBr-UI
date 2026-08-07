<script lang="ts">
    import { Tabs, TabsList, TabsTrigger, TabsContent, Card, Button, Icon } from "@neobr/svelte";
    import { Copy01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";

    interface Props {
        code: string;
        children?: import("svelte").Snippet;
        class?: string;
    }

    let { code, children, class: className }: Props = $props();
    let copied = $state(false);

    import { cn } from "@neobr/svelte";

    async function copyToClipboard() {
        await navigator.clipboard.writeText(code);
        copied = true;
        setTimeout(() => (copied = false), 2000);
    }
</script>

<div class="space-y-4">
    <Tabs value="preview" class="w-full">
        <div class="border-foreground flex flex-wrap items-center justify-between gap-3 border-b-2 pb-3">
            <TabsList class="border-0">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <div class="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onclick={copyToClipboard}
                    class="gap-2"
                    aria-label={copied ? "Copied example code" : "Copy example code"}
                >
                    <Icon icon={copied ? CheckmarkCircle02Icon : Copy01Icon} class="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                </Button>
            </div>
        </div>
        <TabsContent value="preview" class="pt-6">
            <div
                class={cn(
                    "border-foreground bg-accent/10 relative flex min-h-[220px] items-center justify-center overflow-x-auto overflow-y-hidden rounded-none border-2 p-6 shadow-brutalist md:p-10",
                    className,
                )}
            >
                <div class="absolute inset-0 bg-grid-fine opacity-10"></div>
                <div class="relative flex w-full min-w-0 items-center justify-center" style="z-index: 1">
                    {@render children?.()}
                </div>
            </div>
        </TabsContent>
        <TabsContent value="code" class="pt-6">
            <div class="group relative">
                <pre
                    class="border-foreground bg-muted text-foreground overflow-x-auto rounded-none border-2 p-6 font-mono text-sm leading-relaxed shadow-brutalist"
                ><code>{code.trim()}</code></pre>
            </div>
        </TabsContent>
    </Tabs>
</div>
