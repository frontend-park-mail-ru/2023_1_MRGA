
export class lentaPage {
    #root
    constructor(root) {
        this.#root = root
    }

    render = () => {
        this.#root.innerHTML = ''
    }
}