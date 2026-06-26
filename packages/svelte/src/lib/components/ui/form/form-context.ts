import { createContext } from "svelte";

export type FormItemState = {
    error: string | boolean | undefined;
};

const [getFormItemStateContext, setFormItemStateContext] = createContext<
    FormItemState | undefined
>();

export function setFormItemContext(state: FormItemState) {
    return setFormItemStateContext(state);
}

export function getFormItemContext() {
    try {
        return getFormItemStateContext();
    } catch (error) {
        if (isMissingContextError(error)) return undefined;
        throw error;
    }
}

function isMissingContextError(error: unknown) {
    return error instanceof Error && error.message.includes("missing_context");
}
