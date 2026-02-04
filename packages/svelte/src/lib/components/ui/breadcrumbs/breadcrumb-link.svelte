<script lang="ts">
  import { cn } from "../../../utils";

  type Props = {
    href: string;
    class?: string;
    children?: import("svelte").Snippet;
    [key: string]: any;
  };

  let { href, class: className, children, ...rest }: Props = $props();
</script>

<a
  {href}
  class={cn("transition-colors hover:text-foreground", className)}
  {...rest}
>
  {@render children?.()}
</a>
