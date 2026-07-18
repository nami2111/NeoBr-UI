<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  /** Header area of a card, holds title and description. */
  type Props = HTMLAttributes<HTMLDivElement> & {
      children?: import('svelte').Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  class={cn("flex flex-col space-y-1.5 p-6", className)}
  {...rest}
>
  {@render children?.()}
</div>
