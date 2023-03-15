import {Tinder} from "../../../api/api.js";

import logoMini from "../../../assets/LogoMini.svg";
import * as nunjucks from "nunjucks"

const registrationNunjucksTemplate =
    `<div class="authorizationContainer">
        <form id="regForm" class="authorizationForm">
            <img src={{logoMini}} width="46">
            <span>
                <label for="email" class="authLabel">Email Address</label>
                <input class="authorizationFormElement" id="email" required="true" name="email" type="email" placeholder="123@mail.ru">
            </span>
            <span>
                <label for="nickname" class="authLabel">Nickname</label>
                <input class="authorizationFormElement" id="nickname" required="true" name="nickname" type="text" placeholder="yakwilik">
            </span>
            <span>
                <label for="age" class="authLabel">Age</label>
                <input class="authorizationFormElement" id="age" required="true" name="age" type="number" min="18" placeholder="18">
            </span>
            <span>
                <label for="sex" class="authLabel">Sex</label>
                <select class="authorizationFormElement" id="sex" required="true" name="sex">
                    <option>не выбрано</option>
                    <option>М</option>
                    <option>Ж</option>
                </select>
            </span>
            <span class="password">
                <label for="password" class="authLabel">Password</label>
                <input name="password" id="pass1" required="true" class="authorizationFormElement" type="password" placeholder="введите ваш пароль">
                <a href=# class="password-control" id="view-pass"></a>
            </span>
            <span class="password">
                <label for="password" class="authLabel">Password repeat</label>
                <input name="password" id="pass2" required="true" class="authorizationFormElement" type="password" placeholder="повторите ваш пароль">
                <a href=# class="password-control" id="view-pass2"></a>
            </span>
            <span class="avatar">
                <label for="avatar" class="authLabel">Avatar</label>
                <input class="authorizationFormElement" id="avatar" name="avatar" type="text" placeholder="ссылка на ваше фото" value="">
                <img src ="" hidden="true" id="hidden-avatar">
                <p id="error-photo" hidden="true">Некорректное фото</p>
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

export class registrationPage {
    #root
    #header
    #nunjucksTemplate
    email
    nickname
    age
    sex
    pass1
    pass2
    avatar
    err
    regForm
    onSuccess
    imageLoadError
    constructor(root,  header, onSuccess) {
        this.#root = root
        this.#header = header
        this.#nunjucksTemplate = nunjucks.compile(registrationNunjucksTemplate)
        this.onSuccess = onSuccess;
    }
    render() {
        this.#root.innerHTML = ''
        this.#header.render()
        this.#root.appendChild(this.getNode())
        const passView = this.#root.querySelector("#view-pass")
        passView.addEventListener('click', viewPasswordClick)
        const passView2 = this.#root.querySelector("#view-pass2")
        passView2.addEventListener('click', viewPasswordClick)
        const image = this.#root.querySelector("#avatar")
        image.addEventListener('input', this.ShowImageClick)

        this.regForm = this.#root.querySelector("#regForm")
        this.regForm.addEventListener('input', this.formInputListener)
        this.regForm.addEventListener('submit', this.formSubmit);
        this.err = this.#root.querySelector("#error");
    }
    getNode() {
        const div = document.createElement('div');
        div.innerHTML = this.#nunjucksTemplate.render({logoMini: logoMini});
        return div.firstChild;
    }
    formInputListener = (e) => {
        this.err.innerHTML = '';
        switch (e.target.id) {
            case "email": {
                this.email = e.target.value;
                break;
            }
            case "nickname": {
                this.nickname = e.target.value;
                break;
            }
            case "age": {
                this.age = e.target.value;
                break;
            }
            case "sex": {
                this.sex = e.target.value;
                break;
            }
            case "avatar": {
                this.avatar = e.target.value;
                break;
            }
            case "pass1": {
                this.pass1 = e.target.value;
                break;
            }
            case "pass2": {
                this.pass2 = e.target.value;
                break;
            }
        }
        if (e.target.id === "pass1" || e.target.id === "pass2") {
            if (this.pass1.length < 5) {
                this.err.innerHTML = 'пароль слишком короткий';
                return
            }
            if (this.pass1 !== this.pass2) {
                this.err.innerHTML = 'пароли не совпадают';
            }
        }
    }
    formSubmit = async (e) => {
        e.preventDefault();
        if (this.imageLoadError) {
            return ;
        }
        if (this.err.innerHTML !== '') {
            return;
        }
        this.err.innerHTML = '';
        if (this.pass1 !== this.pass2) {
            this.err.innerHTML = "пароли не совпадают";
            return
        }
        try {
            const resp = await Tinder.registration({
                "email": this.email,
                "username": this.nickname,
                "age": Number(this.age),
                "sex": this.sex,
                "password": this.pass2,
                "avatar": this.avatar
            })
            const json = await resp.json()
            if (json.status !== 200) {
                this.err.innerHTML = json.err;
                return
            }
            this.onSuccess();
        } catch (e) {
            console.log(e)
        }
    }

     ShowImageClick = (e) => {
        e.preventDefault();
        const classAvatar = document.querySelector(".avatar")
        const error = classAvatar.querySelector("p");
        const input = classAvatar.querySelector("input");
        const img = classAvatar.querySelector("img");
        const value = input.value;
        error.hidden = true;
        this.imageLoadError = false;
        switch (value) {
            case "":
                img.hidden = true;
                error.hidden = true
                break;
            default:
                img.hidden = false;
                img.src = value
                error.hidden = true
        }
        img.onerror = async () => {
            img.hidden = true;
            error.hidden = false
            this.imageLoadError = true;
        }

        img.onload = e => {
            console.log(e)
        }   
    }

}
