import styles from './submitButton.module.css'
import elementStyles from '../formElement.module.css'
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";


const observer = new MutationObserver(function(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
            const newValue = mutation.target.getAttribute('disabled');
        }
    }
});

const onLoad = () => {
    observer.observe(button.getValue(), { attributes: true, attributeFilter: ['disabled'] });
}

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