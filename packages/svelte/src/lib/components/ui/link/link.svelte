<script lang="ts">
  import { cva, type VariantProps } from "class-variance-authority";
  import { cn } from "../../../utils";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  const linkVariants = cva(
    "font-bold transition-all hover:opacity-80",
    {
      variants: {
        variant: {
          default: "text-foreground underline decoration-2 underline-offset-4",
          primary: "text-primary underline decoration-2 underline-offset-4",
          muted: "text-muted-foreground underline decoration-1 underline-offset-2",
        },
        brutalist: {
          true: "tracking-brutalist",
          false: "",
        }
      },
      defaultVariants: {
        variant: "default",
        brutalist: true
      },
    }
  );

  type Props = HTMLAnchorAttributes & VariantProps<typeof linkVariants> & {
      children?: import('svelte').Snippet;
  };

  let { 
    class: className, 
    variant = "default", 
    brutalist = true, 
    children, 
    ...rest 
  }: Props = $props();
</script>

<a class={cn(linkVariants({ variant, brutalist, className }))} {...rest}>
  {@render children?.()}
</a>
