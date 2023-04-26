import {VNode} from "./types";
import {appendChildren, create} from "./index";

export const render = (domElement: HTMLElement, virtualNode: VNode) => {
    const newRoot = create(virtualNode);
    appendChildren(domElement, newRoot);

}