import { createContext } from "svelte";

export type CollapsibleState = {
    open: boolean;
    toggle: () => void;
    disabled: boolean;
};

const [getCollapsibleContext, setCollapsibleContext] = createContext<
    CollapsibleState | undefined
>();

export function setCollapsibleState(state: CollapsibleState) {
    return setCollapsibleContext(state);
}

export function getCollapsibleState() {
    try {
        return getCollapsibleContext();
    } catch (error) {
        if (isMissingContextError(error)) return undefined;
        throw error;
    }
}

function isMissingContextError(error: unknown) {
    return error instanceof Error && error.message.includes("missing_context");
}
