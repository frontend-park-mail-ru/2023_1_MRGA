export const createStore = (rootReducer, initialState) => {
    let state = rootReducer(initialState, {type: '__INIT__'});
    const subscribers = [];
    const dispatch = (action) => {
        state = rootReducer(state, action);
        subscribers.forEach(sub => sub());
    };
    const subscribe = (callback) => {
        subscribers.push(callback);
    };
    const getState = () => {
        return state;
    };
    return {
        dispatch, subscribe, getState
    };
};