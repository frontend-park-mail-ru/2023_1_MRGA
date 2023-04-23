import {setCurrentVNode} from "./index";
import {updateComponent} from "/lib/jsx/update.js";

let counter = 0;
// @ts-ignore
let debug = process.env.NODE_ENV === 'development';
export const rerender = (oldVNode) => {
    if (debug) {
        console.log(counter);
    }
    const {domElement, oldElement} = oldVNode;
    setCurrentVNode(oldVNode);
    const newElement = oldVNode.type(oldVNode.props, oldVNode.children);
    updateComponent(domElement, oldElement, newElement);
    oldVNode.oldElement = newElement;
    console.log(oldVNode);
}
