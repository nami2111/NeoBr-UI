import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { expect, test, describe } from "vite-plus/test";
import { axe } from "vitest-axe";
import SelectTestWrapper from "./select-test-wrapper.svelte";

describe("Select component", () => {
    const testItems = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    async function openSelect(trigger: HTMLElement) {
        await fireEvent.pointerDown(trigger, {
            button: 0,
            ctrlKey: false,
            pointerId: 1,
            pointerType: "mouse",
        });
    }

    test("should have no accessibility violations", async () => {
        const { container } = render(SelectTestWrapper, { props: { items: testItems } });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test("renders with default props", () => {
        render(SelectTestWrapper, { props: { items: testItems } });
        const trigger = screen.getByRole("button");
        expect(trigger).toBeInTheDocument();
        expect(trigger).toHaveTextContent("Select an option");
    });

    test("opens dropdown from pointer interaction", async () => {
        render(SelectTestWrapper, { props: { items: testItems } });
        const trigger = screen.getByRole("button");

        await openSelect(trigger);

        await waitFor(() => {
            expect(screen.getByText("Option 1")).toBeInTheDocument();
            expect(screen.getByText("Option 2")).toBeInTheDocument();
            expect(screen.getByText("Option 3")).toBeInTheDocument();
        });
    });

    test("selects an option from pointer interaction", async () => {
        render(SelectTestWrapper, { props: { items: testItems } });
        const trigger = screen.getByRole("button");

        await openSelect(trigger);
        const option1 = await screen.findByText("Option 1");

        await fireEvent.pointerUp(option1, { button: 0, pointerId: 1, pointerType: "mouse" });

        await waitFor(() => {
            expect(trigger).toHaveTextContent("Option 1");
        });
    });

    test("is disabled when disabled prop is true", () => {
        render(SelectTestWrapper, { props: { items: testItems, disabled: true } });
        const trigger = screen.getByRole("button");
        expect(trigger).toBeDisabled();
    });

    test("supports single selection mode", async () => {
        render(SelectTestWrapper, { props: { items: testItems, type: "single" } });
        const trigger = screen.getByRole("button");

        await openSelect(trigger);

        await waitFor(() => {
            expect(screen.getByText("Option 1")).toBeInTheDocument();
        });
    });

    test("displays placeholder when no value selected", () => {
        render(SelectTestWrapper, { props: { items: testItems } });
        const trigger = screen.getByRole("button");
        expect(trigger).toHaveTextContent("Select an option");
    });

    test("closes dropdown from Escape key", async () => {
        render(SelectTestWrapper, { props: { items: testItems } });
        const trigger = screen.getByRole("button");

        await openSelect(trigger);
        expect(await screen.findByText("Option 1")).toBeInTheDocument();

        await fireEvent.keyDown(trigger, { key: "Escape" });

        await waitFor(() => {
            expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
        });
    });

    test("applies custom className to trigger", () => {
        render(SelectTestWrapper, { props: { items: testItems } });
        const trigger = screen.getByRole("button");
        expect(trigger).toHaveClass("border-foreground");
        expect(trigger).toHaveClass("shadow-brutalist");
    });

    test("opens dropdown from keyboard interaction", async () => {
        render(SelectTestWrapper, { props: { items: testItems } });
        const trigger = screen.getByRole("button");

        trigger.focus();
        await fireEvent.keyDown(trigger, { key: "Enter" });

        await waitFor(() => {
            expect(screen.getByText("Option 1")).toBeInTheDocument();
        });
    });
});
