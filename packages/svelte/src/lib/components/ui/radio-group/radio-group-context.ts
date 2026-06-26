import { createContext } from "svelte";

export type RadioGroupState = {
    value: string | undefined;
    disabled: boolean;
    name: string | undefined;
};

const [getRadioGroupContext, setRadioGroupContext] = createContext<RadioGroupState | undefined>();

export function setRadioGroupState(state: RadioGroupState) {
    return setRadioGroupContext(state);
}

export function getRadioGroupState() {
    try {
        return getRadioGroupContext();
    } catch (error) {
        if (isMissingContextError(error)) return undefined;
        throw error;
    }
}

export function requireRadioGroupState(componentName = "RadioGroupItem") {
    const state = getRadioGroupState();

    if (!state) {
        throw new Error(`${componentName} must be used inside a RadioGroup root.`);
    }

    return state;
}

function isMissingContextError(error: unknown) {
    return error instanceof Error && error.message.includes("missing_context");
}
