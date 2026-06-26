import { createContext } from "svelte";

export type ToggleGroupType = "single" | "multiple";
export type ToggleGroupValue = string | string[];

export type ToggleGroupState = {
    value: ToggleGroupValue;
    type: ToggleGroupType;
    setValue: (value: string) => void;
};

const [getToggleGroupContext, setToggleGroupContext] = createContext<
    ToggleGroupState | undefined
>();

export function setToggleGroupState(state: ToggleGroupState) {
    return setToggleGroupContext(state);
}

export function getToggleGroupState() {
    try {
        return getToggleGroupContext();
    } catch (error) {
        if (isMissingContextError(error)) return undefined;
        throw error;
    }
}

export function requireToggleGroupState(componentName = "ToggleGroupItem") {
    const state = getToggleGroupState();

    if (!state) {
        throw new Error(`${componentName} must be used inside a ToggleGroup root.`);
    }

    return state;
}

function isMissingContextError(error: unknown) {
    return error instanceof Error && error.message.includes("missing_context");
}
