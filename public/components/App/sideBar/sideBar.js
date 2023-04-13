import styles from './sideBar.module.css'
import {User} from "@/store/user";
import {Tinder} from "@/api/api";
import {Link} from "@/lib/jsx/components/link/link";

import man from "assets/img/man.png";
import home from "assets/svg/home.svg"
import message from "assets/svg/message.svg"
import matches from "assets/svg/matches.svg"
import profile from "assets/svg/profile.svg"
import {useRef} from "@/lib/jsx/hooks/useRef";

export const SideBar = () => {
    const name = useRef();

    const ff = async () => {
        const resp = await Tinder.getUser();
        const json = await resp.json();
        name.getValue().innerHTML = JSON.stringify(json);
    }
    ff();
    // console.log(name)
    // console.log(user)

    return (
        <div className={styles.sideBar}>
            <div className={styles.profileInfo}>
                <img className={styles.avatar} src={man} alt=""/>
                    <div id="userName" className={styles.name} ref={name}>
                        идет загрузка...
                    </div>
            </div>
            <div className={styles.spacer}></div>

            <div className={styles.buttons}>
                <Link className={styles.btn} href="/">
                    <object className={styles.icon} data={home}></object>
                    Знакомства
                </Link>

                <Link className={styles.btn} href="/">
                    <object className={styles.icon} data={message}></object>
                    Сообщения
                </Link>
                <Link className={styles.btn} href="/">
                    <object className={styles.icon} data={matches}></object>
                    Совпадения
                </Link>
                <Link className={styles.btn} href="/">
                    <object className={styles.icon} data={profile}></object>
                    Профиль
                </Link>

            </div>
            <div className={styles.spacer}></div>

        </div>
    )
}