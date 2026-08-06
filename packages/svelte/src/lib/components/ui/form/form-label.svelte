<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLLabelAttributes } from "svelte/elements";

  /** Label for a form control. Use `for` to associate it with an input id. */
  type Props = HTMLLabelAttributes & {
      children?: import('svelte').Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<label
  class={cn(
    "text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    className
  )}
  {...rest}
>
  {@render children?.()}
</label>
