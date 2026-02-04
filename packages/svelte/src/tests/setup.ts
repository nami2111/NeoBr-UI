import "@testing-library/jest-dom";
import { vi, expect } from "vitest";
import * as axeMatchers from "vitest-axe/matchers";
import "vitest-axe/extend-expect";

expect.extend(axeMatchers);

// Mock matchMedia if needed
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
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
            id: '',
            pending: false,
            playState: 'finished',
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
