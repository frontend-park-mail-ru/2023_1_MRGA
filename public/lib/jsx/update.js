import {create} from "@/lib/jsx/index.ts";

export const updateProps = (domElement, oldProps, newProps) => {
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

export const updateComponent = (domElement, oldElement, newElement) => {
    if (typeof newElement === 'string' && oldElement !== newElement) {
        domElement.nodeValue = newElement;
        return ;
    }

    // Обновить атрибуты и свойства элемента
    updateProps(domElement, oldElement?.props, newElement?.props);


    // Если типы элементов различаются, заменить старый элемент на новый
    if (oldElement?.type !== newElement?.type) {
        const newDOMElement = create(newElement.type, newElement.props, ...newElement.children);
        domElement?.replaceWith(newDOMElement);
        // domElement.parentNode.replaceChild(newDOMElement, domElement);
        return;
    }


    // Обновить дочерние элементы
    const oldChildren = oldElement.children;
    const newChildren = newElement.children;


    if (!oldChildren && !newChildren) {
        return ;
    }

    for (let i = 0; i < Math.max(oldChildren.length, newChildren.length); i++) {

        if (!oldChildren[i] && newChildren[i]) {
            // Добавить новый дочерний элемент
            const newChildElement = create(newChildren[i].type, newChildren[i].props, ...newChildren[i].children);
            domElement.appendChild(newChildElement);
        } else if (oldChildren[i] && !newChildren[i]) {
            debugger;
            // Удалить старый дочерний элемент
            domElement.removeChild(domElement.childNodes[i]);
        } else if (oldChildren[i] && newChildren[i]) {
            // Обновить существующий дочерний элемент
            updateComponent(domElement.childNodes[i], oldChildren[i], newChildren[i]);
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
