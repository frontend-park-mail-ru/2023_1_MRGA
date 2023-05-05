import styles from "components/UI/forms/formElement.module.css";

export const Label = ({labelText, ...props}) => {

    return (
        <>
            {labelText?
                <label className={styles.formLabel} {...props}>{labelText}</label>
                : ' '
            }
        </>
    )
}