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

function createOverlayStackEntry(name: string) {
    const overlayId = Symbol(name);
    let active = false;
    let contentElement: HTMLElement | undefined;

    const content: Attachment<HTMLElement> = (element) => {
        contentElement = element;

        return () => {
            if (contentElement === element) contentElement = undefined;
        };
    };

    function getContentElement() {
        return contentElement;
    }

    function isTopOverlay() {
        return overlayStack[overlayStack.length - 1] === overlayId;
    }

    function activate() {
        if (active) return false;

        active = true;
        overlayStack.push(overlayId);
        return true;
    }

    function cleanup() {
        if (!active) {
            return {
                wasActive: false,
                wasTopOverlay: false,
            };
        }

        const wasTopOverlay = isTopOverlay();
        active = false;
        const index = overlayStack.indexOf(overlayId);
        if (index !== -1) overlayStack.splice(index, 1);
        return {
            wasActive: true,
            wasTopOverlay,
        };
    }

    return {
        content,
        getContentElement,
        isTopOverlay,
        activate,
        cleanup,
    };
}

export function useOverlayController(options: OverlayControllerOptions) {
    const stackEntry = createOverlayStackEntry("overlay");
    let previousFocus: HTMLElement | null = null;
    const { lock: scrollLock, unlock: scrollUnlock } = useScrollLock();

    function getFocusableElements(element: HTMLElement): HTMLElement[] {
        return Array.from(element.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
            (candidate) => candidate.tabIndex >= 0 && !candidate.hasAttribute("disabled"),
        );
    }

    function focusFirstElement() {
        const contentElement = stackEntry.getContentElement();
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

    function activate() {
        if (!stackEntry.activate()) return;
        scrollLock();
    }

    function cleanup() {
        const { wasActive, wasTopOverlay } = stackEntry.cleanup();
        if (!wasActive) return;

        scrollUnlock();

        if (wasTopOverlay) {
            restoreFocus();
        } else {
            previousFocus = null;
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (!isBrowser || !options.open() || !stackEntry.isTopOverlay()) return;

        if (event.key === "Escape") {
            event.preventDefault();
            event.stopImmediatePropagation();
            options.close();
            return;
        }

        if (event.key !== "Tab") return;

        const contentElement = stackEntry.getContentElement();
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
        content: stackEntry.content,
        handleKeydown,
        isTopOverlay: stackEntry.isTopOverlay,
    };
}

export function useDismissableOverlay(options: DismissableOverlayOptions) {
    const stackEntry = createOverlayStackEntry("dismissable-overlay");

    function handleKeydown(event: KeyboardEvent) {
        if (!isBrowser || !options.open() || !stackEntry.isTopOverlay()) return;
        if (event.key !== "Escape") return;

        event.preventDefault();
        event.stopImmediatePropagation();
        options.close();
    }

    $effect(() => {
        if (!isBrowser) return;

        if (!options.open()) {
            stackEntry.cleanup();
            return;
        }

        stackEntry.activate();
        return stackEntry.cleanup;
    });

    return {
        content: stackEntry.content,
        getContentElement: stackEntry.getContentElement,
        handleKeydown,
        isTopOverlay: stackEntry.isTopOverlay,
    };
}
