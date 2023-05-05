import styles from '../formElement.module.css'

export const Select = ({...props}, children) => {
    return (
        <select className={styles.formElement} {...props}>
            {children}
        </select>
    )
}