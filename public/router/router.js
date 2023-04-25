import {rootRender} from "@/lib/jsx/index.ts";
import {Header} from "components/App/header/header";
import {AuthorizationPage} from "components/App/pages/authorization/authorization";
import {RegistrationPage} from "components/App/pages/registration/registration";
import {FeedPage} from "components/App/pages/lenta/feed";
import {MatchesPage} from "components/App/pages/matches/matches";
import {InterviewPage} from "components/App/pages/registration/interview/interview";
import {FiltersPage} from "components/App/pages/registration/filters/filters";
import {PhotoPage} from "components/App/pages/registration/photo/photo";
import {HashTagsPage} from "components/App/pages/registration/hashTags/hashTags";
import {Tinder} from "@/api/api";
import {AboutPage} from "components/App/pages/about/aboutPage";
import {NotFoundPage} from "components/App/pages/notFound/notFound";


let publicRoutes = [
    {path: '/login', component: AuthorizationPage},
    {path: '/signup', component: RegistrationPage},
    {path: '/', component: AboutPage},

]

let privateRoutes = [
    {path: '/matches', component: MatchesPage},
    {path: '/', component: FeedPage},
]
export let routes = [
    {path: '/', component: FeedPage},
    {path: '/matches', component: MatchesPage},
];

export const setPublicRoutes = () => {
    routes = publicRoutes;
}

export const setPrivateRoutes = () => {
    routes = privateRoutes;
}

const router = async () => {
    try {
        const response = await Tinder.getUser();
        const json = await response.json();
        if (json.status === 200) {
            setPrivateRoutes()
        } else {
            setPublicRoutes()
        }
        const currentPath = window.location.pathname;
        const route = routes.find(route => route.path === currentPath);
        if (!route) {
            rootRender(<NotFoundPage/>);
            console.log("not found page");
            return ;
        }
        const args = Object.values(route?.args || []);
        const component = route?.component(...args);
        rootRender(component);
    } catch (e) {

    }

};

document.addEventListener('DOMContentLoaded', () => {
    router();
});

window.addEventListener('popstate', () => {
    router();
});


