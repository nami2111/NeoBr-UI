import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { describe, it, expect } from "vite-plus/test";
import DropdownMenuTestWrapper from "./dropdown-menu-test-wrapper.svelte";

describe("DropdownMenu", () => {
    it("renders trigger initially", () => {
        render(DropdownMenuTestWrapper);
        expect(screen.getByText("Open Menu")).toBeInTheDocument();
        // Content should not be in document initially
        expect(screen.queryByText("Profile")).not.toBeInTheDocument();
    });

    it("opens menu when trigger is clicked", async () => {
        render(DropdownMenuTestWrapper);
        const trigger = screen.getByText("Open Menu");

        await fireEvent.click(trigger);

        await waitFor(() => {
            expect(screen.getByText("Profile")).toBeInTheDocument();
            expect(screen.getByText("Settings")).toBeInTheDocument();
        });
    });

    it("closes menu when an item is clicked", async () => {
        render(DropdownMenuTestWrapper);
        const trigger = screen.getByText("Open Menu");

        await fireEvent.click(trigger);
        const item = await screen.findByText("Profile");

        await fireEvent.click(item);

        await waitFor(() => {
            expect(screen.queryByText("Profile")).not.toBeInTheDocument();
        });
    });

    it("closes menu when clicking backdrop", async () => {
        const { container } = render(DropdownMenuTestWrapper);
        const trigger = screen.getByText("Open Menu");

        await fireEvent.click(trigger);
        await screen.findByText("Profile");

        // The backdrop is the fixed inset-0 div
        // It's the last child usually or has z-40
        const backdrop = container.querySelector(".fixed.inset-0[role='presentation']");
        if (!backdrop) throw new Error("Backdrop not found");

        await fireEvent.click(backdrop);

        await waitFor(() => {
            expect(screen.queryByText("Profile")).not.toBeInTheDocument();
        });
    });

    it("only closes the top stacked menu on Escape", async () => {
        render(DropdownMenuTestWrapper);
        render(DropdownMenuTestWrapper);

        const triggers = screen.getAllByText("Open Menu");
        await fireEvent.click(triggers[0]);
        await fireEvent.click(triggers[1]);

        expect(screen.getAllByText("Profile")).toHaveLength(2);

        await fireEvent.keyDown(window, { key: "Escape" });

        await waitFor(() => {
            expect(screen.getAllByText("Profile")).toHaveLength(1);
        });
    });
});
