<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  /** The current page in the breadcrumb trail (non-interactive). */
  type Props = HTMLAttributes<HTMLSpanElement>;

  let { class: className, children, ...rest }: Props = $props();
</script>

<span
  role="link"
  aria-disabled="true"
  aria-current="page"
  class={cn("font-bold text-foreground", className)}
  {...rest}
>
  {@render children?.()}
</span>
