import {loginPage, signupPage} from "../../index.js"
import logo from "../../assets/Logo.svg"
import * as nunjucks from "nunjucks"

export const RENDER_TYPE = {
    NUNJUCKS: 'nunjucks'
}

const headerConfig = {
    login: {
        href: '/login',
        textContent: 'Login',
        openMethod: loginPage
    },
    signup: {
        href: '/signup',
        textContent: 'Create account',
        openMethod: signupPage
    }
}

export const menuItems = Object.entries(headerConfig).map(([key, {href, textContent}]) => ({key, href, textContent}))

const headerNunjucksTemplate =
    `<div class="headerContainer">
        <img src={{logo}} width="203">
        <div>
            {% for item in items %}
            <a href={{item.href}} data-section={{item.key}} class="headerElement"> {{item.textContent}}</a>
            {% endfor %}
        </div>
    </div>`;

export class headerComponent {
    #root
    #items
    #nunjucksTemplate
    #node
    constructor(root) {
        this.#root = root
        this.#nunjucksTemplate = nunjucks.compile(headerNunjucksTemplate)
    }
    set items(value) {
        this.#items = value
    }
    get items() {
        return this.#items
    }
    init() {
        const div = document.createElement('div')
        div.innerHTML = this.#nunjucksTemplate.render({items: this.#items, logo: logo});
        this.#node =  div.firstChild;
    }
    render(type) {
        switch (type) {
            case RENDER_TYPE.NUNJUCKS:
            default:
                this.renderNunjucks()
        }
    }
    renderNunjucks() {
        this.#root.appendChild(this.getNode());
        const header = this.#root.querySelector(".headerContainer")
        header.addEventListener('click', (event) => {
            const {target} = event

            if (target instanceof HTMLAnchorElement) {
                event.preventDefault()

                const {section} = target.dataset
                headerConfig[section].openMethod()
            }
        })
    }
    getNode() {
        this.init()
        return this.#node
    }
}
