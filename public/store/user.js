const userToken = 'currentUser';


export class User {
    static setUser = (user) => {
        localStorage.setItem(userToken, JSON.stringify(user))
    }

    static getUser = () => {
        return JSON.parse(localStorage.getItem(userToken));
    }

}
