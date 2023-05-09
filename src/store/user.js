import {applyMiddleware, createStore, thunkMiddleware} from "../lib/redux";
import {Tinder} from "@/api/api";


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

export const getInfoUser = () => {
    return async (dispatch, getState) => {
        try {
            const infoUser = await Tinder.getInfoUser();
            const json = await infoUser.json();
            // console.log(json);
            dispatch({type: userActionTypes.setInfoUser, payload: json});
        } catch (e) {
        //   console.log(e)
        }
    }
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

export const getPhotos = () => {
    return async (dispatch, getState) => {
        try {
            const data = await Tinder.getPhoto(getUser().avatarId);
            const formData = await data.formData();
            const file = formData.get('file');
            // console.log(file);
            // dispatch({type: userActionTypes.setPhotos, photos});
        } catch (e) {
            // console.log(e);
        }

    }
}

export const userStore = createStore(userReducer, undefined, applyMiddleware(thunkMiddleware));