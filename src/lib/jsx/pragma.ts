import {Child, fragment, JSX, Props, VNode} from "./types";

window.createElement = fragment;

window.h = (type: JSX, props: Props, ...children: Child[]): VNode => {
    if (props === null) {
        props = [];
    }
    if (children === null) {
        children = [];
    }
    return {type, props, children};
}
