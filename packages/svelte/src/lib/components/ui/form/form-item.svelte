<script lang="ts">
    import { cn } from "../../../utils";
    import { setFormItemContext } from "./form-context";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        error?: string | boolean;
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
