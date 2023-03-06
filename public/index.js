import {authorizationPage} from "./components/pages/authorization/authorization.js";
import {registrationPage} from "./components/pages/registration/registration.js";
import {feedPage} from "./components/pages/lenta/feed.js";
import {headerComponent} from "./components/header/header.js";

import {menuItems} from "./components/header/header.js";
import {Tinder} from "./api/api.js";
import {User} from "./store/user.js";


const root = document.getElementById('root')

const onLogout = async (e) => {
    e.preventDefault();
    console.log(e)
    const logoutResponse = await Tinder.logout();
    const jsonResponse = await  logoutResponse.json();
    if (jsonResponse.status !== 200) {
        console.log(jsonResponse.err);
    }
    loginPage();
    User.setUser('')
}



const lenta = new feedPage(root, onLogout);

export  function loginPage(){
    root.innerHTML = ''
    const header = new headerComponent(root)
    header.items = menuItems

    const authPage = new authorizationPage(root, header, loadPage)
    authPage.render()
}

export function signupPage() {
    root.innerHTML = ''
    const header = new headerComponent(root)
    header.items = menuItems

    const signupPage = new registrationPage(root, header, loadPage)
    signupPage.render()
}

const loadPage = async () => {
    const userResp = await Tinder.getUser()
    const json = await userResp.json()
    if (json.status !== 200) {
        loginPage()
    } else {
        User.setUser(json)
        lenta.render()
    }
    console.log("json: ", json)

}

loadPage()
