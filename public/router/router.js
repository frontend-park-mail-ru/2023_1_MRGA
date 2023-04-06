import {render, createElement} from "@/lib/jsx";
import {Header} from "components/App/header/header";
import {AuthorizationPage} from "components/App/pages/authorization/authorization";
import {RegistrationPage} from "components/App/pages/registration/registration";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";
import {FeedPage} from "components/App/pages/lenta/feed";

export const routes = [
    { path: '/login', component: AuthorizationPage},
    { path: '/hello', component: (arg) => <h1>{arg}</h1>, args: {arg: "arg"}},
    { path: '/', component: FeedPage},
    { path: '/header', component: Header},
    {path: '/signup', component: RegistrationPage}
    // {path:'/', component}
];

const router = () => {
    const currentPath = window.location.pathname;
    const route = routes.find(route => route.path === currentPath);
    const args = Object.values(route.args || []);
    render(route.component.call(null, ...args));
};

document.addEventListener('DOMContentLoaded', () => {
    router();
});

window.addEventListener('popstate', () => {
    console.log("popstate");
    router();
});


