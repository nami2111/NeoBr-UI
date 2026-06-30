import { describe, expect, it, vi } from "vite-plus/test";

describe("motion transitions", () => {
    it("checks reduced motion when transition params are requested", async () => {
        vi.stubGlobal(
            "matchMedia",
            vi.fn(() => ({ matches: false })),
        );

        const motion = await import("./motion");
        expect(motion.TRANSITION_BRUTALIST().duration).toBe(150);

        vi.stubGlobal(
            "matchMedia",
            vi.fn(() => ({ matches: true })),
        );

        expect(motion.TRANSITION_BRUTALIST().duration).toBe(0);

        vi.unstubAllGlobals();
    });
});
