import {Child, VNode, JSX, Props} from "./types";

declare global {
    interface Window {
        h: (type: JSX, props: Props, ...children: Child[]) => VNode;
        createElement: Symbol;
    }
}


