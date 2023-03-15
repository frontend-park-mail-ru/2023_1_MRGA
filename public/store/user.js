import {createStore} from "../lib/redux.js";

const userToken = 'currentUser';


export class User {
    static setUser = (user) => {
        localStorage.setItem(userToken, JSON.stringify(user))
    }
    static getUser = () => {
        return JSON.parse(localStorage.getItem(userToken));
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