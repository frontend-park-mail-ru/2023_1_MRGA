const registrationNunjucksTemplate =
    `<div class="authorizationContainer">
        <form class="authorizationForm">
            <img src="./LogoMini.svg" width="46">
            <span>
                <label for="email" class="authLabel">Email Address</label>
                <input class="authorizationFormElement" name="email" type="email" placeholder="123@mail.ru">
            </span>
            <span class="password">
                <label for="password" class="authLabel">Password</label>
                <input name="password" class="authorizationFormElement" type="password" placeholder="введите ваш пароль">
                <a href=# class="password-control" id="view-pass"></a>
            </span>
            <span class="password">
                <label for="password" class="authLabel">Password repeat</label>
                <input name="password" class="authorizationFormElement" type="password" placeholder="введите ваш пароль">
                <a href=# class="password-control" id="view-pass2"></a>
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
    }
    getNode() {
        const div = document.createElement('div');
        div.innerHTML = this.#nunjucksTemplate.render();
        return div.firstChild;
    }

}
