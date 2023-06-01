import styles from "./formContainer.module.css";
export const FormContainer = (props, children) => {
    return (
        <div className={[styles.formContainer, props.className].join(" ")} {...props}>
            {children}
        </div>
    );
};
