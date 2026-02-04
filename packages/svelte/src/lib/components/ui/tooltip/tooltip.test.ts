import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import Tooltip from "./tooltip.svelte";

describe("Tooltip", () => {
    it("shows content on mouse enter and hides on mouse leave", async () => {
        render(Tooltip, { content: "Helpful info" });

        const trigger = screen.getByRole("button");
        expect(screen.queryByText("Helpful info")).toBeNull();

        await fireEvent.mouseEnter(trigger);
        expect(screen.getByText("Helpful info")).toBeTruthy();

        await fireEvent.mouseLeave(trigger);
        await waitFor(() => {
            expect(screen.queryByText("Helpful info")).toBeNull();
        }, { timeout: 2000 });
    });
});
