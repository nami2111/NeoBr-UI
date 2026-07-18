<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  /** Card heading. */
  type Props = HTMLAttributes<HTMLHeadingElement> & {
      children?: import('svelte').Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<h3
  class={cn("font-bold leading-none tracking-tight", className)}
  {...rest}
>
  {@render children?.()}
</h3>
