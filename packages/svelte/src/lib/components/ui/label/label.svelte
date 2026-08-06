<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLLabelElement> & {
        /** Id of the control this label is associated with. */
        for?: string;
    };

    let { for: htmlFor, class: className, children, ...rest }: Props = $props();
</script>

<label
    for={htmlFor}
    class={cn(
        "text-sm leading-none font-bold peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
    )}
    {...rest}
>
    {@render children?.()}
</label>
