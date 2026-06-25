import { describe, expect, it, vi } from "vite-plus/test";

describe("motion transitions", () => {
    it("keeps durations unless reduced motion is requested", async () => {
        vi.stubGlobal(
            "matchMedia",
            vi.fn(() => ({ matches: false })),
        );
        vi.resetModules();

        const normal = await import("./motion");
        expect(normal.TRANSITION_BRUTALIST.duration).toBe(150);

        vi.stubGlobal(
            "matchMedia",
            vi.fn(() => ({ matches: true })),
        );
        vi.resetModules();

        const reduced = await import("./motion");
        expect(reduced.TRANSITION_BRUTALIST.duration).toBe(0);

        vi.unstubAllGlobals();
    });
});
