import styles from './submitButton.module.css'
import elementStyles from '../formElement.module.css'

export const SubmitButton = (props, children) => {
    return (
        <button
            className={[elementStyles.formElement, styles.submitButton].join(' ')}
            type="submit"
            {...props}
        >
            {children}
        </button>
    )
}