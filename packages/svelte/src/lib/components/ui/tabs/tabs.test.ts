import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { describe, it, expect } from "vite-plus/test";
import { axe } from "vitest-axe";
import TabsTestWrapper from "./tabs-test-wrapper.svelte";

describe("Tabs", () => {
    it("should have no accessibility violations", async () => {
        const { container } = render(TabsTestWrapper);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it("renders default tab content", () => {
        render(TabsTestWrapper, { props: { value: "tab1" } });
        expect(screen.getByText("Make changes to your account here.")).toBeVisible();
        expect(screen.getByText("Change your password here.")).not.toBeVisible();

        const trigger1 = screen.getByRole("tab", { name: /account/i });
        expect(trigger1).toHaveAttribute("aria-selected", "true");
        expect(trigger1).toHaveClass("bg-primary");
    });

    it("switches tabs on click", async () => {
        render(TabsTestWrapper, { props: { value: "tab1" } });

        const trigger2 = screen.getByRole("tab", { name: /password/i });
        await fireEvent.click(trigger2);

        await waitFor(() => {
            expect(screen.getByText("Change your password here.")).toBeVisible();
            expect(screen.getByText("Make changes to your account here.")).not.toBeVisible();
            expect(trigger2).toHaveAttribute("aria-selected", "true");
            expect(trigger2).toHaveClass("bg-primary");
        });
    });

    it("renders active trigger style", () => {
        render(TabsTestWrapper, { props: { value: "tab1" } });
        const trigger = screen.getByRole("tab", { name: /account/i });
        expect(trigger).toHaveClass("bg-primary");
        expect(trigger).toHaveClass("text-primary-foreground");
    });

    it("uses unique trigger and panel IDs across tab groups", () => {
        render(TabsTestWrapper, { props: { value: "tab1" } });
        render(TabsTestWrapper, { props: { value: "tab1" } });

        const tabs = screen.getAllByRole("tab");
        const panels = Array.from(document.querySelectorAll<HTMLElement>('[role="tabpanel"]'));
        const ids = [...tabs, ...panels].map((element) => element.id);

        expect(ids).toHaveLength(8);
        expect(new Set(ids).size).toBe(ids.length);

        for (const tab of tabs) {
            expect(document.getElementById(tab.getAttribute("aria-controls") ?? "")).toBeTruthy();
        }

        for (const panel of panels) {
            expect(
                document.getElementById(panel.getAttribute("aria-labelledby") ?? ""),
            ).toBeTruthy();
        }
    });
});
