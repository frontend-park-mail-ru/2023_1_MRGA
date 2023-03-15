import {authorizationPage} from "pages/authorization/authorization";
import {registrationPage} from "pages/registration/registration";
import {feedPage} from "components/pages/lenta/feed";
import {headerComponent} from "components/header/header";

import {menuItems} from "components/header/header";
import {Tinder} from "./api/api.js";
import {setUser, userStore} from "./store/user.js";

import styles from "./styles/styles.css"
import less from "./styles/less.less"
import scss from "./styles/scss.scss"
import {f} from "./ts.ts"

const root = document.getElementById('root')



const onLogout = async (e) => {
    e.preventDefault();
    const logoutResponse = await Tinder.logout();
    const jsonResponse = await  logoutResponse.json();
    if (jsonResponse.status !== 200) {
        console.log(200)
    }
    userStore.dispatch(setUser(undefined));
    loginPage();
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
        userStore.dispatch(setUser(json))
        lenta.render()
    }
}

loadPage()
