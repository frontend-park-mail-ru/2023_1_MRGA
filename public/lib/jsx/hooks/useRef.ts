export interface IUseRefResult<T> {
    getValue: () => T
    setValue: (T) => void

}

export const useRef = <T = any | {}>() : IUseRefResult<T> => {
    let value: T;
    const setValue = (val) => {
        value = val;
    }
    const getValue = () => {
        return value;
    }
    return {getValue, setValue};
}