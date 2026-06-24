import { render, screen, fireEvent } from "@testing-library/svelte";
import { expect, test, describe } from "vite-plus/test";
import { axe } from "vitest-axe";
import { createRawSnippet } from "svelte";
import Toggle from "./toggle.svelte";

const label = createRawSnippet(() => ({ render: () => "Toggle me" }));

describe("Toggle component", () => {
    test("should have no accessibility violations", async () => {
        const { container } = render(Toggle, { props: { children: label } });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test("renders with default props", () => {
        render(Toggle, { props: { children: label } });
        const toggle = screen.getByRole("button", { name: /toggle me/i });
        expect(toggle).toBeInTheDocument();
    });

    test("has aria-pressed attribute", () => {
        render(Toggle, { props: { children: label } });
        const toggle = screen.getByRole("button", { name: /toggle me/i });
        expect(toggle).toHaveAttribute("aria-pressed", "false");
    });

    test("toggles pressed state on click", async () => {
        render(Toggle, { props: { children: label } });
        const toggle = screen.getByRole("button", { name: /toggle me/i });

        expect(toggle).toHaveAttribute("aria-pressed", "false");
        await fireEvent.click(toggle);
        expect(toggle).toHaveAttribute("aria-pressed", "true");
        await fireEvent.click(toggle);
        expect(toggle).toHaveAttribute("aria-pressed", "false");
    });

    test("applies default variant classes", () => {
        render(Toggle, { props: { children: label } });
        const toggle = screen.getByRole("button");
        expect(toggle).toHaveClass("border-2");
        expect(toggle).toHaveClass("rounded-brutalist");
    });

    test("applies outline variant", () => {
        render(Toggle, { props: { variant: "outline", children: label } });
        const toggle = screen.getByRole("button");
        expect(toggle).toHaveClass("bg-transparent");
    });

    test("applies pressed styling", async () => {
        render(Toggle, { props: { children: label } });
        const toggle = screen.getByRole("button");

        await fireEvent.click(toggle);
        expect(toggle).toHaveClass("bg-primary");
    });

    test("is disabled when disabled prop is true", () => {
        render(Toggle, { props: { disabled: true, children: label } });
        const toggle = screen.getByRole("button");
        expect(toggle).toBeDisabled();
    });

    test("applies custom className", () => {
        render(Toggle, { props: { class: "custom-toggle", children: label } });
        const toggle = screen.getByRole("button");
        expect(toggle).toHaveClass("custom-toggle");
    });

    test("has cursor-pointer class", () => {
        render(Toggle, { props: { children: label } });
        const toggle = screen.getByRole("button");
        expect(toggle).toHaveClass("cursor-pointer");
    });
});
