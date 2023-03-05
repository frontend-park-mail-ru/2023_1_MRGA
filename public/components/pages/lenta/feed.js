const feedNunjucksTemplate =
`<div class="container">
    <div class="side">
        <div class="header">
            <div class="avatar">
                <img src="https://randomuser.me/api/portraits/women/64.jpg" alt="" />
            </div>
            <div class="title">MashaNab</div>
        </div>
        <div class="menu">
            <ul>
                <li>Matches</li>
                <li>Mensagens</li>
                <li class="active">Dating</li>
            </ul>
        </div>
    </div>
    <div class="content">
        <div class="card">
            <div class="user inline_block">
                <img
                    class="user"
                    src="https://fikiwiki.com/uploads/posts/2022-02/1644859470_27-fikiwiki-com-p-kartinki-krasivikh-devushek-bryunetok-35.jpg"
                    alt=""
                />
                <div class="profile">
                    <div class="name">Dinero <span>19</span></div>
                    <div class="local">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Москва</span>
                    </div>
                </div>
            </div>
            <div class="user_desc inline_block">
                
            </div>
        </div>
        <div class="buttons">
            <div class="no">
                <i class="fas fa-times"></i>
            </div>
            <div class="star">
                <i class="fas fa-star fa"></i>
            </div>
            <div class="heart">
                <i class="fas fa-heart"></i>
            </div>
        </div>
    </div>
</div>`;

export class feedPage {
    #root
    #nunjucksTemplate

    constructor(root) {
        this.#root = root
        this.#nunjucksTemplate = nunjucks.compile(feedNunjucksTemplate)
    }
    render = () => {
        this.#root.innerHTML = this.#nunjucksTemplate.render()
    }
}
