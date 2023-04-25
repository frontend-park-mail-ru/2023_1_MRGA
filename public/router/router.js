import {rootRender} from "@/lib/jsx/index.ts";
import {Header} from "components/App/header/header";
import {AuthorizationPage} from "components/App/pages/authorization/authorization";
import {RegistrationPage} from "components/App/pages/registration/registration";
import {FeedPage} from "components/App/pages/lenta/feed";
import {MatchesPage} from "components/App/pages/matches/matches";
import {InterviewPage} from "components/App/pages/interview/interview";
import {FiltersPage} from "components/App/pages/filters/filters";
import {PhotoPage} from "components/App/pages/photo/photo";
import {HashTagsPage} from "components/App/pages/hashTags/hashTags";
import {Tinder} from "@/api/api";
import {AboutPage} from "components/App/pages/about/aboutPage";


let publicRoutes = [
    {path: '/login', component: AuthorizationPage},
    {path: '/signup', component: RegistrationPage},
    {path: '/interview', component: InterviewPage},
    {path: '/filters', component: FiltersPage},
    {path: '/photo', component: PhotoPage},
    {path: '/hashTags', component: HashTagsPage},
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
        console.log(json);
        const currentPath = window.location.pathname;

        const route = routes.find(route => route.path === currentPath);
        console.log("route: ", route, "currentPath: ", currentPath);
        const args = Object.values(route?.args || []);
        // debugger;
        const component = route?.component(...args);
        route ? rootRender(component) : false;
    } catch (e) {

    }

};

document.addEventListener('DOMContentLoaded', () => {
    router();
});

window.addEventListener('popstate', () => {
    router();
});


