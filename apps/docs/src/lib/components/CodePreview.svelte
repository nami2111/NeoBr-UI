<script lang="ts">
    import { Tabs, TabsList, TabsTrigger, TabsContent, Card, Button, Icon } from "@neobr/svelte";
    import { Copy01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";

    interface Props {
        code: string;
        children?: import("svelte").Snippet;
    }

    let { code, children }: Props = $props();
    let copied = $state(false);

    async function copyToClipboard() {
        await navigator.clipboard.writeText(code);
        copied = true;
        setTimeout(() => (copied = false), 2000);
    }
</script>

<div class="space-y-4">
    <Tabs value="preview" class="w-full">
        <div class="border-foreground flex items-center justify-between border-b-4 pb-2">
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
                class="border-foreground bg-accent/10 relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-none border-4 p-6 md:p-10"
            >
                <div
                    class="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] opacity-10"
                ></div>
                <div class="relative z-10 flex w-full items-center justify-center">
                    {@render children?.()}
                </div>
            </div>
        </TabsContent>
        <TabsContent value="code" class="pt-6">
            <div class="group relative">
                <div
                    class="bg-primary/20 absolute -inset-2 -z-10 rounded-none blur-sm transition-all group-hover:blur-md"
                ></div>
                <pre
                    class="border-foreground overflow-x-auto rounded-none border-4 bg-slate-950 p-6 font-mono text-sm leading-relaxed text-slate-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <code>{code.trim()}</code>
                </pre>
            </div>
        </TabsContent>
    </Tabs>
</div>
