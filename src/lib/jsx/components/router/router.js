import {FunctionalComponent} from "../../types";
import {rootRender} from "../../index";
import {AuthorizationPage} from "components/App/pages/authorization/authorization";
import {useState} from "@/lib/jsx/hooks/useState/useState";
import {RegistrationPage} from "components/App/pages/registration/registration";
// interface IRouterProps {
//     path: string;
//     component: FunctionalComponent
//     arguments: Array<any>
// }

export const BrowserRouter = ({...props}, children /*IRouterProps[]*/) => {
    const currentPath = window.location.pathname;
    const [matchedRoute, setMatchedRoute] = useState(children.find(route => route.props.path === currentPath));
    const [listenersSet, setListenersSet] = useState(false);
    const router = () => {
        const currentPath = window.location.pathname;
        const route = children.find(route => route.props.path === currentPath);
        if (!route) {
            console.log("no route was here");
            return;
        }
        if (route.props.path !== matchedRoute?.props?.path) {
            setMatchedRoute(route);
        }

    };
    router();
    if (!listenersSet) {
        document.addEventListener("DOMContentLoaded", () => {
            router();
        });

        window.addEventListener("popstate", () => {
            router();
        });
        setListenersSet(true);
    }

    return matchedRoute ? <Route {...matchedRoute.props}/>: <div>не найдено</div>;
};

export const Route = ({path, component, args}) => {
    const aa = args ?? [];

    return (
        {type: component}
    );
};

export const MyRouter = () => {
    // debugger;
    return (
        <BrowserRouter>
            <Route path={"/login"} component={AuthorizationPage}/>
            <Route path={"/signup"} component={RegistrationPage}/>
        </BrowserRouter>
    );
};

