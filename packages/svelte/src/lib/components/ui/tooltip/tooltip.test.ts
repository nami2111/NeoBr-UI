import { render as renderClient, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { hydrate, unmount } from "svelte";
import { describe, it, expect } from "vite-plus/test";
import { serverRenderSvelte } from "../../../../tests/ssr";
import Tooltip from "./tooltip.svelte";
import tooltipSource from "./tooltip.svelte?raw";

describe("Tooltip", () => {
    it("shows content on mouse enter and hides on mouse leave", async () => {
        renderClient(Tooltip, { content: "Helpful info" });

        const trigger = screen.getByRole("button");
        expect(screen.queryByText("Helpful info")).toBeNull();

        await fireEvent.mouseEnter(trigger);
        expect(screen.getByText("Helpful info")).toBeTruthy();

        await fireEvent.mouseLeave(trigger);
        await waitFor(
            () => {
                expect(screen.queryByText("Helpful info")).toBeNull();
            },
            { timeout: 2000 },
        );
    });

    it("applies the radius prop to the content", () => {
        renderClient(Tooltip, { content: "Radius info", open: true, radius: "rounded" });
        const content = screen.getByRole("tooltip");
        expect(content).toHaveClass("rounded-brutalist-rounded");
        expect(content).not.toHaveClass("rounded-brutalist");
    });

    it("hydrates with a stable tooltip ID when initially open", async () => {
        const props = { content: "Initial info", open: true };
        const container = document.createElement("div");
        container.innerHTML = await serverRenderSvelte(tooltipSource, "tooltip.svelte", props);
        document.body.appendChild(container);

        const serverTrigger = container.querySelector<HTMLButtonElement>("button");
        const serverTooltip = container.querySelector<HTMLElement>("[role='tooltip']");
        expect(serverTooltip?.id).toBeTruthy();
        expect(serverTrigger).toHaveAttribute("aria-describedby", serverTooltip?.id);

        const component = hydrate(Tooltip, { target: container, props });

        const clientTrigger = container.querySelector<HTMLButtonElement>("button");
        const clientTooltip = container.querySelector<HTMLElement>("[role='tooltip']");
        expect(clientTooltip?.id).toBe(serverTooltip?.id);
        expect(clientTrigger).toHaveAttribute("aria-describedby", serverTooltip?.id);

        unmount(component);
        container.remove();
    });
});
