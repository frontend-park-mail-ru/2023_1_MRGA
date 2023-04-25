import styles from './sideBar.module.css'
import {User} from "@/store/user";
import {Tinder} from "@/api/api";
import {loading} from "@/assets/img/loading.png";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";

export const SideBar = () => {
    const loadingPhoto = "../../../assets/img/loading.png";

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

    const setHandlers = () => {
        document.querySelector("#homeButton").addEventListener("click", (event) => {
            event.preventDefault();

            Navigate({to:'/'});
        });

        document.querySelector("#matchesButton").addEventListener("click", (event) => {
            event.preventDefault();

            Navigate({to:'/matches'});
        });

        document.querySelector("#profileButton").addEventListener("click", (event) => {
            event.preventDefault();

            Navigate({to:'/'});
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

        setHandlers();
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
                <a id="homeButton" className={styles.btn}>
                    <img className={styles.icon} src="../../../assets/svg/home.svg"/>
                    Знакомства
                </a>

                <a id="matchesButton" className={styles.btn}>
                    <img className={styles.icon} src="../../../assets/svg/matches.svg"/>
                    Совпадения
                </a>
                <a id="profileButton" className={styles.btn}>
                    <img className={styles.icon} src="../../../assets/svg/profile.svg"/>
                    Профиль
                </a>

            </div>
            <div className={styles.spacer}></div>

        </div>
    )
}
