import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge that our custom @utility classes set border-radius /
// box-shadow, so a consumer `class` override (e.g. `class="rounded-lg"`) wins
// over the component default instead of both surviving and CSS source order
// deciding the winner.
const twMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            rounded: ["rounded-brutalist", "rounded-brutalist-soft", "rounded-brutalist-rounded"],
            shadow: ["shadow-brutalist", "shadow-brutalist-hover"],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Shared radius scale for bordered components.
 * brutalist = sharp (0px), soft = 6px, rounded = 12px.
 */
export type Radius = "brutalist" | "soft" | "rounded";

export const RADIUS: Record<Radius, string> = {
    brutalist: "rounded-brutalist",
    soft: "rounded-brutalist-soft",
    rounded: "rounded-brutalist-rounded",
};

/**
 * Shared class string for the small square icon buttons used in calendar /
 * date-picker navigation (bits-ui primitive `class` props). Kept as expanded
 * literals — not a composite `@utility` — so tailwind-merge can still resolve
 * consumer overrides. See the `cn` comment above.
 */
export const NAV_ICON_BUTTON =
    "border-foreground shadow-brutalist hover:shadow-brutalist-hover rounded-brutalist flex h-8 w-8 cursor-pointer items-center justify-center border-2 p-0 transition-all hover:-translate-y-[var(--lift-brutalist)] active:translate-y-[var(--press-brutalist)] active:shadow-none";
