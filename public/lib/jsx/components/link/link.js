import {Navigate} from "@/lib/jsx/components/navigate/navigate";

export const Link = ({href, ...props}, children) => {
    const linkClickHandler = (event) => {
        event.preventDefault();
        Navigate({to:href});
    }
    return (
        <a href={href} onClick={linkClickHandler} {...props}>{children}</a>
    )
}
