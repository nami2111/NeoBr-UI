<script lang="ts">
  import { cn } from "../../../utils";

  type Props = {
    class?: string;
    children?: import("svelte").Snippet;
    [key: string]: any;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<nav
  aria-label="breadcrumb"
  class={cn("", className)}
  {...rest}
>
  {@render children?.()}
</nav>
