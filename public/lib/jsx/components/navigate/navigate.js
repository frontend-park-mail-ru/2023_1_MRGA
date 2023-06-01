export const Navigate = ({to}) => {
    window.history.pushState({}, to,  to);
    const popStateEvent = new PopStateEvent("popstate", { state: history.state });
    window.dispatchEvent(popStateEvent);
}