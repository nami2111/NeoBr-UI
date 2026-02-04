<script lang="ts">
  import { setContext, getContext } from "svelte";
  
  type Props = {
    value?: any;
    disabled?: boolean;
    children?: import('svelte').Snippet;
    [key: string]: any;
  };

  let { 
    value = $bindable(), 
    disabled = false, 
    children,
    ...rest 
  }: Props = $props();

  let open = $state(false);
  let triggerElement = $state<HTMLElement | null>(null);

  const SELECT_CONTEXT = "select";

  setContext(SELECT_CONTEXT, {
    get value() { return value; },
    set value(v) { value = v; open = false; },
    get open() { return open; },
    set open(v) { open = v; },
    get disabled() { return disabled; },
    get triggerElement() { return triggerElement; },
    set triggerElement(el) { triggerElement = el; }
  });

  // Handle click outside
  function handleClickOutside(e: MouseEvent) {
    if (open && triggerElement && !triggerElement.contains(e.target as Node)) {
       // We'll handle refined outside click in SelectContent
    }
  }
</script>

<div class="relative inline-block w-full">
  {@render children?.()}
</div>
