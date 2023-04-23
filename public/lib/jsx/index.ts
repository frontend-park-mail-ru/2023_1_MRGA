import './pragma.ts'
import {fragment, VNode} from './types'
import {IUseRefResult} from "./hooks/useRef";
import {updateComponent} from "./update";


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
    } else {
        const domNode = document.createElement(virtualNode.type);
        Object.entries(virtualNode.props || {}).forEach(([attr, value]) => {
            if (attr === 'className' && typeof value === "string") {
                domNode.setAttribute('class', value);
            } else if (attr.startsWith('on')) {
                domNode.addEventListener(attr.slice(2).toLowerCase(), value);
            } else if (attr === 'ref') {
                (value as IUseRefResult<any>)?.setValue(domNode);
            } else if (attr === 'htmlFor') {
                domNode['for'] = value;
                // domNode.setAttribute('for', value);
            } else {
                domNode[attr] = value;
                // domNode.setAttribute(attr, value);
            }
        });
        virtualNode?.children.map(create).forEach((childElement) => {
            if (Array.isArray(childElement)) {
                childElement.forEach(e => domNode.appendChild(e));
            } else {
                domNode.appendChild(childElement);
            }
        });
        return {domNode, type: htmlElement};
    }
}




export const create = (virtualNode: VNode | VNode[]) => {
    if (Array.isArray(virtualNode)) {
        return virtualNode.map(el => create(el));
    }
    if (virtualNode.type === fragment) {
        return virtualNode.children.map(el => create(el));
    }
    if (typeof (virtualNode.type) === 'function') {
        setCurrentVNode(virtualNode);
        virtualNode.states = [];
        virtualNode.stateCounter = 0;
        let node = virtualNode;
        const vNode = virtualNode.type.call(null, virtualNode.props, virtualNode.children);
        node.oldElement = vNode;
        let result = create(vNode);
        node.domElement = result;
        return result;
    }

    const {domNode} = createHTMLNode(virtualNode);
    return domNode;
}

export const update = (rootElement, currNode, nextNode) => {
    const newRoot = create(nextNode);
    if (Array.isArray(newRoot)) {
        newRoot.forEach(e => rootElement.appendChild(e));
        return;
    }
    rootElement.appendChild(newRoot);
   // TODO:
   //     updateComponent(rootElement, currNode, nextNode)  // не хватает обработки случая с фрагментом
}


let root;
let vRoot;

export const render = (virtualRoot) => {
    if (virtualRoot === null) {
        return ;
    }
    root.innerHTML = '';
    update(root, vRoot, virtualRoot);
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