import styles from './sideBar.module.css'
import {User} from "@/store/user";
import {Tinder} from "@/api/api";
import {loading} from "@/assets/img/loading.png";


export const SideBar = () => {
    const loadingPhoto = "../../../assets/img/loading.png";

    const setPhoto = (id, file) => {
        const imageUrl = URL.createObjectURL(file);
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
            setPhoto("profileImg", file);
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
        setNameAge("profileName", bodyUserInfo.name, bodyUserInfo.Age);
        setProfilePhoto(bodyUserInfo.photos[0].PhotoId);

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
