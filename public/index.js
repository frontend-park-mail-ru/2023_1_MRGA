import {authorizationPage} from "./components/pages/authorization/authorization.js";
import {registrationPage} from "./components/pages/registration/registration.js";
import {headerComponent} from "./components/header/header.js";

import {menuItems} from "./components/header/header.js";


const root = document.getElementById('root')

export  function loginPage(){
    root.innerHTML = ''
    const header = new headerComponent(root)
    header.items = menuItems

    const authPage = new authorizationPage(root, header)
    authPage.render()
}

export function signupPage() {
    root.innerHTML = ''
    const header = new headerComponent(root)
    header.items = menuItems

    const signupPage = new registrationPage(root, header)
    signupPage.render()
}

loginPage()








