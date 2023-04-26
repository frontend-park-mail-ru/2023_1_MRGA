import {IUseRefResult} from "./hooks/useRef";

type HTMLTag = keyof HTMLElementTagNameMap;

export type Props = { [key: string]: string | {} | IUseRefResult<any> | any };

export type Child = VNode;

export interface FunctionalComponent {
    (props?: Props, children?: Child[]): any; // Замените на тип, который представляет возвращаемое значение вашего компонента
}

export const fragment = Symbol('fragment');

export type JSX = HTMLTag | FunctionalComponent | typeof fragment;

export interface VNode {
    oldElement?: VNode;
    domElement?: HTMLElement | HTMLElement[];
    type?: JSX;
    props?: Props;
    children?: Child[];
    states?: any[];
    stateCounter?: number;
}

export type VirtualNodeArray = VNode[] & {
    domElement?: HTMLElement[];
};

