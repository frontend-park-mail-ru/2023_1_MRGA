import {appendChildren, create, removeChildren} from "./index";
import {fragment, Props, VNode} from "./types";
import {render} from "./render";

export const updateProps = (domElement: HTMLElement, oldProps: Props, newProps: Props) => {
    const allProps = { ...oldProps, ...newProps };
    for (const propName in allProps) {
        if (newProps[propName] !== oldProps[propName]) {

            if (propName.startsWith('on')) {
            // Обработчик событий
                const eventName = propName.slice(2).toLowerCase();
                if (oldProps[propName]) {
                    domElement.removeEventListener(eventName, oldProps[propName]);
                }
                if (newProps[propName]) {
                    domElement.addEventListener(eventName, newProps[propName]);
                }
            } else if (!newProps || !newProps.hasOwnProperty(propName)) {
                domElement.removeAttribute(propName);
            }
            else {
            // Обычные свойства и атрибуты
                domElement[propName] = newProps[propName];
            }
        }
    }
}

// TODO:
//     updateComponent(rootElement, currNode, nextNode)  // не хватает обработки случая с фрагментом
export const updateComponent = (domElement: HTMLElement, oldElement: VNode, newElement: VNode) => {
    if (!domElement) {
        return;
    }
    if (typeof newElement === 'string' && oldElement !== newElement) {
        domElement.nodeValue = newElement;
        return ;
    }
    if (!oldElement) {
        if ("innerHTML" in domElement) {
            domElement.innerHTML = '';
        }
        render(domElement as HTMLElement, newElement);
        return;
    }
    if (!newElement) {
        if ("innerHTML" in domElement) {
            domElement.innerHTML = '';
        }
    }

    // Если типы элементов различаются, заменить старый элемент на новый
    if (oldElement?.type !== newElement?.type) {

        console.log(domElement);
        const newDOMElement = create(newElement);
        if (oldElement.type === fragment || Array.isArray(oldElement)) {
            debugger;
            const parent = domElement[0].parentNode;
            const domArray = oldElement.domElement;
            if (Array.isArray(domArray)) {
                // removeChildren(parent, domArray)
                domArray.forEach(el => {
                    parent.removeChild(el);
                })
            }
            if (Array.isArray(newDOMElement)) {
                appendChildren(parent, newDOMElement);
                return;
            }
        } else {
            domElement?.replaceWith(newDOMElement);
        }
        return;
    }

    // Обновить атрибуты и свойства элемента
    updateProps(domElement as HTMLElement, oldElement?.props, newElement?.props);


    // Обновить дочерние элементы
    const oldChildren = oldElement.children;
    const newChildren = newElement.children;


    if (!oldChildren && !newChildren) {
        return ;
    }

    updateChildren(domElement, oldChildren, newChildren);
}

const updateChildren = (domElement: HTMLElement, oldChildren: VNode[], newChildren: VNode[]) => {
    // debugger;
    for (let i = 0; i < Math.max(oldChildren.length, newChildren.length); i++) {
        if (!oldChildren[i] && newChildren[i]) {
            // Добавить новый дочерний элемент
            const newChildElement = create(newChildren[i]);
            appendChildren(domElement, newChildElement);
        } else if (oldChildren[i] && !newChildren[i]) {
            // Удалить старый дочерний элемент
            removeChildren(domElement, domElement.childNodes[i]);
        } else if (oldChildren[i] && newChildren[i]) {
            // Обновить существующий дочерний элемент
            // debugger;
            updateComponent(domElement.childNodes[i] as HTMLElement, oldChildren[i], newChildren[i]);
        }
    }
}


const changedProps = (oldVNode, newVNode) => {
    if (typeof oldVNode === 'string') {
        return  !(oldVNode === newVNode);
    }
    // Проверка на изменение типа элемента
    if (oldVNode.type !== newVNode.type) {
        return true;
    }

    const oldProps = Object.entries(oldVNode.props);
    const newProps = Object.entries(newVNode.props);

    if (oldProps.length !== newProps.length) {
        return true;
    }
    const allProps = {...oldProps, ...newProps};
    // Проверка на изменение значений свойств в props
    for (const propName in allProps) {
        if (oldProps[propName] !== newProps[propName]) {
            return true;
        }
    }
    return false;
}
