import {authorizationPage} from "./components/pages/authorization/authorization.js";
import {registrationPage} from "./components/pages/registration/registration.js";
import {feedPage} from "./components/pages/lenta/feed.js";
import {headerComponent} from "./components/header/header.js";
import {Ajax} from "./api/ajax.js";

import {menuItems} from "./components/header/header.js";
import {Tinder} from "./api/api.js";


const root = document.getElementById('root')





const lenta = new feedPage(root);

export  function loginPage(){
    root.innerHTML = ''
    const header = new headerComponent(root)
    header.items = menuItems

    const authPage = new authorizationPage(root, header, lenta.render)
    authPage.render()
}

export function signupPage() {
    root.innerHTML = ''
    const header = new headerComponent(root)
    header.items = menuItems

    const signupPage = new registrationPage(root, header, lenta.render)
    signupPage.render()
}



async function printResult() {
    let res
    try {
        res = await Ajax.ajax("http://localhost:8081/meetme/return200", "GET")
        console.log(res)
        const json = await res.json()
        console.log(json)
    } catch (e) {
        console.log(e)
    } finally {

    }
}

const loadPage = async () => {
    const userResp = await Tinder.getUser()
    const json = await userResp.json()
    if (json.status !== 200) {
        loginPage()
    } else {
        localStorage.setItem('currentUser', JSON.stringify(json))
        lenta.render()
    }
    console.log("json: ", json)

}

loadPage()
