import './pragma.ts'
import {fragment, VirtualNodeArray, VNode} from './types'
import {IUseRefResult} from "./hooks/useRef/useRefImpl";
import {updateComponent} from "./update";
import {cantRender} from "./utils";


let currentVNode = null;

export const setCurrentVNode = (node) => {
    currentVNode = node;
}
export const getCurrentVNode = () => {
    return currentVNode
}


let textNode = 'textNode';
let htmlElement = 'htmlElement';
const createHTMLNode = (virtualNode) => {
    if (typeof virtualNode === 'string') {
        const domNode = document.createTextNode(virtualNode);
        return {domNode, type: textNode};
    } else if (typeof virtualNode === 'number') {
        const domNode = document.createTextNode(virtualNode.toString());
        return {domNode, type: textNode};
    } else {
        const domNode = document.createElement(virtualNode.type);
        Object.entries(virtualNode.props || {}).forEach(([attr, value]) => {
            if (attr === 'className' && typeof value === "string") {
                domNode.setAttribute('class', value);
            } else if (attr.startsWith('on')) {
                domNode.addEventListener(attr.slice(2).toLowerCase(), value);
            } else if (attr === 'ref') {
                (value as IUseRefResult<any>)?.setValue(domNode);
            } else {
                domNode[attr] = value;
            }
        });
        virtualNode?.children.map(create).forEach((appendChildren.bind(null, domNode)));
        return {domNode, type: htmlElement};
    }
}


export const appendChildren = (domNode, children) => {
    if (Array.isArray(children)) {
        children.forEach(e => appendChildren(domNode, e));
    } else {
        domNode.appendChild(children);
    }
}

export const removeChildren = (domNode, children) => {
    if (Array.isArray(children)) {
        children.forEach(e => removeChildren(domNode, e));
    } else {
        domNode.removeChild(children);
    }
}



export const create = (virtualNode: VNode | VirtualNodeArray) => {
    if (cantRender(virtualNode)) {
        return ;
    }
    if (Array.isArray(virtualNode)) {
        const domElement = virtualNode.map(el => create(el));
        virtualNode.domElement = domElement;
        return domElement;
    }
    if (virtualNode.type === fragment) {
        const domElement = virtualNode.children.map(el => create(el));
        virtualNode.domElement = domElement;
        return domElement;
    }
    if (typeof (virtualNode.type) === 'function') {
        setCurrentVNode(virtualNode);
        virtualNode.states = [];
        virtualNode.stateCounter = 0;
        let node = virtualNode;
        const vNode = virtualNode.type.call(null, virtualNode.props, virtualNode.children);
        node.oldElement = vNode;
        let domElement = create(vNode);
        node.domElement = domElement;
        return domElement;
    }

    const {domNode} = createHTMLNode(virtualNode);
    return domNode;
}

export const update = (rootElement, currNode, nextNode) => {
   // TODO:
    // не хватает обработки случая с фрагментом
       updateComponent(rootElement, null, nextNode)
    // updateComponent(rootElement, currNode, nextNode)
}


let root = null;
let vRoot = null;

export const rootRender = (virtualRoot) => {
    if (virtualRoot === null) {
        return ;
    }
    update(root, vRoot, virtualRoot);
    vRoot = virtualRoot;
}

export const createRoot = (container) => {
    root = container;
    root.innerHTML = '';

    return {render: rootRender, container};
}