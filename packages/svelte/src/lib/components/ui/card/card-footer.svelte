<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  /** Footer area of a card, typically for actions. */
  type Props = HTMLAttributes<HTMLDivElement> & {
      children?: import('svelte').Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  class={cn("flex items-center p-6 pt-0", className)}
  {...rest}
>
  {@render children?.()}
</div>
