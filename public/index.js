import {authorizationPage} from "./components/pages/authorization/authorization.js";
import {registrationPage} from "./components/pages/registration/registration.js";
import {headerComponent} from "./components/header/header.js";
import {Ajax} from "./api/ajax.js";

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


try {
    printResult()
} catch (e) {
    console.log('return', e)
} finally {
    console.log("ok")
}

