import { render as renderClient, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { describe, it, expect } from "vite-plus/test";
import Tooltip from "./tooltip.svelte";

describe("Tooltip", () => {
    it("shows content on mouse enter and hides on mouse leave", async () => {
        renderClient(Tooltip, { content: "Helpful info" });

        const trigger = screen.getByRole("button");
        expect(screen.queryByText("Helpful info")).toBeNull();

        await fireEvent.mouseEnter(trigger);
        expect(screen.getByText("Helpful info")).toBeTruthy();

        await fireEvent.mouseLeave(trigger);
        await waitFor(
            () => {
                expect(screen.queryByText("Helpful info")).toBeNull();
            },
            { timeout: 2000 },
        );
    });

    it("uses a stable described-by relationship when initially open", () => {
        renderClient(Tooltip, { content: "Initial info", open: true });

        const trigger = screen.getByRole("button");
        const tooltip = screen.getByRole("tooltip");

        expect(tooltip.id).toBeTruthy();
        expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
    });
});
