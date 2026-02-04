<script lang="ts">
  import { cva, type VariantProps } from "class-variance-authority";
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  const badgeVariants = cva(
    "inline-flex items-center border-2 px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
      variants: {
        variant: {
          default:
            "border-foreground bg-primary text-primary-foreground hover:bg-primary/80",
          secondary:
            "border-foreground bg-secondary text-secondary-foreground hover:bg-secondary/80",
          destructive:
            "border-foreground bg-destructive text-destructive-foreground hover:bg-destructive/80",
          outline: "text-foreground",
        },
        brutalist: {
          true: "rounded-brutalist",
          false: "rounded-md",
        }
      },
      defaultVariants: {
        variant: "default",
        brutalist: true
      },
    }
  );

  type Props = HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants> & {
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

<div class={cn(badgeVariants({ variant, brutalist, className }))} {...rest}>
  {@render children?.()}
</div>
