import { render, screen } from "@testing-library/svelte";
import { expect, describe, it } from "vite-plus/test";
import StickerTestWrapper from "./sticker-test-wrapper.svelte";

describe("Sticker component", () => {
    it("renders with default props", () => {
        render(StickerTestWrapper);
        expect(screen.getByText("Sticker text")).toBeInTheDocument();
    });

    it("has border-2 class", () => {
        const { container } = render(StickerTestWrapper);
        const sticker = container.querySelector(".border-2");
        expect(sticker).toBeInTheDocument();
    });

    it("applies default variant", () => {
        const { container } = render(StickerTestWrapper);
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("bg-background");
        expect(sticker).toHaveClass("text-foreground");
    });

    it("applies primary variant", () => {
        const { container } = render(StickerTestWrapper, {
            props: { variant: "primary" },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("bg-primary");
    });

    it("applies secondary variant", () => {
        const { container } = render(StickerTestWrapper, {
            props: { variant: "secondary" },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("bg-secondary");
    });

    it("applies success variant", () => {
        const { container } = render(StickerTestWrapper, {
            props: { variant: "success" },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("bg-success");
    });

    it("applies warning variant", () => {
        const { container } = render(StickerTestWrapper, {
            props: { variant: "warning" },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("bg-warning");
    });

    it("applies destructive variant", () => {
        const { container } = render(StickerTestWrapper, {
            props: { variant: "destructive" },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("bg-destructive");
    });

    it("applies pill shape", () => {
        const { container } = render(StickerTestWrapper, {
            props: { shape: "pill" },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("rounded-full");
    });

    it("applies circle shape", () => {
        const { container } = render(StickerTestWrapper, {
            props: { shape: "circle" },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("aspect-square");
        expect(sticker).toHaveClass("rounded-full");
    });

    it("applies custom rotation", () => {
        const { container } = render(StickerTestWrapper, {
            props: { rotation: 15 },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker.style.transform).toBe("rotate(15deg)");
    });

    it("applies deterministic zero rotation by default", () => {
        const { container } = render(StickerTestWrapper);
        const sticker = container.firstChild as HTMLElement;
        expect(sticker.style.transform).toBe("rotate(0deg)");
    });

    it("has uppercase text styling", () => {
        const { container } = render(StickerTestWrapper);
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("uppercase");
        expect(sticker).toHaveClass("font-black");
    });

    it("applies custom className", () => {
        const { container } = render(StickerTestWrapper, {
            props: { class: "custom-sticker" },
        });
        const sticker = container.firstChild as HTMLElement;
        expect(sticker).toHaveClass("custom-sticker");
    });
});
