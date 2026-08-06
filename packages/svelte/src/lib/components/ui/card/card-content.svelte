<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  /** Body content area of a card. */
  type Props = HTMLAttributes<HTMLDivElement> & {
      children?: import('svelte').Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<div class={cn("p-6 pt-0", className)} {...rest}>
  {@render children?.()}
</div>
