import { createContext } from "svelte";

export type CommandState = {
    search: string;
    visibleCount: number;
    onSearch: (value: string) => void;
    upsertItem: (id: string, value: string) => void;
    unregisterItem: (id: string) => void;
};

const [getCommandContext, setCommandContext] = createContext<CommandState | undefined>();

export function setCommandState(state: CommandState) {
    return setCommandContext(state);
}

export function getCommandState() {
    try {
        return getCommandContext();
    } catch (error) {
        if (isMissingContextError(error)) return undefined;
        throw error;
    }
}

function isMissingContextError(error: unknown) {
    return error instanceof Error && error.message.includes("missing_context");
}
