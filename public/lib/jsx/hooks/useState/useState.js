import {resolveDispatcher} from "@/lib/jsx/hooks/dispatcher";

export const useState = (initialState) => {
    const dispatcher = resolveDispatcher();
    return dispatcher.useState(initialState);
}
