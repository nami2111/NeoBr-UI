import { render, screen } from "@testing-library/svelte";
import { expect, test } from "vite-plus/test";
import BreadcrumbsTest from "./breadcrumbs-test.svelte";

test("Breadcrumbs renders correct items", () => {
    render(BreadcrumbsTest);
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Current")).toBeDefined();
    expect(screen.getByRole("link", { name: "Home" })).toBeDefined();
    expect(screen.getByText("Current").getAttribute("aria-current")).toBe("page");
});
