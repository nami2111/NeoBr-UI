import { render, screen, fireEvent } from "@testing-library/svelte";
import { expect, test, describe } from "vite-plus/test";
import { axe } from "vitest-axe";
import CollapsibleTestWrapper from "./collapsible-test-wrapper.svelte";
import CollapsibleTrigger from "./collapsible-trigger.svelte";
import CollapsibleContent from "./collapsible-content.svelte";

describe("Collapsible component", () => {
    test("should have no accessibility violations", async () => {
        const { container } = render(CollapsibleTestWrapper);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test("renders trigger button", () => {
        render(CollapsibleTestWrapper);
        const trigger = screen.getByRole("button", { name: /toggle/i });
        expect(trigger).toBeInTheDocument();
    });

    test("content is hidden by default", () => {
        render(CollapsibleTestWrapper);
        expect(screen.queryByText("Collapsible content")).not.toBeInTheDocument();
    });

    test("shows content when trigger is clicked", async () => {
        render(CollapsibleTestWrapper);
        const trigger = screen.getByRole("button", { name: /toggle/i });

        await fireEvent.click(trigger);
        expect(screen.getByText("Collapsible content")).toBeInTheDocument();
    });

    test("hides content when trigger is clicked again", async () => {
        render(CollapsibleTestWrapper);
        const trigger = screen.getByRole("button", { name: /toggle/i });

        await fireEvent.click(trigger);
        expect(screen.getByText("Collapsible content")).toBeInTheDocument();

        await fireEvent.click(trigger);
        expect(screen.queryByText("Collapsible content")).not.toBeInTheDocument();
    });

    test("sets data-state attribute correctly", async () => {
        const { container } = render(CollapsibleTestWrapper);
        const root = container.querySelector("[data-state]");
        expect(root).toHaveAttribute("data-state", "closed");

        const trigger = screen.getByRole("button", { name: /toggle/i });
        await fireEvent.click(trigger);
        expect(root).toHaveAttribute("data-state", "open");
    });

    test("trigger has aria-expanded attribute", async () => {
        render(CollapsibleTestWrapper);
        const trigger = screen.getByRole("button", { name: /toggle/i });

        expect(trigger).toHaveAttribute("aria-expanded", "false");
        await fireEvent.click(trigger);
        expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    test("disables toggle when disabled prop is true", async () => {
        render(CollapsibleTestWrapper, { props: { disabled: true } });
        const trigger = screen.getByRole("button", { name: /toggle/i });

        expect(trigger).toBeDisabled();
        await fireEvent.click(trigger);
        expect(screen.queryByText("Collapsible content")).not.toBeInTheDocument();
    });

    test("subcomponents support deliberate standalone fallback behavior", () => {
        render(CollapsibleTrigger, { props: { "aria-label": "Standalone trigger" } });
        const trigger = screen.getByRole("button", { name: "Standalone trigger" });
        expect(trigger).toBeInTheDocument();
        expect(trigger).not.toBeDisabled();
        expect(trigger).not.toHaveAttribute("aria-expanded");

        const { container } = render(CollapsibleContent);
        expect(container.children).toHaveLength(0);
    });
});
