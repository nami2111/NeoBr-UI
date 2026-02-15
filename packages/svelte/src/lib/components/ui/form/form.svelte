<script lang="ts">
    /**
     * Verified form container with standard spacing.
     *
     * @example
     * ```svelte
     * <Form onsubmit={handleSubmit}>
     *   <FormItem>
     *     <FormLabel>Name</FormLabel>
     *     <Input bind:value={name} />
     *   </FormItem>
     * </Form>
     * ```
     */
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLFormElement> & {
        children?: import("svelte").Snippet;
    };

    let { class: className, children, ...rest }: Props = $props();
</script>

<form class={cn("space-y-6", className)} {...rest}>
    {@render children?.()}
</form>
