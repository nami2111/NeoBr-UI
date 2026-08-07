import "@testing-library/jest-dom";
import { vi, expect } from "vite-plus/test";
import * as axeMatchers from "vitest-axe/matchers";
import "vitest-axe/extend-expect";

expect.extend(axeMatchers);

// Silence jsdom's “Not implemented” diagnostics (canvas getContext probe,
// getComputedStyle pseudo-element checks by axe) — they are noise, not
// failures. jsdom forwards them as `jsdomError` events on its internal
// virtual console, which bypasses vitest's onConsoleLog and console patches.
const virtualConsole = (
    window as unknown as { _virtualConsole?: { emit: (...args: unknown[]) => void } }
)._virtualConsole;
if (virtualConsole) {
    const originalEmit = virtualConsole.emit.bind(virtualConsole);
    virtualConsole.emit = (name, ...args) => {
        const error = args[0] as { message?: string } | undefined;
        if (name === "jsdomError" && error?.message?.includes("Not implemented")) {
            return;
        }
        originalEmit(name, ...args);
    };
}

// Mock matchMedia if needed
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock Pointer Capture API for libraries that rely on pointer interactions.
if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = vi.fn().mockReturnValue(false);
}

if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = vi.fn();
}

// Mock Web Animations API for Svelte transitions
if (!Element.prototype.animate) {
    Element.prototype.animate = vi.fn().mockImplementation(() => {
        const anim = {
            finished: Promise.resolve(),
            cancel: vi.fn(),
            onfinish: null as any,
            play: vi.fn(),
            pause: vi.fn(),
            reverse: vi.fn(),
            updatePlaybackRate: vi.fn(),
            persist: vi.fn(),
            commitStyles: vi.fn(),
            currentTime: 0,
            effect: null,
            id: "",
            pending: false,
            playState: "finished",
            playbackRate: 1,
            startTime: 0,
            timeline: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
            ready: Promise.resolve(),
        };
        // Svelte 5 often sets onfinish after the animate call.
        // We trigger it in a microtask to allow Svelte to finish its business.
        Promise.resolve().then(() => {
            if (anim.onfinish) anim.onfinish();
        });
        return anim;
    }) as any;
}
