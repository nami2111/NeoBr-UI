import { render, screen } from "@testing-library/svelte";
import { createRawSnippet, hydrate, unmount } from "svelte";
import { expect, describe, it } from "vite-plus/test";
import { serverRenderSvelte } from "../../../../tests/ssr";
import Sticker from "./sticker.svelte";
import stickerSource from "./sticker.svelte?raw";

const children = createRawSnippet(() => ({ render: () => "Sticker text" }));

describe("Sticker component", () => {
    it("renders with default props", () => {
        render(Sticker, { props: { children } });
        expect(screen.getByText("Sticker text")).toBeInTheDocument();
    });

    it("has border-2 class", () => {
        const { container } = render(Sticker, { props: { children } });
        const sticker = container.querySelector(".border-2");
        expect(sticker).toBeInTheDocument();
    });

    it("applies default variant", () => {
        const { container } = render(Sticker, { props: { children } });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("bg-background");
        expect(sticker).toHaveClass("text-foreground");
    });

    it("applies primary variant", () => {
        const { container } = render(Sticker, {
            props: { variant: "primary", children },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("bg-primary");
    });

    it("applies secondary variant", () => {
        const { container } = render(Sticker, {
            props: { variant: "secondary", children },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("bg-secondary");
    });

    it("applies success variant", () => {
        const { container } = render(Sticker, {
            props: { variant: "success", children },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("bg-success");
    });

    it("applies warning variant", () => {
        const { container } = render(Sticker, {
            props: { variant: "warning", children },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("bg-warning");
    });

    it("applies destructive variant", () => {
        const { container } = render(Sticker, {
            props: { variant: "destructive", children },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("bg-destructive");
    });

    it("applies pill shape", () => {
        const { container } = render(Sticker, {
            props: { shape: "pill", children },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("rounded-full");
    });

    it("applies circle shape", () => {
        const { container } = render(Sticker, {
            props: { shape: "circle", children },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("aspect-square");
        expect(sticker).toHaveClass("rounded-full");
    });

    it("applies custom rotation", () => {
        const { container } = render(Sticker, {
            props: { rotation: 15, children },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker.style.transform).toBe("rotate(15deg)");
    });

    it("applies deterministic zero rotation by default", () => {
        const { container } = render(Sticker, { props: { children } });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker.style.transform).toBe("rotate(0deg)");
    });

    it("hydrates with deterministic default rotation", async () => {
        const container = document.createElement("div");
        container.innerHTML = await serverRenderSvelte(stickerSource, "sticker.svelte");
        document.body.appendChild(container);

        const serverSticker = container.querySelector<HTMLElement>(".inline-block");
        expect(serverSticker?.style.transform).toBe("rotate(0deg)");

        const component = hydrate(Sticker, { target: container });

        const clientSticker = container.querySelector<HTMLElement>(".inline-block");
        expect(clientSticker?.style.transform).toBe("rotate(0deg)");

        unmount(component);
        container.remove();
    });

    it("has uppercase text styling", () => {
        const { container } = render(Sticker, { props: { children } });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("uppercase");
        expect(sticker).toHaveClass("font-black");
    });

    it("applies custom className", () => {
        const { container } = render(Sticker, {
            props: { class: "custom-sticker", children },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("custom-sticker");
    });
});
