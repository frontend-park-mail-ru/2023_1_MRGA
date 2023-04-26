export const createStore = (rootReducer, initialState, enhancer) => {
    if (enhancer) {
        return enhancer(createStore)(rootReducer, initialState);
    }
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


export const thunkMiddleware = ({ dispatch, getState }) => {
    return next => action => {
        // Если action является функцией, вызываем ее с аргументами dispatch и getState
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }

        // Если action не является функцией, передаем его дальше по цепочке middleware
        return next(action);
    };
}

export const applyMiddleware = (...middlewares) => {
    return createStore => (reducer, initialState) => {
        const store = createStore(reducer, initialState);
        const middlewareAPI = {
            getState: store.getState,
            dispatch: action => store.dispatch(action),
        };

        const chain = middlewares.map(middleware => middleware(middlewareAPI));
        const dispatch = chain.reduce((result, nextMiddleware) => nextMiddleware(result), store.dispatch);
        return {
            ...store,
            dispatch,
        };
    };
}