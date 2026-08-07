import { cubicInOut, cubicOut } from "svelte/easing";

function duration(ms: number) {
    return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? 0 : ms;
}

export const TRANSITION_BRUTALIST_FAST = () =>
    ({ duration: duration(100), easing: cubicInOut }) as const;
export const TRANSITION_BRUTALIST = () =>
    ({ duration: duration(150), easing: cubicInOut }) as const;
export const TRANSITION_BRUTALIST_BACKDROP = () =>
    ({
        duration: duration(200),
        easing: cubicInOut,
    }) as const;
export const TRANSITION_BRUTALIST_SLOW = () =>
    ({ duration: duration(300), easing: cubicInOut }) as const;

/**
 * Popup enter/exit (dropdown, popover, select). Fade + a 4px slide up so the
 * panel appears to grow out of its trigger. Opacity-only `fade` before felt
 * dead; CSS `animate-fade-in` (0.3s + scale) clashed with the 100-150ms JS
 * system — this is the single popup dialect.
 */
export const TRANSITION_POPUP = () =>
    ({ y: -4, duration: duration(150), easing: cubicOut }) as const;
