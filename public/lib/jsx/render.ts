import {VNode} from "./types";
import {appendChildren, create} from "./index";
import {cantRender} from "./utils";

export const render = (domElement: HTMLElement, virtualNode: VNode) => {
    if (cantRender(virtualNode)) {
        return ;
    }
    const newRoot = create(virtualNode);
    appendChildren(domElement, newRoot);
}