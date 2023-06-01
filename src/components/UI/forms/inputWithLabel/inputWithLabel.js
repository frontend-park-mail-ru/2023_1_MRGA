
import styles from "../formElement.module.css";
import {Label} from "components/UI/forms/label/label";

export const InputWithLabel = ({name, labelText, ref, className, ...props}) => {
    return (
        <span>
            <Label labelText={labelText} htmlFor={name}/>
            <input className={[styles.formElement, styles.blockWithText, className].join(" ")}
                   name={name}
                   ref={ref}
                   {...props}
            />
        </span>
    );
};
