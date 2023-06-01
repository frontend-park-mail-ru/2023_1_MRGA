export const Navigate = ({to}) => {
    const currentPath = window.location.pathname;
    if (currentPath === to) {
        return ;
    }
    window.history.pushState({}, to, to);
    const popStateEvent = new PopStateEvent("popstate", { state: history.state });
    window.dispatchEvent(popStateEvent);
};
