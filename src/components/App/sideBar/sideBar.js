import styles from "./sideBar.module.css";
import {Tinder, BackendProtocol, BackendHost, BackendPort} from "@/api/api";
import loading from "@/assets/img/loading.png";
import {Link} from "@/lib/jsx/components/link/link";

import home from "assets/img/home.png";
import matches from "assets/img/matchMenu.png";
import message from "assets/img/chatMenu.png";
import profile from "assets/img/user.png";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";

export const SideBar = ({current}) => {
    const loadingPhoto = loading;

    const nameAndAge = useRef();

    const profilePhoto = useRef();

    const onPhotoError = (e) => {
        e.target.src = loadingPhoto;
    };
    const makePage = async () => {
        const respUserInfo = await Tinder.getUser();
        const jsonUserInfo = await respUserInfo.json();
        if (jsonUserInfo.status !== 200) {
            console.log(jsonUserInfo.error);
            return;
        }
        const bodyUserInfo = jsonUserInfo.body;
        nameAndAge.getValue().innerText = `${bodyUserInfo.name}, ${bodyUserInfo.age}`;
        profilePhoto.getValue().src = `${BackendProtocol}://${BackendHost}:${BackendPort}/api/auth/photo/${bodyUserInfo.avatarId}`;
    };
    makePage();
    const links = [
        {href: "/", text: "Знакомства", src: home, current: "/" === current},
        {href: "/matches", text: "Совпадения", src: matches, current: "/matches" === current},
        {href: "/profile", text: "Профиль", src: profile, current: "/profile" === current},
        {href: "/chat", text: "Сообщения", src: message, current: "/chat" === current},
    ];
    return (
        <div className={styles.sideBar}>
            <div className={styles.profileInfo}>
                <img ref={profilePhoto} onError={onPhotoError} className={styles.avatar} src={loadingPhoto} alt=""/>
                    <div ref={nameAndAge} className={styles.name}>
                    </div>
            </div>
            <div className={styles.spacer}></div>

            <div className={styles.buttons}>
                {links.map(({href, text, src, current}) => {
                    const classList = [styles.btn];
                    if (current) {
                        classList.push(styles.current);
                    }
                    return <Link href={href} className={classList.join(" ")}>
                        <div className={styles.menuContainer}>
                            <img className={[styles.icon].join(" ")} src={src}/>
                            {text}
                        </div>
                    </Link>;
                })}
            </div>
            <div className={styles.spacer}></div>

        </div>
    );
};
