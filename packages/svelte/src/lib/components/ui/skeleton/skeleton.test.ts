import { render } from "@testing-library/svelte";
import { expect, test } from "vite-plus/test";
import { Skeleton } from "./index";

test("Skeleton renders with custom class", () => {
    const { container } = render(Skeleton, { class: "custom-class" });
    const el = container.querySelector(".custom-class");
    expect(el).toBeDefined();
    expect(el?.className).toContain("animate-skeleton-pulse");
});
