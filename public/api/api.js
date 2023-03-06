import {Ajax} from "./ajax.js";

export const BackendHost = "http://5.159.100.59:8080";
// export const BackendHost = "http://localhost:8080";

const ApiUrl = BackendHost+"/meetme/";

export class Tinder {

    static async login(loginData) {
        return Ajax.ajax(ApiUrl+"login", "POST", {}, JSON.stringify(loginData))
    }
    static async registration(registrationData) {
        registrationData.sex = sexToNumber(registrationData.sex)
        return Ajax.ajax(ApiUrl+"register", "POST", {}, JSON.stringify(registrationData))
    }
    static async getCities() {
        return Ajax.ajax(ApiUrl+"cities", "GET")
    }

    static async getUser() {
        return Ajax.ajax(ApiUrl+"user", "GET")
    }
    static async logout() {
        return Ajax.ajax(ApiUrl+"logout", "POST")
    }
    static async recommendations() {
        return Ajax.ajax(ApiUrl+"recommendations", "GET")
    }
}

function sexToNumber(sex) {
    switch (sex) {
        case "М":
            return  0;
        case "Ж":
            return 1
        default:
            break;
    }
}
