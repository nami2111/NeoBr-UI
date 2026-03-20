import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vite-plus/test";
import Separator from "./separator.svelte";

describe("Separator", () => {
    it("renders with horizontal orientation by default", () => {
        const { container } = render(Separator);
        const div = container.firstChild as HTMLElement;
        expect(div.classList.contains("h-[3px]")).toBe(true);
        expect(div.classList.contains("w-full")).toBe(true);
    });

    it("renders with vertical orientation", () => {
        const { container } = render(Separator, { orientation: "vertical" });
        const div = container.firstChild as HTMLElement;
        expect(div.classList.contains("h-full")).toBe(true);
        expect(div.classList.contains("w-[3px]")).toBe(true);
    });
});
