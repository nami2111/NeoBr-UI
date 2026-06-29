import { describe, expect, it } from "vite-plus/test";
import { cn } from "./utils";

describe("cn", () => {
    it("lets consumer radius and shadow classes override brutalist utilities", () => {
        expect(
            cn(
                "rounded-brutalist shadow-brutalist border-2 p-6",
                "rounded-lg shadow-none border-0 p-2",
            ),
        ).toBe("rounded-lg shadow-none border-0 p-2");
    });
});
