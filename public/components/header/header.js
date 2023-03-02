export const RENDER_TYPE = {
    DOM: 'dom',
    NUNJUCKS: 'nunjucks'
}

const headerNunjucksTemplate =
    `<div class="headerContainer">
        <img src="./Logo.svg" width="203">
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
    render(type) {
        switch (type) {
            case RENDER_TYPE.DOM:
                this.renderDOM()
                break
            case RENDER_TYPE.NUNJUCKS:
                this.renderNunjucks()
                break
            default:
                this.renderDOM()
        }
    }
    renderNunjucks() {
        this.#root.innerHTML = this.#nunjucksTemplate.render({items: this.#items});
    }
    renderDOM() {
        this.#root.innerHTML = ''
        const headerContainer = document.createElement('div')
        headerContainer.classList.add('headerContainer')
        const logo = document.createElement('img')
        logo.src = './Logo.png'
        logo.width = 203
        headerContainer.appendChild(logo)
        const routes = document.createElement('div')

        this.#items.map(({key, href, textContent}) => {
            const headerElement = document.createElement('a')
            headerElement.href = href
            headerElement.textContent = textContent
            headerElement.dataset.section = key
            headerElement.classList.add('headerElement')
            routes.appendChild(headerElement)
        })
        headerContainer.appendChild(routes)
        this.#root.appendChild(headerContainer)
    }
}
