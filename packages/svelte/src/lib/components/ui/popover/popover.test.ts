import { render, screen, fireEvent } from "@testing-library/svelte";
import { expect, test, describe } from "vite-plus/test";
import { axe } from "vitest-axe";
import PopoverTestWrapper from "./popover-test-wrapper.svelte";

describe("Popover component", () => {
    test("should have no accessibility violations when closed", async () => {
        const { container } = render(PopoverTestWrapper);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test("renders trigger button", () => {
        render(PopoverTestWrapper);
        const trigger = screen.getByRole("button", { name: /open popover/i });
        expect(trigger).toBeInTheDocument();
    });

    test("popover content is hidden by default", () => {
        render(PopoverTestWrapper);
        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });

    test("shows popover content when trigger is clicked", async () => {
        render(PopoverTestWrapper);
        const trigger = screen.getByRole("button", { name: /open popover/i });

        await fireEvent.click(trigger);
        expect(screen.getByText("Popover content")).toBeInTheDocument();
    });

    test("hides popover content when trigger is clicked again", async () => {
        render(PopoverTestWrapper);
        const trigger = screen.getByRole("button", { name: /open popover/i });

        await fireEvent.click(trigger);
        expect(screen.getByText("Popover content")).toBeInTheDocument();

        await fireEvent.click(trigger);
        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });

    test("closes on Escape key", async () => {
        render(PopoverTestWrapper);
        const trigger = screen.getByRole("button", { name: /open popover/i });

        await fireEvent.click(trigger);
        expect(screen.getByText("Popover content")).toBeInTheDocument();

        await fireEvent.keyDown(window, { key: "Escape" });
        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });

    test("trigger has aria-expanded attribute", async () => {
        render(PopoverTestWrapper);
        const trigger = screen.getByRole("button", { name: /open popover/i });

        expect(trigger).toHaveAttribute("aria-expanded", "false");

        await fireEvent.click(trigger);
        expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    test("applies custom className", () => {
        const { container } = render(PopoverTestWrapper, {
            props: { class: "custom-popover" },
        });
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass("custom-popover");
    });
});
