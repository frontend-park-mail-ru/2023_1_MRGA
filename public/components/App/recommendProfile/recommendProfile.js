import {User} from "@/store/user";
import {Tinder} from "@/api/api";
import styles from './recommendProfile.module.css'


export const RecommendProfile = () => {
    const loadingPhoto = "../../../assets/img/loading.png";

    let recommendations = []; // []reccomendation
    let countRecommendations = 0; // int

    let currRecommendation; // reccomendation
    let currIndexRecommendation = 0; // int
    let currIndexPhoto = 0; // int
    let currLengthPhotos = 0; // int
    let currPhotosUrls = []; // []urls

    const mainUrlPhotoDot = "../../../assets/svg/pressPhotoDot.svg";
    const urlPhotoDot = "../../../assets/svg/photoDot.svg";

    // Устанавливается фото в img по id
    const setPhoto = (id, imageUrl) => {
        const img = document.querySelector(`#${id}`);
        img.src = imageUrl;
    };

    // Устанавливается текст в тег по id
    const setInnerText = (id, text) => {
        document.querySelector(`#${id}`).innerText = text;
    }

    // Устанавливаются обработчики на кнопки у фотографий
    const setHandlers = () => {
        const images = document.querySelectorAll('img');
        images.forEach(image => {
            image.addEventListener('error', function() {
                image.src = loadingPhoto;
            });
        });
        
        const prevPhotoButton = document.getElementById("prevPhotoButton");
        const nextPhotoButton = document.getElementById("nextPhotoButton");
        const passButton = document.getElementById("passButton");
        const likeButton = document.getElementById("likeButton");

        prevPhotoButton.addEventListener("click", (event) => {
            event.preventDefault();

            if (currIndexPhoto === 0) {
                currIndexPhoto = currLengthPhotos - 1;
            } else {
                currIndexPhoto = currIndexPhoto - 1;
            }
            setPhotoCurrentRecommendation();
        });

        nextPhotoButton.addEventListener("click", (event) => {
            event.preventDefault();

            if (currIndexPhoto === currLengthPhotos - 1) {
                currIndexPhoto = 0;
            } else {
                currIndexPhoto = currIndexPhoto + 1;
            }
            setPhotoCurrentRecommendation();
        });

        passButton.addEventListener("click", (event) => {
            event.preventDefault();
            Tinder.postReaction({evaluatedUserId: currRecommendation.userId, reaction: "pass"})
            nextProfile();
        });

        likeButton.addEventListener("click", (event) => {
            event.preventDefault();
            Tinder.postReaction({evaluatedUserId: currRecommendation.userId, reaction: "like"})         
            nextProfile();
        });
    }

    const nextProfile = () => {
        if (currIndexRecommendation === countRecommendations - 1) {
            makePage();
        } else {
            currIndexRecommendation = currIndexRecommendation + 1;
            setRecProfile();
        }
    }

    const setPhotoCurrentRecommendation = () => {

        setPhoto("recPhoto", currPhotosUrls[currIndexPhoto]);

        // Устанавливаются точки над фотографиями профиля рекомендации
        const photoDots = document.querySelector("#recPhotoDots");
        photoDots.innerHTML = ""
        for (let i = 0; i < currLengthPhotos; i++) {
            let photoDot = document.createElement("object");
            if (i === currIndexPhoto) {
                photoDot.data = mainUrlPhotoDot;
            } else {
                photoDot.data = urlPhotoDot;
            }
            photoDots.appendChild(photoDot);
        }
    }

    // Ассинхронно устанавливается аватарка профиля из рекомендации и получаются url всех фотографий данного профиля
    const setRecProfileAsync = async () => {
        // Устанавливается данные о текущем пользователе в рекомендации
        currRecommendation = recommendations[currIndexRecommendation];
        if (currRecommendation.photos === null) {
            currRecommendation.photos = [];
        }
        currLengthPhotos = currRecommendation.photos.length;
        currIndexPhoto = 0;
        currPhotosUrls = [];

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

                const imageUrl = URL.createObjectURL(file);
                currPhotosUrls.push(imageUrl);
                if (ind === currIndexPhoto) {
                    setPhotoCurrentRecommendation();
                }
            });
        });

        // Устанавливается имя и возраст профиля рекомендации
        setInnerText("recNameAge", `${currRecommendation.name}, ${currRecommendation.age}`);
        // Устанавливается город профиля рекомендации
        setInnerText("recCity", currRecommendation.city);
        // Устанавливается описание профиля рекомендации
        setInnerText("recDescription", currRecommendation.description);
        
        // Устанавливаются хэш-теги профиля рекомендации
        const divHashtags = document.querySelector("#recHashtags");
        divHashtags.innerHTML = '';
        currRecommendation.hashtags.forEach((hashtag) => {
            let divHashtag = document.createElement("div");
            divHashtag.classList.add("tag");
            divHashtag.innerText = hashtag;

            divHashtags.appendChild(divHashtag);
        });
        
        // Устанавливается работа профиля рекомендации
        setInnerText("recJob", currRecommendation.job);
        // Устанавливается зодиак профиля рекомендации
        setInnerText("recZodiac", currRecommendation.zodiac);
        // Устанавливается образование профиля рекомендации
        setInnerText("recEducation", currRecommendation.education);
    }

    // Запускается установка вида профиля рекомендации
    const setRecProfile = () => {
        setRecProfileAsync().then(() => {
        });
    }

    // Запускается отрисовка страницы рекомендации
    const makePage = async () => {

        // Делается запрос на рекомендации
        let respRecs = await Tinder.getRecommendation();
        let jsonRecs = await respRecs.json();
        console.log(jsonRecs);
        if (jsonRecs.status !== 200) {
            console.log(jsonRecs.error);
            return;
        }
        
        recommendations = jsonRecs.body.recommendations;

        // Устанавливается, сколько всего профилей получилось в рекомендациях
        if (recommendations === null) {
            recommendations = [];
        }
        countRecommendations = recommendations.length;
        if (countRecommendations === 0) {
            console.log("Пока не нашлось пользователей под ваши вкусы");
            return;
        }

        // Вызывается отображение всего о пользователе в рекомендации
        currIndexRecommendation = 0;
        setRecProfile();
    }

    const initPage = () => {
        // Запускается отрисовка всех страницы рекомендации
        makePage()
        .then(() => setHandlers()); // Регистрируются обработчики
    }

    initPage();

    return(
        <div className={styles.content}>
            <div className={styles.avatarSide}>
                <img id="recPhoto" className={styles.avatar} src={loadingPhoto} alt=""/>
                    <div className={styles.avatarShadow}>
                        <a id="passButton" className={styles.swipeBtn} style="margin-right: 16px;">
                            <img id="passObject" src="../../../assets/svg/dislike.svg"/>
                        </a>

                        <a id="likeButton" className={styles.swipeBtn} >
                            <img id="likeObject" src="../../../assets/svg/like.svg"/>
                        </a>
                    </div>

                    <div id="recPhotoDots" className={styles.photoDots}>
                    </div>


                    <a id="prevPhotoButton" style="
                        position: absolute;
                        left: 8px;
                        ">
                        <img id="prevPhotoObject" src="../../../assets/svg/prevPhotoArrow.svg"/>

                    </a>

                    <a id="nextPhotoButton" href="#" style="
                        position: absolute;
                        right: 8px;
                        ">
                        <img id="nextPhotoObject" src="../../../assets/svg/nextPhotoArrow.svg"/>
                    </a>
            </div>
            <div className={styles.descSide}>
                <div className={styles.desc}>
                    <div id="recNameAge" className={styles.name}></div>
                    <div className={styles.distance}>
                        <img src="../../../assets/svg/locationPoint.svg"/>
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