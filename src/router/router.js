import {rootRender} from "@/lib/jsx/index.ts";
import {AuthorizationPage} from "components/App/pages/authorization/authorization";
import {RegistrationPage} from "components/App/pages/registration/registration";
import {FeedPage} from "components/App/pages/lenta/feed";
import {MatchesPage} from "components/App/pages/matches/matches";
import {InterviewPage} from "components/App/pages/registration/interview/interview";
import {PhotoPage} from "components/App/pages/registration/photo/photo";
import {Tinder} from "@/api/api";
import {AboutPage} from "components/App/pages/about/aboutPage";
import {BannedUserPage, NotFoundPage} from "components/App/pages/notFound/notFound";
import {ProfilePage} from "components/App/pages/profile/profile";
import {setUser} from "@/store/user";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";
import {ChatPage} from "components/App/pages/chat/chat";
import {WSChatAPI} from "@/api/ws_chat_api";
import {render} from "@/lib/jsx/render";
import {MatchNotification, notificationWrapper} from "components/App/notification/notification";
import {OfflinePage} from "components/App/pages/offline/offlinePage";
import {OfflineAboutPage} from "components/App/pages/offline/offlineAbout";

let publicRoutes = [
    {path: '/login', component: AuthorizationPage},
    {path: '/signup', component: RegistrationPage},
    {path: '/', component: AboutPage},

]

let privateRoutes = [
    {path: '/matches', component: MatchesPage},
    {path: '/', component: FeedPage},
    {path: '/profile', component: ProfilePage},
    {path: '/interview', component: InterviewPage},
    {path: '/photo', component: PhotoPage},
    {path: '/signup', component: RegistrationPage},
    {path: '/chat', component: ChatPage},
]

let offlineRoutes = [
    {path: '/', component: OfflinePage},
    {path: '/offline_about', component: OfflineAboutPage}
];
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

export const setOfflineRoutes = () => {
    routes = offlineRoutes;
}


const router = async () => {
    try {
        const response = await Tinder.getUser();
        const json = await response.json();
        let authorized = true;
        if (json.status === 200) {
            setUser(json.body);

            WSChatAPI.connect();
            WSChatAPI.subscribeOnReaction((notification) => {
                render(notificationWrapper, <MatchNotification notification={notification}/>)
            });
            setPrivateRoutes();
            if (json.body.step !== 0) {
                Navigate({to: "/signup"})
                rootRender(<RegistrationPage/>);
                return ;
            }
            if (json.body.banned) {
                rootRender(<BannedUserPage/>)
                return ;
            }
        } else if (json.status === 999) {
            setOfflineRoutes();
        } else {
            authorized = false;

            WSChatAPI.disconnect();
            setPublicRoutes()
        }
        const currentPath = window.location.pathname;
        const route = routes.find(route => route.path === currentPath);
        if (!route) {
            if (!authorized) {
                let tryPrivateRoute = privateRoutes.find(route => route.path === currentPath);
                if (tryPrivateRoute) {
                    rootRender(<AuthorizationPage/>);
                    return ;
                }
            }
            rootRender(<NotFoundPage/>);
            console.log("not found page");
            return ;
        }
        const args = Object.values(route?.args || []);
        const component = route?.component(...args);
        rootRender(component);
    } catch (e) {
        console.log(e);
    }

};

document.addEventListener('DOMContentLoaded', () => {
    router();
});

window.addEventListener('popstate', () => {
    router();
});
