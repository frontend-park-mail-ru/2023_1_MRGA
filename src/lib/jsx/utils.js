export const isFunction = (obj) => {
    return typeof obj === "function";
};

export const isArray = (obj) => {
    return obj instanceof Array;
};

export const isClass = (func) => {
    const stringRepresentation = func.toString();
    return /^class\s/.test(stringRepresentation);
};

export const cantRender = (VNode) => {
    return (VNode === null || VNode === undefined);
};

export const convertToDate = (dateString) => {
    const [time, date] = dateString.split(" ");
    const [hours, minutes] = time.split(":");
    const [day, month, year] = date.split(".");

    const currentYear = new Date().getFullYear();
    if (parseInt(year, 10) === currentYear) {
        return `${day}.${month}\t${hours}:${minutes}`;
    } else {
        return `${day}.${month}.${year.slice(-2)}\t${hours}:${minutes}`;
    }
};
