import { render, screen } from "@testing-library/svelte";
import { expect, test } from "vite-plus/test";
import PaginationTest from "./pagination-test.svelte";

test("Pagination renders links and buttons", () => {
    render(PaginationTest);
    expect(screen.getByLabelText("Go to previous page")).toBeDefined();
    expect(screen.getByLabelText("Go to next page")).toBeDefined();
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("More pages")).toBeDefined(); // sr-only text
});
