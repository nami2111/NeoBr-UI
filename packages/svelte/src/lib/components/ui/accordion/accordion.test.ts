import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import AccordionTestWrapper from "./accordion-test-wrapper.svelte";

describe("Accordion", () => {
    it("should have no accessibility violations", async () => {
        const { container } = render(AccordionTestWrapper);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it("renders accordion items and triggers", () => {
        render(AccordionTestWrapper);
        expect(screen.getByText("Is it accessible?")).toBeInTheDocument();
        expect(screen.getByText("Is it styled?")).toBeInTheDocument();
    });

    it("expands content when trigger is clicked", async () => {
        render(AccordionTestWrapper);
        const trigger = screen.getByText("Is it accessible?");
        const contentText = "Yes. It adheres to the WAI-ARIA design pattern.";

        // Content should not be visible initially (bits-ui handles visibility)
        expect(screen.queryByText(contentText)).not.toBeVisible();

        await fireEvent.click(trigger);

        await waitFor(() => {
            expect(screen.getByText(contentText)).toBeVisible();
        });
    });

    it("closes previous item when new item is opened in 'single' mode", async () => {
        render(AccordionTestWrapper, { props: { type: "single" } });

        const trigger1 = screen.getByText("Is it accessible?");
        const trigger2 = screen.getByText("Is it styled?");
        const content1 = "Yes. It adheres to the WAI-ARIA design pattern.";
        const content2 = "Yes. It comes with premium Neo-Brutalist styling.";

        await fireEvent.click(trigger1);
        await waitFor(() => expect(screen.getByText(content1)).toBeVisible());

        await fireEvent.click(trigger2);
        await waitFor(() => {
            expect(screen.getByText(content2)).toBeVisible();
            expect(screen.queryByText(content1)).not.toBeVisible();
        });
    });
});
