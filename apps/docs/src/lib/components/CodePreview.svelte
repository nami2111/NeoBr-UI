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
        <div class="border-foreground flex items-center justify-between border-b-2 pb-2">
            <TabsList class="border-0">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <div class="flex items-center gap-2">
                <Button variant="outline" size="sm" onclick={copyToClipboard} class="gap-2">
                    <Icon icon={copied ? CheckmarkCircle02Icon : Copy01Icon} class="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                </Button>
            </div>
        </div>
        <TabsContent value="preview" class="pt-6">
            <div
                class={cn(
                    "border-foreground bg-accent/10 relative flex min-h-[200px] items-center justify-center rounded-none border-2 p-6 md:p-10",
                    className,
                )}
            >
                <div
                    class="absolute inset-0 bg-[radial-gradient(var(--color-foreground)_1px,transparent_1px)] [background-size:20px_20px] opacity-10"
                ></div>
                <div class="relative flex w-full items-center justify-center" style="z-index: 1">
                    {@render children?.()}
                </div>
            </div>
        </TabsContent>
        <TabsContent value="code" class="pt-6">
            <div class="group relative">
                <!-- Removed the glow and shadow as per user request -->
                <pre
                    class="border-foreground bg-muted text-foreground overflow-x-auto rounded-none border-2 p-6 font-mono text-sm leading-relaxed">
                    <code>{code.trim()}</code>
                </pre>
            </div>
        </TabsContent>
    </Tabs>
</div>
