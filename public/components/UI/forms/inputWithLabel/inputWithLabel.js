
import styles from '../formElement.module.css'
import {Label} from "components/UI/forms/label/label";

export const InputWithLabel = ({name, labelText, ref, ...props}) => {
    return (
        <span>
            <Label labelText={labelText} htmlFor={name}/>
            <input className={styles.formElement}
                   name={name}
                   ref={ref}
                   {...props}
            />
        </span>
    )
}