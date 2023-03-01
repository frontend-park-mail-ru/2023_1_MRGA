export const RENDER_TYPE = {
    DOM: 'dom'
}

export class headerComponent {
    #root
    #items
    constructor(root) {
        this.#root = root
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
            default:
                this.renderDOM()
        }
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