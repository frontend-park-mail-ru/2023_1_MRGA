import {VNode} from "./types";
import {appendChildren, create, prepandChildren} from "./index";
import {cantRender} from "./utils";

export const render = (domElement: HTMLElement, virtualNode: VNode) => {
    if (cantRender(virtualNode)) {
        return ;
    }
    const newRoot = create(virtualNode);
    appendChildren(domElement, newRoot);
}

export const prerender = (domElement: HTMLElement, virtualNode: VNode) => {
    if (cantRender(virtualNode)) {
        return ;
    }
    const newRoot = create(virtualNode);
    prepandChildren(domElement, newRoot);
}
