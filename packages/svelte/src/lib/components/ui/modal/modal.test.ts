import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vite-plus/test";
import { axe } from "vitest-axe";
import ModalTestWrapper from "./modal-test-wrapper.svelte";

describe("Modal Component", () => {
    it("should have no accessibility violations when open", async () => {
        const { container } = render(ModalTestWrapper, {
            props: { open: true, title: "Accessible Modal" },
        });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it("renders correctly when open", () => {
        render(ModalTestWrapper, { props: { open: true, title: "Test Modal" } });
        const modal = screen.getByRole("dialog");
        expect(modal).toBeInTheDocument();
        expect(screen.getByText("Test Modal")).toBeInTheDocument();
        expect(screen.getByText("Modal Content")).toBeInTheDocument();
    });

    it("does not render when closed", () => {
        render(ModalTestWrapper, { props: { open: false } });
        const modal = screen.queryByRole("dialog");
        expect(modal).not.toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", async () => {
        const onClose = vi.fn();
        render(ModalTestWrapper, { props: { open: true, onClose } });

        const closeButton = screen.getByLabelText("Close modal");
        await fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalled();
    });

    it("closes and updates bound variable when close button is clicked", async () => {
        render(ModalTestWrapper, { props: { open: true } });

        const closeButton = screen.getByLabelText("Close modal");
        await fireEvent.click(closeButton);

        await waitFor(() => {
            const modal = screen.queryByRole("dialog");
            expect(modal).not.toBeInTheDocument();
        });
    });

    it("closes when clicking on backdrop", async () => {
        const onClose = vi.fn();
        const { container } = render(ModalTestWrapper, { props: { open: true, onClose } });

        // The backdrop is the first div inside the dialog container usually, or we can find it by class or specific role if added.
        // In modal.svelte: <div class="bg-foreground/30 ... fixed inset-0" onclick={handleClose}>
        // It doesn't have a specific role, but we can try clicking the element that covers the screen.
        // Or better, let's verify the structure. The outer div is the container? content is separate.

        // Find the backdrop. It has `fixed inset-0 bg-foreground/30`.
        // We can query selector for it.
        const backdrop = container.querySelector(".backdrop-blur-sm");
        expect(backdrop).toBeInTheDocument();

        if (backdrop) {
            await fireEvent.click(backdrop);
            expect(onClose).toHaveBeenCalled();
        }
    });

    it("closes when Escape key is pressed", async () => {
        const onClose = vi.fn();
        render(ModalTestWrapper, { props: { open: true, onClose } });

        await fireEvent.keyDown(window, { key: "Escape" });

        expect(onClose).toHaveBeenCalled();
    });

    it("traps focus inside the modal", async () => {
        render(ModalTestWrapper, { props: { open: true } });

        const modal = screen.getByRole("dialog");
        // We need to wait for the tick() in the effect to run
        await waitFor(() => {
            expect(document.activeElement).not.toBe(document.body);
        });

        // Check if focus is within modal
        expect(modal.contains(document.activeElement)).toBe(true);
    });

    it("uses unique title IDs for simultaneous modals", () => {
        render(ModalTestWrapper, { props: { open: true, title: "First Modal" } });
        render(ModalTestWrapper, { props: { open: true, title: "Second Modal" } });

        const dialogs = screen.getAllByRole("dialog");
        const labelledBy = dialogs.map((dialog) => dialog.getAttribute("aria-labelledby"));

        expect(labelledBy[0]).toBeTruthy();
        expect(labelledBy[1]).toBeTruthy();
        expect(labelledBy[0]).not.toBe(labelledBy[1]);
        expect(document.getElementById(labelledBy[0] ?? "")).toBeInTheDocument();
        expect(document.getElementById(labelledBy[1] ?? "")).toBeInTheDocument();
    });
});
