import { describe, expect, it } from "vite-plus/test";
import { cn } from "./utils";

describe("cn", () => {
    it("lets consumer radius and shadow classes override brutalist utilities", () => {
        expect(cn("rounded-brutalist shadow-brutalist", "rounded-lg shadow-none")).toBe(
            "rounded-lg shadow-none",
        );
    });
});
