export const isFunction = (obj) => {
    return obj && typeof obj === 'function';
}

export const isArray = (obj) => {
    return obj instanceof Array;
}