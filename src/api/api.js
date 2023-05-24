import {Ajax} from "./ajax.js";

export const BackendProtocol = 'https';
export const BackendHost = 'meetme-app.ru';
export const BackendPort = 443;
export  const WSProtocol = 'wss';

// export const BackendProtocol = 'http';
// export const BackendHost = 'localhost';
// export const BackendPort = 81;
// export  const WSProtocol = 'ws';

const ApiUrl = `${BackendProtocol}://${BackendHost}:${BackendPort}`;

export class Tinder {

    static async login(loginData) {
        return Ajax.ajax(ApiUrl+"/api/login", "POST", {}, JSON.stringify(loginData))
    }
    static async registration(registrationData) {
        return Ajax.ajax(ApiUrl+"/api/register", "POST", {}, JSON.stringify(registrationData))
    }
    static async infoUser(infoUserData) {
        return Ajax.ajax(ApiUrl+"/api/auth/info-user", "POST", {}, JSON.stringify(infoUserData))
    }
    static async putInfoUser(infoUserData) {
        return Ajax.ajax(ApiUrl+"/api/auth/info-user", "PUT", {}, JSON.stringify(infoUserData))
    }
    static async complainUser(userId) {
        return Ajax.ajax(ApiUrl+"/api/auth/complain", "POST", {}, JSON.stringify(userId))
    }
    static async filters(filtersData) {
        return Ajax.ajax(ApiUrl+"/api/auth/filters", "POST", {}, JSON.stringify(filtersData))
    }
    static async putFilters(filtersData) {
        return Ajax.ajax(ApiUrl+"/api/auth/filters", "PUT", {}, JSON.stringify(filtersData))
    }
    static async putHashtags(filtersData) {
        return Ajax.ajax(ApiUrl+"/api/auth/hashtags-user", "PUT", {}, JSON.stringify(filtersData))
    }
    static async getFilters() {
        return Ajax.ajax(ApiUrl+"/api/auth/filters", "GET", {})
    }
    static async getMyHashtags() {
        return Ajax.ajax(ApiUrl+"/api/auth/hashtags-user", "GET", {})
    }
    static async getInfoUser() {
        return Ajax.ajax(ApiUrl+"/api/auth/info-user", "GET");
    }
    static async getInfoUserById(id) {
        return Ajax.ajax(ApiUrl+`/api/auth/info-user/${id}`, "GET");
    }
    static async createChat(userIds) {
        return Ajax.ajax(ApiUrl+"/api/auth/chats/create", "POST", {}, JSON.stringify(userIds));
    }
    static async sendMessage(chatId, msgData) {
        return Ajax.ajax(ApiUrl+`/api/auth/chats/${chatId}/send`, "POST", {}, JSON.stringify(msgData));
    }
    static async getChats() {
        return Ajax.ajax(ApiUrl+"/api/auth/chats/list", "GET");
    }
    static async getMessages(chatId) {
        return Ajax.ajax(ApiUrl+`/api/auth/chats/${chatId}/messages`, "GET");
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
        return Ajax.ajax(ApiUrl+"/api/auth/user", "GET")
    }
    static async logout() {
        return Ajax.ajax(ApiUrl+"/api/auth/logout", "POST")
    }
    static async getRecommendation() {
        return Ajax.ajax(ApiUrl+"/api/auth/recommendation", "GET")
    }
    static async getMatches() {
        return Ajax.ajax(ApiUrl+"/api/auth/match", "GET")
    }
    static async postReaction(reactionData) {
        return Ajax.ajax(ApiUrl+"/api/auth/reaction", "POST", {}, JSON.stringify(reactionData))
    }
    static async getTranscription(path) {
        return Ajax.ajax(ApiUrl+`/api/auth/audio/transcribe/${path}`, "GET")
    }
    static async postPhotos(photosData) {
        return Ajax.ajax(ApiUrl+`/api/auth/photos/upload`, "POST", {}, photosData)
    }
    static async postFiles(photosData) {
        return Ajax.ajax(ApiUrl+`/api/auth/files/upload`, "POST", {}, photosData)
    }
    static async putPhoto(photosData, number) {
        return Ajax.ajax(ApiUrl+`/api/auth/photo/${number}`, "PUT", {}, photosData)
    }
    static async deletePhoto(number) {
        return Ajax.ajax(ApiUrl+`/api/auth/photo/${number}`, "DELETE", {})
    }
    static async addHashTags(hashTagsData) {
        return Ajax.ajax(ApiUrl+`/api/auth/hashtags-user`, "POST", {}, JSON.stringify(hashTagsData))
    }
    static async getPhoto(photoID) {
        return Ajax.ajax(ApiUrl+`/api/auth/photo/${photoID}`, "GET");
    }
    static async deleteMatch(userID) {
        return Ajax.ajax(ApiUrl+`/api/auth/match/${userID}`, "DELETE");
    }
}
