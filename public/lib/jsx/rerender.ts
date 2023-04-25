import {create, setCurrentVNode} from "./index";
import {updateComponent} from "./update";

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
    // const newDomElement = create(newElement);
    // domElement.replaceWith(newDomElement);
    updateComponent(domElement, oldElement, newElement);
    // oldVNode.domElement = newDomElement;
    oldVNode.oldElement = newElement;
}
