
import styles from "../formElement.module.css";
import {Label} from "components/UI/forms/label/label";

export const TextAreaWithLabel = ({name, labelText, ref, className, ...props}) => {
    return (
        <span>
            <Label labelText={labelText} htmlFor={name}/>
            <textarea className={[styles.formElement, className].join(" ")}
                   name={name}
                   ref={ref}
                   {...props}
            />
        </span>
    );
};
