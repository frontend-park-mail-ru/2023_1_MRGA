import styles from "./headerContainer.module.css";

export const HeaderContainer = (props, children) => {
    return (
        <div className={styles.headerContainer} {...props}>
            {children}
        </div>
    );
};
