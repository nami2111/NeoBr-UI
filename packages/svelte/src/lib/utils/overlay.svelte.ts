import { tick } from "svelte";
import type { Attachment } from "svelte/attachments";
import { isBrowser } from "./browser";
import { useScrollLock } from "./scroll-lock.svelte";

const FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
].join(", ");

type OverlayControllerOptions = {
    open: () => boolean;
    close: () => void;
};

type DismissableOverlayOptions = {
    open: () => boolean;
    close: () => void;
};

const overlayStack: symbol[] = [];

export function useOverlayController(options: OverlayControllerOptions) {
    const overlayId = Symbol("overlay");
    let active = false;
    let contentElement: HTMLElement | undefined;
    let previousFocus: HTMLElement | null = null;
    const { lock: scrollLock, unlock: scrollUnlock } = useScrollLock();

    const content: Attachment<HTMLElement> = (element) => {
        contentElement = element;

        return () => {
            if (contentElement === element) contentElement = undefined;
        };
    };

    function getFocusableElements(element: HTMLElement): HTMLElement[] {
        return Array.from(element.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
            (candidate) => candidate.tabIndex >= 0 && !candidate.hasAttribute("disabled"),
        );
    }

    function focusFirstElement() {
        if (!contentElement) return;

        const focusable = getFocusableElements(contentElement);
        if (focusable.length > 0) {
            focusable[0].focus();
        } else {
            contentElement.focus();
        }
    }

    function restoreFocus() {
        if (!previousFocus) return;
        previousFocus.focus();
        previousFocus = null;
    }

    function isTopOverlay() {
        return overlayStack[overlayStack.length - 1] === overlayId;
    }

    function activate() {
        if (active) return;

        active = true;
        overlayStack.push(overlayId);
        scrollLock();
    }

    function cleanup() {
        if (!active) return;

        const shouldRestoreFocus = isTopOverlay();
        active = false;
        const index = overlayStack.indexOf(overlayId);
        if (index !== -1) overlayStack.splice(index, 1);
        scrollUnlock();

        if (shouldRestoreFocus) {
            restoreFocus();
        } else {
            previousFocus = null;
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (!isBrowser || !options.open() || !isTopOverlay()) return;

        if (event.key === "Escape") {
            event.preventDefault();
            event.stopImmediatePropagation();
            options.close();
            return;
        }

        if (event.key !== "Tab") return;

        if (!contentElement) return;

        const focusable = getFocusableElements(contentElement);
        if (focusable.length === 0) {
            event.preventDefault();
            return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            event.stopImmediatePropagation();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            event.stopImmediatePropagation();
            first.focus();
        }
    }

    $effect(() => {
        if (!isBrowser) return;

        if (!options.open()) {
            cleanup();
            return;
        }

        activate();
        previousFocus = document.activeElement as HTMLElement;
        tick().then(() => {
            if (options.open()) focusFirstElement();
        });

        return cleanup;
    });

    return {
        content,
        handleKeydown,
        isTopOverlay,
    };
}

export function useDismissableOverlay(options: DismissableOverlayOptions) {
    const overlayId = Symbol("dismissable-overlay");
    let active = false;
    let contentElement: HTMLElement | undefined;

    const content: Attachment<HTMLElement> = (element) => {
        contentElement = element;

        return () => {
            if (contentElement === element) contentElement = undefined;
        };
    };

    function isTopOverlay() {
        return overlayStack[overlayStack.length - 1] === overlayId;
    }

    function activate() {
        if (active) return;

        active = true;
        overlayStack.push(overlayId);
    }

    function cleanup() {
        if (!active) return;

        active = false;
        const index = overlayStack.indexOf(overlayId);
        if (index !== -1) overlayStack.splice(index, 1);
    }

    function getContentElement() {
        return contentElement;
    }

    function handleKeydown(event: KeyboardEvent) {
        if (!isBrowser || !options.open() || !isTopOverlay()) return;
        if (event.key !== "Escape") return;

        event.preventDefault();
        event.stopImmediatePropagation();
        options.close();
    }

    $effect(() => {
        if (!isBrowser) return;

        if (!options.open()) {
            cleanup();
            return;
        }

        activate();
        return cleanup;
    });

    return {
        content,
        getContentElement,
        handleKeydown,
        isTopOverlay,
    };
}
