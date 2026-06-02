import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { expect, test, vi } from "vite-plus/test";
import SheetTest from "./sheet-test.svelte";
import { Sheet } from "./index";

test("Sheet toggles visibility", async () => {
    render(SheetTest);

    expect(screen.queryByText("Test Sheet")).toBeNull();

    const trigger = screen.getByText("Toggle Sheet");
    await fireEvent.click(trigger);

    expect(screen.getByText("Test Sheet")).toBeDefined();
    expect(screen.getByText("Sheet Content")).toBeDefined();

    const closeBtn = screen.getByRole("button", { name: "Close" });
    await fireEvent.click(closeBtn);

    // Svelte transition
    await waitFor(
        () => {
            expect(screen.queryByText("Test Sheet")).toBeNull();
        },
        { timeout: 2000 },
    );
});

test("Sheet closes on Escape through shared overlay behavior", async () => {
    const onClose = vi.fn();
    render(Sheet, { props: { open: true, title: "Escape Sheet", onClose } });

    await fireEvent.keyDown(window, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
    await waitFor(() => {
        expect(screen.queryByText("Escape Sheet")).toBeNull();
    });
});
