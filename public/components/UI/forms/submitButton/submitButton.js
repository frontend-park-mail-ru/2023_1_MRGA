import styles from './submitButton.module.css'
import elementStyles from '../formElement.module.css'
import {useRef} from "@/lib/jsx/hooks/useRef";


const observer = new MutationObserver(function(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
            const newValue = mutation.target.getAttribute('disabled');
            console.log('Attribute "disabled" has changed to:', newValue);
        }
    }
});

const onLoad = () => {
    observer.observe(button.getValue(), { attributes: true, attributeFilter: ['disabled'] });
}

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