import { render, screen, fireEvent } from "@testing-library/svelte";
import { expect, test, describe, vi } from "vite-plus/test";
import { axe } from "vitest-axe";
import { createRawSnippet } from "svelte";
import Window from "./window.svelte";

const children = createRawSnippet(() => ({ render: () => "Window content here" }));

describe("Window component", () => {
    test("should have no accessibility violations", async () => {
        const { container } = render(Window, { props: { children } });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test("renders with default title", () => {
        render(Window, { props: { children } });
        expect(screen.getByText("Window")).toBeInTheDocument();
    });

    test("applies the radius prop", () => {
        const { container } = render(Window, { props: { radius: "rounded", children } });
        const win = container.firstElementChild;
        expect(win).toHaveClass("rounded-brutalist-rounded");
        expect(win).not.toHaveClass("rounded-brutalist");
    });

    test("renders with custom title", () => {
        render(Window, { props: { title: "My App", children } });
        expect(screen.getByText("My App")).toBeInTheDocument();
    });

    test("renders children content", () => {
        render(Window, { props: { children } });
        expect(screen.getByText("Window content here")).toBeInTheDocument();
    });

    test("renders close button by default", () => {
        render(Window, { props: { children } });
        const closeBtn = screen.getByRole("button", { name: /close/i });
        expect(closeBtn).toBeInTheDocument();
    });

    test("renders minimize button by default", () => {
        render(Window, { props: { children } });
        const minBtn = screen.getByRole("button", { name: /minimize/i });
        expect(minBtn).toBeInTheDocument();
    });

    test("renders maximize button by default", () => {
        render(Window, { props: { children } });
        const maxBtn = screen.getByRole("button", { name: /maximize/i });
        expect(maxBtn).toBeInTheDocument();
    });

    test("calls onClose when close button is clicked", async () => {
        const onClose = vi.fn();
        render(Window, { props: { onClose, children } });
        const closeBtn = screen.getByRole("button", { name: /close/i });

        await fireEvent.click(closeBtn);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test("hides close button when closable is false", () => {
        render(Window, { props: { closable: false, children } });
        expect(screen.queryByRole("button", { name: /close/i })).not.toBeInTheDocument();
    });

    test("hides minimize button when minimizable is false", () => {
        render(Window, { props: { minimizable: false, children } });
        expect(screen.queryByRole("button", { name: /minimize/i })).not.toBeInTheDocument();
    });

    test("hides maximize button when maximizable is false", () => {
        render(Window, { props: { maximizable: false, children } });
        expect(screen.queryByRole("button", { name: /maximize/i })).not.toBeInTheDocument();
    });

    test("applies brutalist container styling", () => {
        const { container } = render(Window, { props: { children } });
        const windowEl = container.querySelector(".rounded-brutalist.border-2");
        expect(windowEl).toBeInTheDocument();
    });

    test("applies custom className", () => {
        const { container } = render(Window, {
            props: { class: "custom-window", children },
        });
        const windowEl = container.querySelector(".custom-window");
        expect(windowEl).toBeInTheDocument();
    });

    test("title bar has primary background", () => {
        const { container } = render(Window, { props: { children } });
        const titleBar = container.querySelector(".bg-primary");
        expect(titleBar).toBeInTheDocument();
    });
});
