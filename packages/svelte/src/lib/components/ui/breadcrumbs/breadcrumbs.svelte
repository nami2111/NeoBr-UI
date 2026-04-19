<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = HTMLAttributes<HTMLElement>;

  let { class: className, children, ...rest }: Props = $props();
</script>

<nav
  aria-label="breadcrumb"
  class={cn("", className)}
  {...rest}
>
  {@render children?.()}
</nav>
