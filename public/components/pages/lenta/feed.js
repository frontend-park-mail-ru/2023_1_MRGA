import {Tinder} from "../../../api/api.js";
import { swipe } from "../../../utils/swipe.js";
import {userStore} from "../../../store/user.js";
import * as nunjucks from "nunjucks"

const feedNunjucksTemplate =
`<div class="container">
    <div class="side">
        <div class="header">
            <div class="avatar">
                    <img src="{{context.avatar}}">
            </div>
            <div class="title">{{context.username}}</div>
            <div class="logout-btn-box">
                <a class="logout" id="logout">Log out</a>
            </div>
        </div>
        <div class="menu">
            <ul>
<!--                <li>Совпадения</li>-->
<!--                <li>Сообщения</li>-->
                <li class="active">Поиск</li>
            </ul>
        </div>
    </div>
    <div class="content">
        {%if isContent %}
            <div class="card" onselectstart="return false">
            <div class="swipe pointer user inline_block">
                <img ondragstar="return false"
                    class="user"
                    id="rec-avatar"
                    src="{{recommendation.avatar}}"
                    alt=""
                />
                <div class="profile">
                    <div class="name">{{recommendation.username}} <span>{{recommendation.age}}</span></div>
                    <div class="local">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Москва</span>
                    </div>
                </div>
            </div>
            <div class="user_desc inline_block">{{recommendation.description}}</div>
        </div>
        <div class="buttons">
            <div id="no" class="no pointer">
                <i id="no" class="fas fa-times"></i>
            </div>
            <div id="star" id="star" class="star pointer">
                <i id="star" class="fas fa-star fa"></i>
            </div>
            <div id="heart" class="heart pointer">
                <i id="heart" class="fas fa-heart"></i>
            </div>
        </div>
        {% else %}
        <div> Список пользователей закончился </div>
        {% endif %}
        
        
    </div>
</div>`;

export class feedPage {
    #root
    #nunjucksTemplate
    #logoutLink
    #onLogoout
    #recomendations
    #counter
    user
    constructor(root, onLogout) {
        this.#root = root
        this.#nunjucksTemplate = nunjucks.compile(feedNunjucksTemplate);
        this.#onLogoout = onLogout;
        this.#counter = 0;
    }
    initEventListeners() {
        this.#logoutLink = this.#root.querySelector("#logout")
        this.#logoutLink.addEventListener('click', this.#onLogoout);
        const buttons = this.#root.querySelector(".buttons");
        const card = this.#root.querySelector(".swipe");
        if (buttons) {
            buttons.addEventListener('click', this.#onButtonsClick, true)
            card.addEventListener('swipe', this.#onSwipe, true)
            swipe(card, { maxTime: 1000, minTime: 100, maxDist: 150,  minDist: 60 });
            const recAvatar = this.#root.querySelector("#rec-avatar");
            recAvatar.addEventListener('dragstart', e => {
                e.preventDefault();
            })
        }   
    }
    render = async () => {
         this.user = userStore.getState()

        const recommendationsQueryResponse = await Tinder.recommendations();
        const jsonResponse = await recommendationsQueryResponse.json();
        if (jsonResponse.status !== 200 || jsonResponse.recommendations.length < 1) {
            this.#recomendations = [];
            this.#root.innerHTML = this.#nunjucksTemplate.render({context: this.user, isContent: false});
            this.initEventListeners()
            return
        }
        this.#recomendations = jsonResponse.recommendations;
        this.#root.innerHTML = this.#nunjucksTemplate.render({context: this.user, recommendation: this.#recomendations[this.#counter++], isContent: true})

        this.initEventListeners()
    }
    #onSwipe = async (e) => {
        if (e.detail.dir == "left" || e.detail.dir == "right") {
            this.nextRec();
        }
    }
    #onButtonsClick = async (e) => {
        let button = false;
        switch (e.target.id) {
            case "no": {
                button = true;
                break;
            }
            case "star": {
                button = true;
                break;
            }
            case "heart": {
                button = true;
                break;
            }
        }
        if (button) {
           this.nextRec();
        }
    }
    nextRec = async () => {
        if (this.#counter >= this.#recomendations.length) {
            this.#root.innerHTML = this.#nunjucksTemplate.render({context: this.user, isContent: false})
            this.initEventListeners()
            return
        }
        this.#root.innerHTML = this.#nunjucksTemplate.render({context: this.user,
            recommendation: this.#recomendations[this.#counter++],
            isContent: true})
        this.initEventListeners()
    }
}

