<script lang="ts">
  import { cn } from "../../../utils";

  type Props = {
    class?: string;
    onclick?: () => void;
    children?: import('svelte').Snippet;
    [key: string]: any;
  };

  let props: Props = $props();
  let { 
    class: className, 
    onclick = () => {}, 
    children, 
    ...rest 
  } = props;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={cn(
    "flex cursor-pointer items-center px-4 py-2 text-sm font-bold hover:bg-accent hover:text-accent-foreground transition-colors",
    className
  )}
  onclick={(e) => {
    onclick();
  }}
  {...rest}
>
  {@render children?.()}
</div>
