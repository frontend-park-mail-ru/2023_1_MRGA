import styles from './sideBar.module.css'
import {User} from "@/store/user";
import {Tinder} from "@/api/api";
import loading from "@/assets/img/loading.png";
import {Link} from "@/lib/jsx/components/link/link";

import home from 'assets/svg/home.svg'
import matches from 'assets/svg/matches.svg'
import profile from 'assets/svg/profile.svg'
import {useRef} from "@/lib/jsx/hooks/useRef";

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
            console.log(jsonUserInfo.error);
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
                <img ref={profilePhoto} id="profileImg" onError={onPhotoError} className={styles.avatar} src={loadingPhoto} alt=""/>
                    <div ref={nameAndAge} id="profileName" className={styles.name}>
                    </div>
            </div>
            <div className={styles.spacer}></div>

            <div className={styles.buttons}>
                <Link href={"/"} id="homeButton" className={styles.btn}>
                    <img className={styles.icon} src={home}/>
                    Знакомства
                </Link>

                <Link href={"/matches"} id="matchesButton" className={styles.btn}>
                    <img className={styles.icon} src={matches}/>
                    Совпадения
                </Link>
                <Link href={"/profile"} id="profileButton" className={styles.btn}>
                    <img className={styles.icon} src={profile}/>
                    Профиль
                </Link>

            </div>
            <div className={styles.spacer}></div>

        </div>
    )
}
