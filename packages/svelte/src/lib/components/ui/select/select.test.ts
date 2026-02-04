import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import SelectTest from "./select-test.svelte";

describe("Select", () => {
    it("renders with placeholder and opens on click", async () => {
        render(SelectTest);

        const trigger = screen.getByRole("button");
        expect(trigger.textContent).toContain("Pick an environment");

        await fireEvent.click(trigger);
        expect(screen.getByText("Production")).toBeTruthy();
        expect(screen.getByText("Staging")).toBeTruthy();
    });

    it("selects an option and closes", async () => {
        render(SelectTest);

        const trigger = screen.getByRole("button");
        await fireEvent.click(trigger);

        const option = screen.getByText("Production");
        await fireEvent.click(option);

        expect(trigger.textContent).toContain("Production");
        await waitFor(() => {
            expect(screen.queryByText("Staging")).toBeNull();
        }, { timeout: 2000 });
    });
});
