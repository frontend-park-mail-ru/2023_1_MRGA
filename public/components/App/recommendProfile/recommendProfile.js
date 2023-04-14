import {User} from "@/store/user";
import {Tinder} from "@/api/api";
import styles from './recommendProfile.module.css'


export const RecommendProfile = () => {
    const loadingPhoto = "../../../assets/img/loading.png";

    let recommendations = []; // []reccomendation
    let countRecommendations = 0; // int

    let currRecommendation; // reccomendation
    let currPhotosUrls = []; // []urls
    let currIndexPhoto = 0; // int

    let nextRecommendedUser; // reccomendation
    let nextPhotos; // []urls

    const mainUrlPhotoDot = "../../../assets/svg/pressPhotoDot.svg";
    const urlPhotoDot = "../../../assets/svg/photoDot.svg";

    const setPhoto = (id, file) => {
        const imageUrl = URL.createObjectURL(file);
        const img = document.querySelector(`#${id}`);
        img.src = imageUrl;
    };

    const setInnerText = (id, text) => {
        document.querySelector(`#${id}`).innerText = text;
    }

    const setRecProfileAsync = async () => {
        currRecommendation.photos.forEach((photoId, ind) => {
            Tinder.getPhoto(photoId)
            .then(response => {
                if (response.status !== 200) {
                    console.log(response.statusText);
                }
                return response.formData();
            })
            .then((formData) => {
                const fileField = formData.get('file');
                const file = new File([fileField], 'filename');
                setPhoto("profileImg", file);
                const imageUrl = URL.createObjectURL(file);
                currPhotosUrls.push(imageUrl);
                if (ind === 0) {
                    currIndexPhoto = 0;
                    document.querySelector("#recPhoto").src = imageUrl;
                }
            });
        });

        setInnerText("recNameAge", `${currRecommendation.name}, ${currRecommendation.age}`);
        setInnerText("recCity", currRecommendation.city);
        setInnerText("recDescription", currRecommendation.description);
        
        const divHashtags = document.querySelector("#recHashtags");
        currRecommendation.hashtags.forEach((hashtag) => {
            let divHashtag = document.createElement("div");
            divHashtag.classList.add("tag");
            divHashtag.innerText = hashtag;

            divHashtags.appendChild(divHashtag);
        });
        
        setInnerText("recJob", currRecommendation.job);
        setInnerText("recZodiac", currRecommendation.zodiac);
        setInnerText("recEducation", currRecommendation.education);

        const photoDots = document.querySelector("#recPhotoDots");
        for (let i = 0; i < currRecommendation.photos.length; i++) {
            let photoDot = document.createElement("object");
            if (i === 0) {
                photoDot.data = mainUrlPhotoDot;
            } else {
                photoDot.data = urlPhotoDot;
            }
            photoDots.appendChild(photoDot);
        }
    }

    const setRecProfile = () => {
        setRecProfileAsync().then();
    }

    const makePage = async () => {

        let respRecs = await Tinder.getRecommendation();
        let jsonRecs = await respRecs.json();
        console.log(jsonRecs);
        if (jsonRecs.status !== 200) {
            console.log(jsonRecs.error);
            return;
        }
        
        recommendations = jsonRecs.body.recommendations;
        countRecommendations = recommendations.length;
        if (countRecommendations === 0) {
            console.log("Пока не нашлось пользователей под ваши вкусы");
            return;
        }
        currRecommendation = recommendations[0];
        setRecProfile();
    }
    makePage();

    return(
        <div className={styles.content}>
            <div className={styles.avatarSide}>
                <img id="recPhoto" className={styles.avatar} src={loadingPhoto} alt=""/>
                    <div className={styles.avatarShadow}>
                        <a className={styles.swipeBtn} href="#" style="margin-right: 16px;">
                            <object data="../../../assets/svg/dislike.svg"></object>
                        </a>

                        <a className={styles.swipeBtn} href="#">
                            <object data="../../../assets/svg/like.svg"></object>
                        </a>
                    </div>

                    <div id="recPhotoDots" className={styles.photoDots}>
                    </div>


                    <a href="#" style="
                        position: absolute;
                        left: 8px;
                        ">
                        <object data="../../../assets/svg/prevPhotoArrow.svg"></object>

                    </a>

                    <a href="#" style="
                        position: absolute;
                        right: 8px;
                        ">
                        <object data="../../../assets/svg/nextPhotoArrow.svg"></object>
                    </a>
            </div>
            <div className={styles.descSide}>
                <div className={styles.desc}>
                    <div id="recNameAge" className={styles.name}></div>
                    <div className={styles.distance}>
                        <object data="../../../assets/svg/locationPoint.svg"></object>
                        <span id="recCity"></span>
                    </div>
                    <div className={styles.descField}>
                        <div id="recDescription" className={styles.descText}>
                        </div>

                        <div id="recHashtags" className={styles.descTags}>
                        </div>

                        <div className={styles.descOtherData}>
                            <div id="recJob" className={styles.tag}></div>
                            <div id="recZodiac" className={styles.tag}></div>
                            <div id="recEducation" className={styles.tag}></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}