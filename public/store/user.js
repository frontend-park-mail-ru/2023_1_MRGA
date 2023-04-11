import {createStore} from "../lib/redux";
import {Tinder} from "@/api/api";

const userToken = 'currentUser';


export class User {
    #state = {};

    static setUser = (user) => {
        localStorage.setItem(userToken, JSON.stringify(user))
    }
    static getUser = async () => {
        const user = await Tinder.getUser();
        // console.log(user);
        // return JSON.parse(localStorage.getItem(userToken));
    }
}

const userActionTypes = {
  set: 'SET'
};

export const setUser = (user) => {
    return {
        type: userActionTypes.set,
        payload: user
    }
}
const userReducer = (state, action) => {
    if (action.type === userActionTypes.set) {
        return {state, ...action.payload};
    }
}

export const userStore = createStore(userReducer, undefined);