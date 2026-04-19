import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { expect, test } from "vite-plus/test";
import SheetTest from "./sheet-test.svelte";

test("Sheet toggles visibility", async () => {
    render(SheetTest);

    expect(screen.queryByText("Test Sheet")).toBeNull();

    const trigger = screen.getByText("Toggle Sheet");
    await fireEvent.click(trigger);

    expect(screen.getByText("Test Sheet")).toBeDefined();
    expect(screen.getByText("Sheet Content")).toBeDefined();

    const closeBtn = screen.getByRole("button", { name: /close/i });
    await fireEvent.click(closeBtn);

    // Svelte transition
    await waitFor(
        () => {
            expect(screen.queryByText("Test Sheet")).toBeNull();
        },
        { timeout: 2000 },
    );
});
