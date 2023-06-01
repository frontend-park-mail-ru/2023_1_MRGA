import styles from "./warning.module.css";

export const Warning = ({className,...props}, children) => {
    return (
        <span className={[styles.errorText, className].join(" ")} {...props}>{children}</span>
    );
};
