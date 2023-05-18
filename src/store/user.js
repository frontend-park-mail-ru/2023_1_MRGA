import {applyMiddleware, createStore, thunkMiddleware} from "../lib/redux";


const userActionTypes = {
    set: 'SET',
    get: 'GET',
    setPhotos: 'SET_PHOTOS',
    setInfoUser: 'SET_INFO_USER'
};

export const setUser = (user) => {
    userStore.dispatch({
        type: userActionTypes.set,
        payload: user
    });
}

export const getUser = () => {
    return userStore.getState().user;
}

const userReducer = (state, action) => {
    if (action.type === userActionTypes.set) {
        return {state, user: action.payload};
    }
    if (action.type === userActionTypes.get) {
        return {state};
    }

    if (action.type === userActionTypes.setPhotos) {
        return {state, photos: action.payload};
    }
    if (action.type === userActionTypes.setInfoUser) {
        return {state, infoUser: action.payload};
    }
    return state;
}


export const userStore = createStore(userReducer, undefined, applyMiddleware(thunkMiddleware));