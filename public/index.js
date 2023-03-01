console.log("hello")

const root = document.getElementById('root')


const headerConfig = {
    login: {
        href: '/login',
        textContent: 'Войти',
        openMethod: loginPage
    },
    signup: {
        href: '/signup',
        textContent: 'Зарегистрироваться',
        openMethod: registrationPage
    }
}

const renderHeader = (parentNode, headerConfig) => {
    Object.
    entries(headerConfig).
    map(([key, {href, textContent}]) => {
        const headerElement = document.createElement('a')
        headerElement.href = href
        headerElement.textContent = textContent
        headerElement.dataset.section = key
        parentNode.appendChild(headerElement)
    });
}

renderHeader(root, headerConfig)

const createInput = (type, placeholder, name) => {
    const input = document.createElement('input')
    input.type = type
    input.placeholder = placeholder
    input.name = name
    return input
}

const menuPage = () => {
    root.innerHTML = ''
    renderHeader(root, headerConfig)
}
menuPage()

function registrationPage() {
    root.innerHTML = ''
    renderHeader(root, headerConfig)

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
    root.innerHTML = ''
    renderHeader(root, headerConfig)

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