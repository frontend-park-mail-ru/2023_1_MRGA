import styles from './sideBar.module.css'
import {User} from "@/store/user";
import {Tinder} from "@/api/api";


export const SideBar = () => {
    const name = Tinder.getUser()
        .then(result => result.json())
        .then((user) => {
            document.getElementById("userName").innerText = user.name;
        });
    console.log("hello")
    // console.log(name)
    // console.log(user)

    return (
        <div className={styles.sideBar}>
            <div className={styles.profileInfo}>
                <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
                    <div id="userName" className={styles.name}>
                        {/*Александр, 28*/}
                        {/*{name}*/}
                    </div>
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