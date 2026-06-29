<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import {
        Form,
        FormItem,
        FormLabel,
        FormDescription,
        FormMessage,
        Input,
        Button,
    } from "@neobr/svelte";
    import { createFormState, z } from "@neobr/svelte/form";

    let username = $state("");
    let submittedEmail = $state<string | undefined>();

    // Form validation example with Zod
    const loginSchema = z.object({
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
    });

    const loginForm = createFormState({
        schema: loginSchema,
        onSubmit: async (values) => {
            submittedEmail = values.email;
        },
    });

    const usage = `<Form>
    <FormItem>
        <FormLabel>Username</FormLabel>
        <Input placeholder="neobr-ui" bind:value={username} />
        <FormDescription> This is your public display name.</FormDescription>
        <FormMessage />
    </FormItem>
    <Button type="submit">Submit</Button>
</Form>`;

    const validationExample = `<scr` + `ipt>
    import { createFormState, z } from "@neobr/svelte/form";
    
    const schema = z.object({
        email: z.string().email("Please enter a valid email"),
        password: z.string().min(8, "Min 8 characters"),
    });
    
    let submittedEmail = $state<string | undefined>();
    
    const form = createFormState({
        schema,
        onSubmit: async (values) => {
            submittedEmail = values.email;
        },
    });
</scr` + `ipt>

<Form onsubmit={form.handleSubmit}>
    <FormItem error={form.errors.email}>
        <FormLabel>Email</FormLabel>
        <Input 
            type="email" 
            bind:value={form.values.email}
            onblur={() => form.handleBlur("email")}
        />
        {#if form.errors.email}
            <FormMessage>{form.errors.email}</FormMessage>
        {/if}
    </FormItem>
    
    <FormItem error={form.errors.password}>
        <FormLabel>Password</FormLabel>
        <Input 
            type="password" 
            bind:value={form.values.password}
            onblur={() => form.handleBlur("password")}
        />
        {#if form.errors.password}
            <FormMessage>{form.errors.password}</FormMessage>
        {/if}
    </FormItem>
    
    <Button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? "Signing in..." : "Sign In"}
    </Button>
    
    {#if submittedEmail}
        <p>Submitted {submittedEmail}</p>
    {/if}
</Form>`;
</script>

<DocPage title="Form" description="Building forms with Svelte and NeoBr-UI components.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <div class="w-full max-w-sm py-10">
                    <Form class="space-y-6">
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder="neobr-ui" bind:value={username} />
                            <FormDescription>This is your public display name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                        <Button type="submit" class="w-full">Submit</Button>
                    </Form>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Error State</h2>
            <CodePreview
                code={`<FormItem error>
    <FormLabel>Email</FormLabel>
    <Input value="invalid-email" />
    <FormMessage>Please enter a valid email address.</FormMessage>
</FormItem>`}
            >
                <div class="w-full max-w-sm py-10">
                    <Form>
                        <FormItem error>
                            <FormLabel>Email</FormLabel>
                            <Input value="invalid-email" />
                            <FormMessage>Please enter a valid email address.</FormMessage>
                        </FormItem>
                    </Form>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Form Validation with Zod</h2>
            <p class="text-muted-foreground">
                Use <code class="bg-muted px-1 rounded">createFormState</code> with Zod schemas for type-safe form validation.
                This provides reactive state management with automatic validation on blur and submit. String fields default to
                <code class="bg-muted px-1 rounded">""</code>; provide <code class="bg-muted px-1 rounded">initialValues</code>
                for number, boolean, array, object, and date fields. Nested validation errors are keyed by the top-level field.
            </p>
            <CodePreview code={validationExample}>
                <div class="w-full max-w-sm py-10">
                    <Form onsubmit={loginForm.handleSubmit} class="space-y-6">
                        <FormItem error={loginForm.errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input 
                                type="email" 
                                placeholder="you@example.com"
                                bind:value={loginForm.values.email}
                                onblur={() => loginForm.handleBlur("email")}
                            />
                            {#if loginForm.errors.email}
                                <FormMessage>{loginForm.errors.email}</FormMessage>
                            {/if}
                        </FormItem>
                        
                        <FormItem error={loginForm.errors.password}>
                            <FormLabel>Password</FormLabel>
                            <Input 
                                type="password" 
                                placeholder="••••••••"
                                bind:value={loginForm.values.password}
                                onblur={() => loginForm.handleBlur("password")}
                            />
                            {#if loginForm.errors.password}
                                <FormMessage>{loginForm.errors.password}</FormMessage>
                            {/if}
                        </FormItem>
                        
                        <Button type="submit" class="w-full" disabled={loginForm.isSubmitting}>
                            {loginForm.isSubmitting ? "Signing in..." : "Sign In"}
                        </Button>
                        {#if submittedEmail}
                            <p class="border-foreground bg-muted rounded-brutalist border-2 p-3 text-xs font-bold">
                                Submitted {submittedEmail}
                            </p>
                        {/if}
                    </Form>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">API Reference</h2>
            <div class="space-y-4">
                <div class="border-foreground bg-card rounded-brutalist border-2 p-4">
                    <h3 class="font-bold text-lg">createFormState(options)</h3>
                    <p class="text-muted-foreground mt-2">Creates a reactive form state with Zod validation.</p>
                    <h4 class="font-semibold mt-4">Options</h4>
                    <ul class="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                        <li><code class="bg-muted px-1 rounded">schema</code> - Zod schema for validation</li>
                        <li><code class="bg-muted px-1 rounded">initialValues</code> - Optional initial form values; required for useful number, boolean, array, object, and date defaults</li>
                        <li><code class="bg-muted px-1 rounded">onSubmit</code> - Submit handler function</li>
                        <li><code class="bg-muted px-1 rounded">validateOnChange</code> - Validate on change (default: true)</li>
                        <li><code class="bg-muted px-1 rounded">validateOnBlur</code> - Validate on blur (default: true)</li>
                    </ul>
                    <h4 class="font-semibold mt-4">Returns</h4>
                    <ul class="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                        <li><code class="bg-muted px-1 rounded">values</code> - Reactive form values</li>
                        <li><code class="bg-muted px-1 rounded">errors</code> - Validation errors by field</li>
                        <li><code class="bg-muted px-1 rounded">touched</code> - Touched fields tracking</li>
                        <li><code class="bg-muted px-1 rounded">isValid</code> - Form validity state</li>
                        <li><code class="bg-muted px-1 rounded">isSubmitting</code> - Submission in progress</li>
                        <li><code class="bg-muted px-1 rounded">isDirty</code> - Form has been modified</li>
                        <li><code class="bg-muted px-1 rounded">handleSubmit</code> - Form submit handler</li>
                        <li><code class="bg-muted px-1 rounded">handleBlur</code> - Field blur handler</li>
                        <li><code class="bg-muted px-1 rounded">reset</code> - Reset form to initial state</li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</DocPage>
