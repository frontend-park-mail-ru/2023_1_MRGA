import {render} from "@/lib/jsx/index.ts";
import {Header} from "components/App/header/header";
import {AuthorizationPage} from "components/App/pages/authorization/authorization";
import {RegistrationPage} from "components/App/pages/registration/registration";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";
import {FeedPage} from "components/App/pages/lenta/feed";
import {MatchesPage} from "components/App/pages/matches/matches";
import {InterviewPage} from "components/App/pages/interview/interview";
import {FiltersPage} from "components/App/pages/filters/filters";
import {PhotoPage} from "components/App/pages/photo/photo";
import {HashTagsPage} from "components/App/pages/hashTags/hashTags";

export let routes = [
    { path: '/login', component: AuthorizationPage},
    { path: '/hello', component: (arg) => <h1>{arg}</h1>, args: {arg: "arg"}},
    { path: '/', component: FeedPage},
    { path: '/header', component: Header},
    {path: '/signup', component: RegistrationPage},
    {path: '/interview', component: InterviewPage},
    {path: '/filters', component: FiltersPage},
    {path: '/photo', component: PhotoPage},
    {path: '/matches', component: MatchesPage},
    {path: '/hashTags', component: HashTagsPage},

    // {path:'/', component}
];

const router = () => {
    const currentPath = window.location.pathname;
    const route = routes.find(route => route.path === currentPath);
    const args = Object.values(route?.args || []);

    route ? render(route.component.call(null, ...args)) : false;
};

document.addEventListener('DOMContentLoaded', () => {
    router();
});

window.addEventListener('popstate', () => {
    router();
});


