import { render, screen } from "@testing-library/svelte";
import { expect, test } from "vitest";
import { Progress } from "./index";

test("Progress renders with value", () => {
    render(Progress, { value: 50 });
    const progress = screen.getByRole("progressbar");
    expect(progress.getAttribute("aria-valuenow")).toBe("50");
});

test("Progress renders indeterminate state", () => {
    render(Progress, { indeterminate: true });
    const progress = screen.getByRole("progressbar");
    expect(progress.getAttribute("aria-valuenow")).toBeNull();
});
