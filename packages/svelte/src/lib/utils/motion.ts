import { cubicInOut } from "svelte/easing";

function duration(ms: number) {
    return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? 0 : ms;
}

export const TRANSITION_BRUTALIST_FAST = { duration: duration(100), easing: cubicInOut } as const;
export const TRANSITION_BRUTALIST = { duration: duration(150), easing: cubicInOut } as const;
export const TRANSITION_BRUTALIST_BACKDROP = {
    duration: duration(200),
    easing: cubicInOut,
} as const;
export const TRANSITION_BRUTALIST_SLOW = { duration: duration(300), easing: cubicInOut } as const;
