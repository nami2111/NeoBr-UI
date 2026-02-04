<script lang="ts">
  import { cn } from "../../../utils";

  type Props = {
    class?: string;
    children?: import("svelte").Snippet;
    [key: string]: any;
  };

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
