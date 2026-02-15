import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import AlertTestWrapper from "./alert-test-wrapper.svelte";

describe("Alert", () => {
    it("should have no accessibility violations", async () => {
        const { container } = render(AlertTestWrapper);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it("renders alert structure correctly", () => {
        render(AlertTestWrapper);
        expect(screen.getByText("Error occurred")).toBeInTheDocument();
        expect(screen.getByText("Your account has been suspended.")).toBeInTheDocument();

        // Assert role
        const alert = screen.getByRole("alert");
        expect(alert).toBeInTheDocument();
        // destructive variant has bg-destructive/10
        expect(alert).toHaveClass("bg-destructive/10");
        expect(alert).toHaveClass("text-destructive");
    });

    it("applies brutalist classes", () => {
        const { container } = render(AlertTestWrapper);
        const alertEl = container.querySelector('[role="alert"]');
        expect(alertEl).toHaveClass("border-2");
        expect(alertEl).toHaveClass("rounded-brutalist");
        expect(alertEl).toHaveClass("shadow-brutalist");
    });
});
