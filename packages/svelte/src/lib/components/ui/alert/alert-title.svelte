<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = HTMLAttributes<HTMLHeadingElement> & {
      children?: import('svelte').Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<h5
  class={cn("mb-1 font-bold leading-none tracking-tight", className)}
  {...rest}
>
  {@render children?.()}
</h5>
