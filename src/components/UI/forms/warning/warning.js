import styles from './warning.module.css'

export const Warning = (props, children) => {
    return (
        <span className={styles.errorText} {...props}>{children}</span>
    )
}