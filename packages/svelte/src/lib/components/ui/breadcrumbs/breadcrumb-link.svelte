<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = HTMLAttributes<HTMLAnchorElement> & {
    href: string;
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
