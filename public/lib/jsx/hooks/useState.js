import {createElement, getCurrentVNode} from "@/lib/jsx/index.ts";
import {resolveDispatcher} from "@/lib/jsx/hooks/dispatcher";

export const useState = (initialState) => {
    const dispatcher = resolveDispatcher();
    return dispatcher.useState(initialState);
}