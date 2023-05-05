import {resolveDispatcher} from "../dispatcher";


export const useRef = () => {
    const dispatcher = resolveDispatcher();
    return dispatcher.useRef();
}
