import styles from '../formElement.module.css'
import selectStyles from './select.module.css'

export const Select = ({className, ...props}, children) => {
    const onFocus = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add(selectStyles.borderForSelect);
    }
    const onBlur = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove(selectStyles.borderForSelect);
    }

    return (
        <div onFocusin={onFocus} onFocusout={onBlur} className={[selectStyles.selectWrapper, className].join(' ')}>
        <select className={[selectStyles.select, selectStyles.selectFocus,className].join(' ')} {...props}>
            {children}
        </select>
        </div>
    )
}