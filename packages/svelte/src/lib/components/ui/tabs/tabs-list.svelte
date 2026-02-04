<script lang="ts">
  import { cn } from "../../../utils";

  type Props = {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  class={cn(
    "inline-flex h-12 items-center justify-center border-2 border-foreground bg-muted p-1 text-muted-foreground",
    className
  )}
  {...rest}
>
  {@render children?.()}
</div>
