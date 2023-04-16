import {create} from "@/lib/jsx/index";
import {isArray, isFunction} from "@/lib/jsx/utils";

let takeHere = false;

export const getTakeHere = () => {
    return takeHere;
}

export const setTakeHere = (val) => {
    takeHere = val;
}

export let nodeToTake = null;
export const rerender = (oldV) => {
    setTakeHere(true);
    nodeToTake = oldV;
    const newV = oldV.type(oldV.props, oldV.children)
    // console.log("oldV name: ", oldV.oldV.type.name);
    // console.log("newV name: ", newV.type.name);
    // console.log("oldV: ", oldV.oldV);
    // console.log("newV: ", newV);
    const {result} = oldV;
    const newResult = _____(newV);
    result?.replaceWith(newResult);
    oldV.result = newResult;
    console.log(newResult);
    setTakeHere(false);
}

const _____ = (virtualNode) => {
    if (virtualNode.type === 'fragment') {
        return virtualNode.children.map(el => _____(el));
    }
    if (isArray(virtualNode)) {
        return virtualNode.map(el => _____(el));
    }
    if (isFunction(virtualNode.type)) {
        const vNode = virtualNode.type.call(null, virtualNode.props, virtualNode.children);
        return _____(vNode);
    }

    const {domNode} = HTMLNode(virtualNode);

    return domNode;
}

let textNode = 'textNode';
let htmlElement = 'htmlElement';

const HTMLNode = (virtualNode) => {
    if (typeof virtualNode === 'string') {
        const domNode = document.createTextNode(virtualNode);
        return {domNode, type: textNode};
    } else {
        const domNode = document.createElement(virtualNode.type);
        Object.entries(virtualNode.props || {}).forEach(([attr, value]) => {
            if (attr === 'className') {
                domNode.setAttribute('class', value);
            } else if (attr.startsWith('on')) {
                domNode.addEventListener(attr.slice(2).toLowerCase(), value);
            } else if (attr === 'ref') {
                value?.setValue(domNode);
            } else if (attr === 'htmlFor') {
                domNode.setAttribute('for', value);
            } else {
                domNode.setAttribute(attr, value);
            }
        });
        virtualNode.children.map(_____).forEach((childElement) => {
            if (isArray(childElement)) {
                childElement.forEach(e => domNode.appendChild(e));
            } else {
                domNode.appendChild(childElement);
            }
        });
        return {domNode, type: htmlElement};
    }
}

