import {isArray, isFunction} from "@/lib/jsx/utils";

/** @jsx window.h */



let currentVNode = null;
let lastDomNode = null;

export const setCurrentVNode = (node) =>{
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
const createHTMLNode = (node) => {
    if (typeof node === 'string') {
        const domNode = document.createTextNode(node);
        lastDomNode = domNode;
        return {domNode, type: textNode};
    } else {
        const domNode = document.createElement(node.type);
        lastDomNode = domNode;
        return {domNode, type: htmlElement};
    }
}



// export const insertAfter = (sibling, node) => {
//     // debugger;
//     if (sibling === null) {
//         root.appendChild(node);
//         return ;
//     }
//     if (node === 'skip') {
//         return;
//     }
//     if (sibling.nodeType === Node.TEXT_NODE) {
//         const parent = sibling.parentNode;
//         parent.insertAfter(sibling, node);
//     } else {
//         sibling.insertAdjacentElement('afterend', node);
//     }
// }

export const create = (virtualNode) => {
    if (virtualNode.type === 'fragment') {
        // let children = virtualNode.children;
        // children.forEach(e => insertAfter(lastDomNode, create(e)));
        // // console.log(lastDomNode);
        // return 'skip';
    }
    if (isArray(virtualNode)) {
        const fragment = document.createDocumentFragment()
        virtualNode.forEach(el => {
            fragment.appendChild(create(el));
        })
        return fragment;
    }
    if (isFunction(virtualNode.type)) {
        setCurrentVNode(virtualNode)
        virtualNode.states = [];
        virtualNode.stateCounter = 0;
        let node = virtualNode;
        const vNode = virtualNode.type.call(null, virtualNode.props, virtualNode.children);
        let toReturn = null;
        if (!vNode.type) {
            const fragment = document.createDocumentFragment()
            virtualNode.children.forEach(el => {
                fragment.appendChild(create(el));
            })
            toReturn = fragment;
        } else {
            node.oldV = vNode;
            toReturn = create(vNode);
            lastDomNode = toReturn;
        }
        node.result = toReturn;
        return toReturn;
    }

    const {domNode, type} = createHTMLNode(virtualNode);
    if (type === textNode) {
        return domNode;
    }
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
        if (childElement === 'skip') {
            return ;
        }
        domNode.appendChild(childElement);
    });
    return domNode;
}

export const update = (rootElement, currNode, nextNode, index = 0) => {
    while (rootElement.firstChild) { // проверяем, есть ли дочерние элементы
        rootElement.removeChild(rootElement.firstChild); // удаляем первый дочерний элемент
    }
    const newRoot = create(nextNode);
    if (newRoot === 'skip') {
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
    if (virtualRoot === 'skip') {
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