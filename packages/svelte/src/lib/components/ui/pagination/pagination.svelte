<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  /** Pagination navigation landmark. Wraps a `PaginationContent` list. */
  type Props = HTMLAttributes<HTMLElement>;

  let { class: className, children, ...rest }: Props = $props();
</script>

<nav
  aria-label="pagination"
  class={cn("mx-auto flex w-full justify-center", className)}
  {...rest}
>
  {@render children?.()}
</nav>
