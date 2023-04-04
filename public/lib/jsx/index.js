import {isArray, isFunction} from "@/lib/jsx/utils";

/** @jsx window.h */

window.h = (type, props, ...children) => {
    return {type, props, children};
}

export const createElement = (virtualNode) => {
    if (!virtualNode) {
        return
    }
    if (isArray(virtualNode)) {
        const fragment = document.createDocumentFragment()
        virtualNode.forEach(el => {
            fragment.appendChild(createElement(el));
        })
        return fragment;
    }
    if (typeof virtualNode === 'string') {
        return document.createTextNode(virtualNode);
    }
    if (isFunction(virtualNode.type)) {
        const vNode = virtualNode.type.call(null, virtualNode.props, virtualNode.children);
        if (!vNode) {
            const fragment = document.createDocumentFragment()
            virtualNode.children.forEach(el => {
                fragment.appendChild(createElement(el));
            })
            return fragment;
        } else {
            return createElement(vNode);
        }
    }
    const rootElement = document.createElement(virtualNode.type);
    Object.entries(virtualNode.props || {}).forEach(([attr, value]) => {
        if (attr === 'className') {
            rootElement.setAttribute('class', value);
        } else if (attr.startsWith('on')) {
            rootElement.addEventListener(attr.slice(2).toLowerCase(), value);
        } else if (attr === 'ref') {
            value?.setValue(rootElement);
        } else if (attr === 'htmlFor') {
            rootElement.setAttribute('for', value);
        } else {
            rootElement.setAttribute(attr, value);
        }
    });
    virtualNode.children.map(createElement).forEach((childElement) => {
        rootElement.appendChild(childElement);
    });
    return rootElement;
}

export const update = (rootElement, currNode, nextNode, index = 0) => {
    while (rootElement.firstChild) { // проверяем, есть ли дочерние элементы
        rootElement.removeChild(rootElement.firstChild); // удаляем первый дочерний элемент
    }
    rootElement.appendChild(createElement(nextNode));
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
    root.appendChild(createElement(virtualRoot));
}

export const createRoot = (container) => {
    root = container;
    const render = (virtualRoot) => {
        innerRender(virtualRoot, root);
    }
    return {render};
}