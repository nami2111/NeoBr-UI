<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  /** A single item in the pagination list. */
  type Props = HTMLAttributes<HTMLLIElement>;

  let { class: className, children, ...rest }: Props = $props();
</script>

<li class={cn("", className)} {...rest}>
  {@render children?.()}
</li>
