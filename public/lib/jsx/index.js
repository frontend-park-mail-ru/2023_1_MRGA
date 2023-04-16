import {isArray, isFunction} from "@/lib/jsx/utils";
import {frl} from "@/lib/jsx/rerender";

/** @jsx window.h */



let currentVNode = null;

export const setCurrentVNode = (node) => {
    currentVNode = node;
}
export const getCurrentVNode = () => {
    return currentVNode
}

window.h = (type, props, ...children) => {
    // console.log("type: ", type, "props: ", props, "children: ", children);
    return {type, props, children};
}

export const createElement = 'fragment';

let textNode = 'textNode';
let htmlElement = 'htmlElement';
const createHTMLNode = (virtualNode) => {
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
        virtualNode.children.map(create).forEach((childElement) => {
            if (isArray(childElement)) {
                childElement.forEach(e => domNode.appendChild(e));
            } else {
                domNode.appendChild(childElement);
            }
        });
        return {domNode, type: htmlElement};
    }
}



export const insertAfter = (sibling, node) => {
    if (sibling === null) {
        root.appendChild(node);
        return ;
    }
    if (node === 'skip') {
        return;
    }
    if (sibling.nodeType === Node.TEXT_NODE) {
        const parent = sibling.parentNode;
        parent.insertAfter(sibling, node);
    } else {
        if (node.nodeType === Node.TEXT_NODE) {
            sibling.appendChild(node);
        } else {
            sibling.insertAdjacentElement('afterend', node);
        }
    }
}

export const create = (virtualNode) => {
    if (virtualNode.type === 'fragment') {
        return virtualNode.children.map(el => create(el));
    }
    if (isArray(virtualNode)) {
        return virtualNode.map(el => create(el));
    }
    if (isFunction(virtualNode.type)) {
        setCurrentVNode(virtualNode);
        virtualNode.states = [];
        virtualNode.stateCounter = 0;
        let node = virtualNode;
        const vNode = virtualNode.type.call(null, virtualNode.props, virtualNode.children);
        node.oldV = vNode;
        let result = create(vNode);
        node.result = result;
        return result;
    }

    const {domNode, type} = createHTMLNode(virtualNode);
    return domNode;
}

export const update = (rootElement, currNode, nextNode, index = 0) => {
    const newRoot = create(nextNode, undefined);
    if (isArray(newRoot)) {
        newRoot.forEach(e => rootElement.appendChild(e));
        return;
    }
    rootElement.appendChild(newRoot);
    // if (!nextNode) {
    //     rootElement.removeChild(rootElement.childNodes[index]);
    // } else if (!currNode) {
    //     rootElement.appendChild(createElement(nextNode));
    // } else if (changed(currNode, nextNode)) {
    //     if (rootElement.childNodes.length === 0) {
    //         rootElement.appendChild(createElement(nextNode));
    //     } else {
    //         rootElement.replaceChild(createElement(nextNode), rootElement.childNodes[index]);
    //     }
    // } else if (typeof nextNode !== 'string') {
    //     for (let i = 0; i < Math.max(currNode.children.length, nextNode.children.length); i++) {
    //         update(rootElement.childNodes[index], currNode.children[i], nextNode.children[i], i);
    //     }
    // }
}

export const changed = (nodeA, nodeB) => {
    return (
        typeof nodeA !== typeof nodeB ||
        typeof nodeA === 'string' && nodeA !== nodeB ||
        nodeA.type !== nodeB.type
    );
}

let root;
let vRoot;

export const render = (virtualRoot) => {
    if (virtualRoot === null) {
        return ;
    }
    root.innerHTML = '';
    update(root, vRoot, virtualRoot, 0);
    vRoot = virtualRoot;
}

export const innerRender = (virtualRoot, root) => {
    if (virtualRoot === null) {
        return ;
    }
    vRoot = virtualRoot;
    const element = create(virtualRoot);
    if (element) {
        root.appendChild(element);
    }
}

export const createRoot = (container) => {
    root = container;
    const render = (virtualRoot) => {
        innerRender(virtualRoot, root);
    }
    return {render};
}