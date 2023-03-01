/** @jsx VDom.h */



export class VDom {
    static h(type, props, ...children) {
        return {type, props, children};
    }

    static createElement(virtualNode) {
        if (typeof virtualNode === 'string') {
            return document.createTextNode(virtualNode);
        }
        const rootElement = document.createElement(virtualNode.type);
        virtualNode.props && Object.keys(virtualNode.props).forEach((key) => {
            rootElement.setAttribute(key, virtualNode.props[key]);
        });
        virtualNode.children.map(VDom.createElement).forEach((childElement) => {
            rootElement.appendChild(childElement);
        });
        return rootElement;
    }

    static update(rootElement, currNode, nextNode, index = 0) {
        if (!nextNode) {
            rootElement.removeChild(rootElement.childNodes[index]);
        } else if (!currNode) {
            rootElement.appendChild(VDom.createElement(nextNode));
        } else if (VDom.changed(currNode, nextNode)) {
            rootElement.replaceChild(VDom.createElement(nextNode), rootElement.childNodes[index]);
        } else if (typeof nextNode !== 'string') {
            for (let i = 0; i < Math.max(currNode.children.length, nextNode.children.length); i++) {
                VDom.update(rootElement.childNodes[index], currNode.children[i], nextNode.children[i], i);
            }
        }
    }

    static changed(nodeA, nodeB) {
        return (
            typeof nodeA !== typeof nodeB ||
            typeof nodeA === 'string' && nodeA !== nodeB ||
            nodeA.type !== nodeB.type
        );
    }

    static render(virtualRoot, domRoot) {
        domRoot.appendChild(VDom.createElement(virtualRoot));
    }
}