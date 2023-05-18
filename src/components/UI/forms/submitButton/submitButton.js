import styles from './submitButton.module.css'
import elementStyles from '../formElement.module.css'
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";

export const SubmitButton = ({style,...props}, children) => {
    const button = useRef();

    return (
        <button
            className={[elementStyles.formElement, styles.submitButton, style].join(' ')}
            type="submit"
            ref={button}
            {...props}
        >
            {children}
        </button>
    )
}