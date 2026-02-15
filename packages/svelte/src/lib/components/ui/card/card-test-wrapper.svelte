<script lang="ts">
    import * as Card from ".";

    let {
        title = "Card Title",
        description = "Card Description",
        content = "Card Content",
        footer = "Card Footer",
    }: {
        title?: string;
        description?: string;
        content?: string;
        footer?: string;
    } = $props();
</script>

<Card.Card>
    <Card.CardHeader>
        <Card.CardTitle>{title}</Card.CardTitle>
        <Card.CardDescription>{description}</Card.CardDescription>
    </Card.CardHeader>
    <Card.CardContent>
        {content}
    </Card.CardContent>
    <Card.CardFooter>
        {footer}
    </Card.CardFooter>
</Card.Card>
