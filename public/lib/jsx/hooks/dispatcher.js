import {getCurrentVNode} from "@/lib/jsx";
import {getTakeHere, nodeToTake, rerender} from "@/lib/jsx/rerender";

const useState = (initialState) => {
    let vNode;
    if (getTakeHere()) {
        vNode = nodeToTake;
    } else {
        vNode = getCurrentVNode();
    }
    const index = vNode.stateCounter;
    const states = vNode.states;

    const setState = (val) => {
        states[index].value = val;
        const oldV = vNode;
        vNode.stateCounter = 0;
        const newRender = rerender.bind(null, oldV);
        newRender();
    }

    if (states[index] === undefined) {
        states[index] = {value: initialState, setState}
    }
    vNode.stateCounter = vNode.stateCounter + 1;

    return [states[index].value, states[index].setState]

}
export const resolveDispatcher = () => {
    return {useState};
}