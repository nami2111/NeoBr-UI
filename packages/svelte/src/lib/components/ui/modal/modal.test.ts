import { render, screen, fireEvent } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import Modal from "./modal.svelte";
import { tick } from "svelte";

describe("Modal Component", () => {
    it("does not render when open is false", () => {
        render(Modal, { open: false });
        const modal = screen.queryByRole("dialog");
        expect(modal).not.toBeInTheDocument();
    });

    it("renders when open is true", () => {
        render(Modal, { open: true, title: "Test Modal" });
        const modal = screen.getByRole("dialog");
        expect(modal).toBeInTheDocument();
        expect(screen.getByText("Test Modal")).toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", async () => {
        const onClose = vi.fn();
        render(Modal, { open: true, onClose });

        const closeButton = screen.getByLabelText("Close modal");
        await fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalled();
    });

    it("closes when Escape key is pressed", async () => {
        const onClose = vi.fn();
        render(Modal, { open: true, onClose });

        await fireEvent.keyDown(window, { key: "Escape" });

        expect(onClose).toHaveBeenCalled();
    });

    // Note: specific focus trap testing often requires real browser behavior 
    // or extensive mocking in JSDOM, skipping for now to focus on logic coverage.
});
