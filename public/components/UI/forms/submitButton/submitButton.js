import styles from './submitButton.module.css'
import elementStyles from '../formElement.module.css'
import {useRef} from "@/lib/jsx/hooks/useRef";


export const SubmitButton = (props, children) => {
    const button = useRef();

    return (
        <button
            className={[elementStyles.formElement, styles.submitButton].join(' ')}
            type="submit"
            ref={button}
            {...props}
        >
            {children}
        </button>
    )
}