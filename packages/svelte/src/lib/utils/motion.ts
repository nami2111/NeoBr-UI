import { cubicInOut } from "svelte/easing";

export const TRANSITION_BRUTALIST_FAST = { duration: 100, easing: cubicInOut } as const;
export const TRANSITION_BRUTALIST = { duration: 150, easing: cubicInOut } as const;
export const TRANSITION_BRUTALIST_BACKDROP = { duration: 200, easing: cubicInOut } as const;
export const TRANSITION_BRUTALIST_SLOW = { duration: 300, easing: cubicInOut } as const;
