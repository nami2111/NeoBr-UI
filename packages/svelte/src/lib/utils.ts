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
