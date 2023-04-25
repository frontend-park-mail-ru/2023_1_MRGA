export const isFunction = (obj) => {
    return typeof obj === 'function';
}

export const isArray = (obj) => {
    return obj instanceof Array;
}

export const isClass = (func) => {
    const stringRepresentation = func.toString();
    return /^class\s/.test(stringRepresentation);
}