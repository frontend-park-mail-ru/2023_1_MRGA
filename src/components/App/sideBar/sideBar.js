import styles from './sideBar.module.css'
import {Tinder} from "@/api/api";
import loading from "@/assets/img/loading.png";
import {Link} from "@/lib/jsx/components/link/link";

import home from 'assets/svg/home.svg'
import matches from 'assets/svg/matches.svg'
import message from 'assets/svg/message.svg'
import profile from 'assets/svg/profile.svg'
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";

export const SideBar = () => {
    const loadingPhoto = loading;

    const nameAndAge = useRef();

    const profilePhoto = useRef();

    const onPhotoError = (e) => {
        e.target.src = loadingPhoto;
    }
    const makePage = async () => {
        let respUserInfo = await Tinder.getUser();
        let jsonUserInfo = await respUserInfo.json();
        if (jsonUserInfo.status !== 200) {
            return;
        }
        let bodyUserInfo = jsonUserInfo.body;
        nameAndAge.getValue().innerText = `${bodyUserInfo.name}, ${bodyUserInfo.age}`;
        const photo = (await (await Tinder.getPhoto(bodyUserInfo.avatarId)).formData()).get('file');
        const imageUrl = URL.createObjectURL(photo);
        profilePhoto.getValue().src = imageUrl;
    }
    makePage();

    return (
        <div className={styles.sideBar}>
            <div className={styles.profileInfo}>
                <img ref={profilePhoto} onError={onPhotoError} className={styles.avatar} src={loadingPhoto} alt=""/>
                    <div ref={nameAndAge} className={styles.name}>
                    </div>
            </div>
            <div className={styles.spacer}></div>

            <div className={styles.buttons}>
                <Link href={"/"} className={styles.btn}>
                    <img className={styles.icon} src={home}/>
                    Знакомства
                </Link>

                <Link href={"/matches"} className={styles.btn}>
                    <img className={styles.icon} src={matches}/>
                    Совпадения
                </Link>
                <Link href={"/profile"} className={styles.btn}>
                    <img className={styles.icon} src={profile}/>
                    Профиль
                </Link>
                <Link href={"/chat"} className={styles.btn}>
                    <img className={styles.icon} src={message}/>
                    Сообщения
                </Link>

            </div>
            <div className={styles.spacer}></div>

        </div>
    )
}
