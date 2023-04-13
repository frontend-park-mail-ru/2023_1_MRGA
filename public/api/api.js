import {Ajax} from "./ajax.js";

const BackendHost = 'http://localhost:8080/'
    // window.location.href.includes('localhost')
    // ? 'http://localhost:8080/'
    // : 'http://5.159.100.59:8080/';

const ApiUrl = BackendHost;
// const fakeUrl = "https://jsonplaceholder.typicode.com/"
// const fakeUrl = "http://localhost:8080/"

export class Tinder {

    static async login(loginData) {
        return Ajax.ajax(ApiUrl+"api/login", "POST", {}, JSON.stringify(loginData))
    }
    static async registration(registrationData) {
        return Ajax.ajax(ApiUrl+"api/register", "POST", {}, JSON.stringify(registrationData))
    }
    static async infoUser(infoUserData) {
        infoUserData.sex = sexToNumber(infoUserData.sex)
        return Ajax.ajax(ApiUrl+"meetme/info-user", "POST", {}, JSON.stringify(infoUserData))
    }
    static async filters(filtersData) {
        filtersData.sexSearch = sexSearchToNumber(filtersData.sexSearch)
        return Ajax.ajax(ApiUrl+"meetme/filters", "POST", {}, JSON.stringify(filtersData))
    }
    static async getCities() {
        return Ajax.ajax(ApiUrl+"api/cities", "GET")
    }
    static async getZodiac() {
        return Ajax.ajax(ApiUrl+"api/zodiac", "GET")
    }
    static async getEducation() {
        return Ajax.ajax(ApiUrl+"api/education", "GET")
    }
    static async getJob() {
        return Ajax.ajax(ApiUrl+"api/job", "GET")
    }
    static async getReason() {
        return Ajax.ajax(ApiUrl+"api/reason", "GET")
    }
    static async getHashTags() {
        return Ajax.ajax(ApiUrl+"api/hashtags", "GET")
    }
    // static async getInfoUser() {
    //     return Ajax.ajax(ApiUrl+"api/hashtags", "GET")
    // }

    static async getUser() {
        return Ajax.ajax(ApiUrl+"meetme/user", "GET")
        // return Ajax.ajax(fakeUrl+"users/1", "GET")
    }
    static async logout() {
        return Ajax.ajax(ApiUrl+"meetme/logout", "POST")
    }
    static async getRecommendation() {
        return Ajax.ajax(ApiUrl+"meetme/recommendation", "GET")
    }
    static async getMatch() {
        return Ajax.ajax(ApiUrl+"meetme/match", "GET")
    }
    static async reaction(reactionData) {
        return Ajax.ajax(ApiUrl+"meetme/reaction", "POST", {}, JSON.stringify(reactionData))
    }
    static async photo(photoData) {
        return Ajax.ajax(ApiUrl+`meetme/photo/${photoData.avatar}`, "POST", {}, photoData.photo)
    }
    static async addHashTags(hashTagsData) {
        return Ajax.ajax(ApiUrl+`meetme/hashtags-user`, "POST", {}, JSON.stringify(hashTagsData))
    }
}


function sexToNumber(sex) {
    switch (sex) {
        case "М":
            return 0;
        case "Ж":
            return 1;
        default:
            break;
    }
}

function sexSearchToNumber(sex) {
    switch (sex) {
        case "М":
            return 0;
        case "Ж":
            return 1;
        case "ВСЕ":
            return 2;
        default:
            break;
    }
}
