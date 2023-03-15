import {Tinder} from "../../../api/api.js";
import logoMini from "../../../assets/LogoMini.svg"
import * as nunjucks from "nunjucks"

const authorizationNunjucksTemplate =
    `<div class="authorizationContainer">
        <form class="authorizationForm">
            <img src={{logo}} width="46">
            <span class="inviteText">
                <p>Введите ваши данные</p>
            </span>
            <span>
                <label for="email" class="authLabel">Почта или login</label>
                <input class="authorizationFormElement" id="login" name="email" type="text" placeholder="123@mail.ru">
            </span>
            <span class="password">
                <label for="password" class="authLabel">Пароль</label>
                <input name="password" id="pass" class="authorizationFormElement" type="password" placeholder="введите ваш пароль">
                <a href=# class="password-control" id="view-pass"></a>
            </span>
            </span>
                <span id="error" class="errorText">
            </span>
            <button class="authorizationFormElement enterButton" type="submit">войти</button>
        </form>
    </div>`;

function viewPasswordClick(e) {
    e.preventDefault();
    this.classList.toggle('view');
    const parent = this.parentNode;
    const input = parent.querySelector("input");
    const type = input.type;
    switch (type) {
        case "password":
            input.type = "text";
            break;
        default:
            input.type = "password";

    }
}



export class authorizationPage {
    #root
    #header
    #nunjucksTemplate
    pass
    login
    onSuccess
    constructor(root,  header, onSuccess) {
        this.#root = root
        this.#header = header
        this.#nunjucksTemplate = nunjucks.compile(authorizationNunjucksTemplate)
        this.onSuccess = onSuccess;
    }
    render() {
        this.#root.innerHTML = ''
        this.#header.render()
        this.#root.appendChild(this.getNode())
        const passView = this.#root.querySelector("#view-pass")
        passView.addEventListener('click', viewPasswordClick)

        const form = this.#root.querySelector(".authorizationForm")
        form.addEventListener('submit', this.#authClick)

        const password = this.#root.querySelector("#pass")
        password.addEventListener('input', (e) => {
            this.pass = e.currentTarget.value;
        });

        const login = this.#root.querySelector("#login")
        login.addEventListener('input', (e) => {
            this.login = e.currentTarget.value;
        });

        this.err = this.#root.querySelector("#error");
    }
    getNode() {
        const div = document.createElement('div');
        div.innerHTML = this.#nunjucksTemplate.render({logo: logoMini});
        return div.firstChild;
    }

    #authClick = async (e) => {
        e.preventDefault()
        this.err.innerHTML = '';
        try {
            const resp = await Tinder.login({"password": this.pass, "input": this.login})
            const json = await resp.json()
            if (json.status !== 200) {
                this.err.innerHTML = json.err;
                return
            }
            this.onSuccess();
        } catch (e) {
            alert(e)
        }

    }
}
