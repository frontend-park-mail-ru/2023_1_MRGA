import styles from './sideBar.module.css'

export const SideBar = (props) => {
    return (
        <div className={styles.sideBar}>
            <div className={styles.profileInfo}>
                <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
                    <div className={styles.name}>Александр, 28</div>
            </div>
            <div className={styles.spacer}></div>

            <div className={styles.buttons}>
                <a className={styles.btn} href="#">
                    <object className={styles.icon} data="../../../assets/svg/home.svg"></object>
                    Знакомства
                </a>

                <a className={styles.btn} href="#">
                    <object className={styles.icon} data="../../../assets/svg/message.svg"></object>
                    Сообщения
                </a>

                <a className={styles.btn} href="#">
                    <object className={styles.icon} data="../../../assets/svg/matches.svg"></object>
                    Совпадения
                </a>
                <a className={styles.btn} href="#">
                    <object className={styles.icon} data="../../../assets/svg/profile.svg"></object>
                    Профиль
                </a>

            </div>
            <div className={styles.spacer}></div>

        </div>
    )
}