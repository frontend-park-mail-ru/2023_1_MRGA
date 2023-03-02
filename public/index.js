import {headerComponent, RENDER_TYPE} from "./components/header/header.js";

const root = document.getElementById('root')


const headerConfig = {
    login: {
        href: '/login',
        textContent: 'Login',
        openMethod: loginPage
    },
    signup: {
        href: '/signup',
        textContent: 'Create account',
        openMethod: registrationPage
    }
}

const createInput = (type, placeholder, name) => {
    const input = document.createElement('input')
    input.type = type
    input.placeholder = placeholder
    input.name = name
    return input
}

const menuItems = Object.entries(headerConfig).map(([key, {href, textContent}]) => ({key, href, textContent}))
const menuPage = () => {
    const header = new headerComponent(root)
    header.items = menuItems

    header.render(RENDER_TYPE.NUNJUCKS)
}

menuPage()

function registrationPage() {
    menuPage()

    const registrationForm = document.createElement('form')

    const emailInput = createInput('email', '123@mail.ru', 'email')
    const passwordInput = createInput('password', 'ваш пароль', 'password')
    const repeatPasswordInput = createInput('password', 'повторите пароль', 'password')

    const submitBtn = document.createElement('button')
    submitBtn.type = 'submit'
    submitBtn.textContent = 'Зарегистрироваться'

    registrationForm.appendChild(emailInput)
    registrationForm.appendChild(passwordInput)
    registrationForm.appendChild(repeatPasswordInput)
    registrationForm.appendChild(submitBtn)
    root.appendChild(registrationForm)
}


function loginPage(){
    menuPage()

    const loginForm = document.createElement('form')

    const emailInput = createInput('email', '123@mail.ru', 'email')
    const passwordInput = createInput('password', 'ваш пароль', 'password')

    const submitBtn = document.createElement('button')
    submitBtn.type = 'submit'
    submitBtn.textContent = 'войти'

    loginForm.appendChild(emailInput)
    loginForm.appendChild(passwordInput)
    loginForm.appendChild(submitBtn)

    root.appendChild(loginForm)
}

root.addEventListener('click', (event) => {
    const {target} = event

    if (target instanceof HTMLAnchorElement) {
        event.preventDefault()

        const {section} = target.dataset
        headerConfig[section].openMethod()
    }
})


async function ajax(url, method, headers, data) {
    return await fetch(url, {method: method, headers: headers, body: data})
}

async function log() {
    const res = await ajax('https://jsonplaceholder.typicode.com/posts/1', "GET")
    const js = await res.json()
    console.log(js)
}



