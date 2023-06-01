import styles from "./pageContainer.module.css";

export const PageContainer = (props, children) => {
    return (
        <div className={styles.pageContainer} {...props}>
            {children}
        </div>
    );
};
