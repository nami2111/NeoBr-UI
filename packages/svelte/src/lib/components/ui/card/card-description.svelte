<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  /** Muted description text in a card header. */
  type Props = HTMLAttributes<HTMLParagraphElement> & {
      children?: import('svelte').Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<p
  class={cn("text-sm text-muted-foreground", className)}
  {...rest}
>
  {@render children?.()}
</p>
