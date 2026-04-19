import { render, screen, fireEvent } from "@testing-library/svelte";
import { expect, test, describe, vi } from "vite-plus/test";
import { axe } from "vitest-axe";
import WindowTestWrapper from "./window-test-wrapper.svelte";

describe("Window component", () => {
    test("should have no accessibility violations", async () => {
        const { container } = render(WindowTestWrapper);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test("renders with default title", () => {
        render(WindowTestWrapper);
        expect(screen.getByText("Window")).toBeInTheDocument();
    });

    test("renders with custom title", () => {
        render(WindowTestWrapper, { props: { title: "My App" } });
        expect(screen.getByText("My App")).toBeInTheDocument();
    });

    test("renders children content", () => {
        render(WindowTestWrapper);
        expect(screen.getByText("Window content here")).toBeInTheDocument();
    });

    test("renders close button by default", () => {
        render(WindowTestWrapper);
        const closeBtn = screen.getByRole("button", { name: /close/i });
        expect(closeBtn).toBeInTheDocument();
    });

    test("renders minimize button by default", () => {
        render(WindowTestWrapper);
        const minBtn = screen.getByRole("button", { name: /minimize/i });
        expect(minBtn).toBeInTheDocument();
    });

    test("renders maximize button by default", () => {
        render(WindowTestWrapper);
        const maxBtn = screen.getByRole("button", { name: /maximize/i });
        expect(maxBtn).toBeInTheDocument();
    });

    test("calls onClose when close button is clicked", async () => {
        const onClose = vi.fn();
        render(WindowTestWrapper, { props: { onClose } });
        const closeBtn = screen.getByRole("button", { name: /close/i });

        await fireEvent.click(closeBtn);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test("hides close button when closable is false", () => {
        render(WindowTestWrapper, { props: { closable: false } });
        expect(screen.queryByRole("button", { name: /close/i })).not.toBeInTheDocument();
    });

    test("hides minimize button when minimizable is false", () => {
        render(WindowTestWrapper, { props: { minimizable: false } });
        expect(screen.queryByRole("button", { name: /minimize/i })).not.toBeInTheDocument();
    });

    test("hides maximize button when maximizable is false", () => {
        render(WindowTestWrapper, { props: { maximizable: false } });
        expect(screen.queryByRole("button", { name: /maximize/i })).not.toBeInTheDocument();
    });

    test("applies container-brutalist class", () => {
        const { container } = render(WindowTestWrapper);
        const windowEl = container.querySelector(".container-brutalist");
        expect(windowEl).toBeInTheDocument();
    });

    test("applies custom className", () => {
        const { container } = render(WindowTestWrapper, {
            props: { class: "custom-window" },
        });
        const windowEl = container.querySelector(".custom-window");
        expect(windowEl).toBeInTheDocument();
    });

    test("title bar has primary background", () => {
        const { container } = render(WindowTestWrapper);
        const titleBar = container.querySelector(".bg-primary");
        expect(titleBar).toBeInTheDocument();
    });
});
