import {Navigate} from "@/lib/jsx/components/navigate/navigate";

export const Link = ({href, ...props}, children) => {
    const linkClickHandler = (event) => {
        event.preventDefault();
        const currentPath = window.location.pathname;
        if (currentPath === href) {
            return ;
        }
        Navigate({to:href});
    };
    // debugger;
    return (
        <a href={href} onClick={linkClickHandler} {...props}>{children}</a>
    );
};
