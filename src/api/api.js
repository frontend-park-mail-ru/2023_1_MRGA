import {Ajax} from "./ajax.js";

export const BackendProtocol = 'https';
export const BackendHost = 'meetme-app.ru';
// export const BackendHost = 'localhost';
export const BackendPort = 444;

// const BackendHost = window.location.href.includes('localhost')
//     ? 'http://localhost:8080/'
//     : 'http://meetme-app.ru:8080/'

const ApiUrl = `${BackendProtocol}://${BackendHost}:${BackendPort}`;


export class Tinder {

    static async login(loginData) {
        return Ajax.ajax(ApiUrl+"/api/login", "POST", {}, JSON.stringify(loginData))
    }
    static async registration(registrationData) {
        return Ajax.ajax(ApiUrl+"/api/register", "POST", {}, JSON.stringify(registrationData))
    }
    static async infoUser(infoUserData) {
        return Ajax.ajax(ApiUrl+"/meetme/info-user", "POST", {}, JSON.stringify(infoUserData))
    }
    static async putInfoUser(infoUserData) {
        return Ajax.ajax(ApiUrl+"/meetme/info-user", "PUT", {}, JSON.stringify(infoUserData))
    }
    static async complainUser(userId) {
        return Ajax.ajax(ApiUrl+"/meetme/complain", "POST", {}, JSON.stringify(userId))
    }
    static async filters(filtersData) {
        return Ajax.ajax(ApiUrl+"/meetme/filters", "POST", {}, JSON.stringify(filtersData))
    }
    static async putFilters(filtersData) {
        return Ajax.ajax(ApiUrl+"/meetme/filters", "PUT", {}, JSON.stringify(filtersData))
    }
    static async getFilters() {
        return Ajax.ajax(ApiUrl+"/meetme/filters", "GET", {})
    }
    static async getMyHashtags() {
        return Ajax.ajax(ApiUrl+"/meetme/hashtags-user", "GET", {})
    }
    static async getInfoUser() {
        return Ajax.ajax(ApiUrl+"/meetme/info-user", "GET");
    }
    static async getInfoUserById(id) {
        return Ajax.ajax(ApiUrl+`/meetme/info-user/${id}`, "GET");
    }
    static async createChat(userIds) {
        return Ajax.ajax(ApiUrl+"/meetme/chats/create", "POST", {}, JSON.stringify(userIds));
    }
    static async sendMessage(chatId, msgData) {
        return Ajax.ajax(ApiUrl+`/meetme/chats/${chatId}/send`, "POST", {}, JSON.stringify(msgData));
    }
    static async getChats() {
        return Ajax.ajax(ApiUrl+"/meetme/chats/list", "GET");
    }
    static async getMessages(chatId) {
        return Ajax.ajax(ApiUrl+`/meetme/chats/${chatId}/messages`, "GET");
    }
    static async getCities() {
        return Ajax.ajax(ApiUrl+"/api/cities", "GET")
    }
    static async getZodiac() {
        return Ajax.ajax(ApiUrl+"/api/zodiac", "GET")
    }
    static async getEducation() {
        return Ajax.ajax(ApiUrl+"/api/education", "GET")
    }
    static async getJob() {
        return Ajax.ajax(ApiUrl+"/api/job", "GET")
    }
    static async getReason() {
        return Ajax.ajax(ApiUrl+"/api/reason", "GET")
    }
    static async getHashTags() {
        return Ajax.ajax(ApiUrl+"/api/hashtags", "GET")
    }

    static async getUser() {
        return Ajax.ajax(ApiUrl+"/meetme/user", "GET")
    }
    static async logout() {
        return Ajax.ajax(ApiUrl+"/meetme/logout", "POST")
    }
    static async getRecommendation() {
        return Ajax.ajax(ApiUrl+"/meetme/recommendation", "GET")
    }
    static async getMatches() {
        return Ajax.ajax(ApiUrl+"/meetme/match", "GET")
    }
    static async postReaction(reactionData) {
        return Ajax.ajax(ApiUrl+"/meetme/reaction", "POST", {}, JSON.stringify(reactionData))
    }
    static async postPhotos(photosData) {
        return Ajax.ajax(ApiUrl+`/meetme/photos/upload`, "POST", {}, photosData)
    }
    static async putPhoto(photosData, number) {
        return Ajax.ajax(ApiUrl+`/meetme/photo/${number}`, "PUT", {}, photosData)
    }
    static async deletePhoto(number) {
        return Ajax.ajax(ApiUrl+`/meetme/photo/${number}`, "DELETE", {})
    }
    static async addHashTags(hashTagsData) {
        return Ajax.ajax(ApiUrl+`/meetme/hashtags-user`, "POST", {'Content-Type': 'multipart/form-data'}, JSON.stringify(hashTagsData))
    }
    static async getPhoto(photoID) {
        return Ajax.ajax(ApiUrl+`/meetme/photo/${photoID}`, "GET");
    }
    static async deleteMatch(userID) {
        return Ajax.ajax(ApiUrl+`/meetme/match/${userID}`, "DELETE");
    }
}

