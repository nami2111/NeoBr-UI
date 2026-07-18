<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  /** A single breadcrumb list item. */
  type Props = HTMLAttributes<HTMLLIElement>;

  let { class: className, children, ...rest }: Props = $props();
</script>

<li
  class={cn("inline-flex items-center gap-1.5", className)}
  {...rest}
>
  {@render children?.()}
</li>
