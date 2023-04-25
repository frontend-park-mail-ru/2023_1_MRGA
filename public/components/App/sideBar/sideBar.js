import styles from './sideBar.module.css'
import {User} from "@/store/user";
import {Tinder} from "@/api/api";
import loading from "@/assets/img/loading.png";
import {Link} from "@/lib/jsx/components/link/link";

import home from 'assets/svg/home.svg'
import matches from 'assets/svg/matches.svg'
import profile from 'assets/svg/profile.svg'

export const SideBar = () => {
    const loadingPhoto = loading;

    const setPhoto = (id, imageUrl) => {
        const img = document.querySelector(`#${id}`);
        img.src = imageUrl;
    };

    const setNameAge = (id, name, age) => {
        document.querySelector(`#${id}`).innerText = `${name}, ${age}`;
    }

    const setProfilePhoto = (photoId) => {
        Tinder.getPhoto(photoId)
        .then(response => {
            if (response.status !== 200) {
                console.log(response.statusText);
            }
            return response.formData();
        }).then((formData) => {
            const fileField = formData.get('file');
            const file = new File([fileField], 'filename');

            const imageUrl = URL.createObjectURL(file);
            setPhoto("profileImg", imageUrl);
        });
    }


    const makePage = async () => {
        let respUserInfo = await Tinder.getUser();
        let jsonUserInfo = await respUserInfo.json();
        console.log(jsonUserInfo);
        if (jsonUserInfo.status !== 200) {
            console.log(jsonUserInfo.error);
            return;
        }

        let bodyUserInfo = jsonUserInfo.body;
        setNameAge("profileName", bodyUserInfo.name, bodyUserInfo.age);
        setProfilePhoto(bodyUserInfo.avatarId);
    }
    makePage();

    return (
        <div className={styles.sideBar}>
            <div className={styles.profileInfo}>
                <img id="profileImg" className={styles.avatar} src={loadingPhoto} alt=""/>
                    <div id="profileName" className={styles.name}>
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
                <Link href={"/"} id="profileButton" className={styles.btn}>
                    <img className={styles.icon} src={profile}/>
                    Профиль
                </Link>

            </div>
            <div className={styles.spacer}></div>

        </div>
    )
}
