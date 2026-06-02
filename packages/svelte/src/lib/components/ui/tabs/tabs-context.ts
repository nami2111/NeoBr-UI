import { createContext } from "svelte";

export type TabsState = {
    value: string | undefined;
    getTriggerId: (value: string) => string;
    getPanelId: (value: string) => string;
};

const [getTabsContext, setTabsContext] = createContext<TabsState | undefined>();

export function setTabsState(state: TabsState) {
    return setTabsContext(state);
}

export function getTabsState() {
    try {
        return getTabsContext();
    } catch (error) {
        if (isMissingContextError(error)) return undefined;
        throw error;
    }
}

export function requireTabsState(componentName: string) {
    const state = getTabsState();

    if (!state) {
        throw new Error(`${componentName} must be used inside a Tabs root.`);
    }

    return state;
}

function isMissingContextError(error: unknown) {
    return error instanceof Error && error.message.includes("missing_context");
}
