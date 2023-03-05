import {Tinder} from "../../../api/api.js";

const registrationNunjucksTemplate =
    `<div class="authorizationContainer">
        <form id="regForm" class="authorizationForm">
            <img src="./LogoMini.svg" width="46">
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
    err
    regForm
    constructor(root,  header) {
        this.#root = root
        this.#header = header
        this.#nunjucksTemplate = nunjucks.compile(registrationNunjucksTemplate)
    }
    render() {
        this.#root.innerHTML = ''
        this.#header.render()
        this.#root.appendChild(this.getNode())
        const passView = this.#root.querySelector("#view-pass")
        passView.addEventListener('click', viewPasswordClick)
        const passView2 = this.#root.querySelector("#view-pass2")
        passView2.addEventListener('click', viewPasswordClick)

        this.regForm = this.#root.querySelector("#regForm")
        this.regForm.addEventListener('input', this.formInputListener)
        this.regForm.addEventListener('submit', this.formSubmit);
        this.err = this.#root.querySelector("#error");
        console.log(this.err)
    }
    getNode() {
        const div = document.createElement('div');
        div.innerHTML = this.#nunjucksTemplate.render();
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
            default: {
            }
        }
        if (e.target.id === "pass1" || e.target.id === "pass2") {
            if (this.pass1 !== this.pass2) {
                this.err.innerHTML = 'пароли не совпадают'
            }
        }
    }
    formSubmit = async (e) => {
        e.preventDefault();
        this.err.innerHTML = '';
        if (this.pass1 !== this.pass2) {
            console.log("err", this.err);
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

            })
            const json = await resp.json()
            if (json.status !== 200) {
                console.log("json", json);
                console.log("err: ", json.err);
                this.err.innerHTML = json.err;
            }
        } catch (e) {
            console.log(e)
        }
        // console.log(this.email);
        // console.log(this.nickname);
        // console.log(this.age);
        // console.log(this.sex);
        // console.log(this.pass1);
        // console.log(this.pass2);
    }

}

