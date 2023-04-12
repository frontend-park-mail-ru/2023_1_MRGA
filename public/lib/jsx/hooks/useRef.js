export const useRef = () => {
    let value;
    const setValue = (val) => {
        value = val;
    }
    const getValue = () => {
        return value;
    }
    return {getValue, setValue};
}
