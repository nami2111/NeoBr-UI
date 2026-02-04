<script lang="ts">
    import { Button } from "@neobr/svelte";
    import { Input } from "@neobr/svelte";
    import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,
    } from "@neobr/svelte";
    import { Badge } from "@neobr/svelte";
    import { Link } from "@neobr/svelte";
    import { Icon } from "@neobr/svelte";
    import { Loading } from "@neobr/svelte";
    import { Alert, AlertTitle, AlertDescription } from "@neobr/svelte";
    import { Home01Icon, Notification02Icon } from "@hugeicons/core-free-icons";
</script>

<div class="container mx-auto py-10 space-y-10">
    <div class="space-y-2">
        <h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl">
            NeoBr-UI Showcase
        </h1>
        <p class="text-muted-foreground">
            A clean Neo Brutalism component library.
        </p>
    </div>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Buttons
        </h2>
        <div class="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button size="lg">Large</Button>
            <Button size="sm">Small</Button>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Inputs
        </h2>
        <div class="grid w-full max-w-sm items-center gap-1.5">
            <Input type="email" placeholder="Email" />
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Cards
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>

            <Card class="bg-accent text-accent-foreground">
                <CardHeader>
                    <CardTitle>Accent Card</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This is a raw accent card.</p>
                </CardContent>
            </Card>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Badges
        </h2>
        <div class="flex gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Alerts
        </h2>
        <Alert>
            <Icon icon={Home01Icon} class="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                This is a default alert for general information.
            </AlertDescription>
        </Alert>

        <Alert variant="destructive">
            <Icon icon={Notification02Icon} class="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                This is a destructive alert for critical errors.
            </AlertDescription>
        </Alert>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Loading
        </h2>
        <div class="flex gap-4">
            <Loading />
            <Loading size="lg" />
            <Loading variant="secondary" />
        </div>
    </section>
</div>
