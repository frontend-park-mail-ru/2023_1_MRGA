import {getCurrentVNode} from "@/lib/jsx";
import {rerender} from "@/lib/jsx/rerender";

export const useState = (initialState) => {
    const vNode = getCurrentVNode();
    const index = vNode.stateCounter;
    const states = vNode.states;

    const setState = (val) => {
        states[index].value = val;
        vNode.stateCounter = 0;
        rerender(vNode);
    }

    if (states[index] === undefined) {
        states[index] = {value: initialState, setState}
    }
    vNode.stateCounter = vNode.stateCounter + 1;

    return [states[index].value, states[index].setState]

}
