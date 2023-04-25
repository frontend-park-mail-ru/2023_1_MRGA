import {VNode} from "./types";
import {create} from "./index";

export const render = (domElement: HTMLElement, virtualNode: VNode) => {
    const newRoot = create(virtualNode);
    if (Array.isArray(newRoot)) {
        newRoot.forEach(e => domElement.appendChild(e));
        return;
    }
    domElement.appendChild(newRoot);
}