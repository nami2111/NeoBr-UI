<script lang="ts">
    import { cn } from "../../../utils";
    import { setFormItemContext } from "./form-context";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        /** Error state shared with descendant `FormMessage`. A string is the message; `true` marks invalid. */
        error?: string | boolean;
        /** Field label, control, and messages. */
        children?: import("svelte").Snippet;
    };

    let { class: className, error = false, children, ...rest }: Props = $props();

    setFormItemContext({
        get error() {
            return error;
        },
    });
</script>

<div class={cn("space-y-2", className)} {...rest}>
    {@render children?.()}
</div>
