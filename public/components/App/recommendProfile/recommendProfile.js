import {User} from "@/store/user";
import {Tinder} from "@/api/api";
import styles from './recommendProfile.module.css'

import ico from 'assets/favicon.ico';
import loading from 'assets/img/loading.png'

export const RecommendProfile = () => {
    const loadingPhoto = loading;

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

            if (currLengthPhotos <= 1) {
                return;
            }

            if (currIndexPhoto === 0) {
                currIndexPhoto = currLengthPhotos - 1;
            } else {
                currIndexPhoto = currIndexPhoto - 1;
            }
            setPhotoCurrentRecommendation();
        });

        nextPhotoButton.addEventListener("click", (event) => {
            event.preventDefault();

            if (currLengthPhotos <= 1) {
                return;
            }

            if (currIndexPhoto === currLengthPhotos - 1) {
                currIndexPhoto = 0;
            } else {
                currIndexPhoto = currIndexPhoto + 1;
            }
            setPhotoCurrentRecommendation();
        });

        passButton.addEventListener("click", (event) => {
            event.preventDefault();

            if (countRecommendations === 0) {
                return;
            }

            Tinder.postReaction({evaluatedUserId: currRecommendation.userId, reaction: "pass"}).then(() => nextProfile());
        });

        likeButton.addEventListener("click", (event) => {
            event.preventDefault();

            if (countRecommendations === 0) {
                return;
            }
            Tinder.postReaction({evaluatedUserId: currRecommendation.userId, reaction: "like"}).then(() => nextProfile());
        });
    }

    const nextProfile = () => {
        if (currIndexRecommendation === countRecommendations - 1) {
            makePage();
        } else {
            currIndexRecommendation = currIndexRecommendation + 1;
            setRecProfileAsync();
        }
    }

    const setPhotoCurrentRecommendation = () => {

        if (currLengthPhotos === 0) {
            setPhoto("recPhoto", loadingPhoto);
        } else {
            setPhoto("recPhoto", currPhotosUrls[currIndexPhoto]);
        }

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

        // Если нет рекоммендаций
        if (countRecommendations === 0) {
            clearRec();
            currLengthPhotos = 0;
            setPhotoCurrentRecommendation();
            console.log("Пока не нашлось пользователей под ваши вкусы");
            return;
        }

        // Устанавливается данные о текущем пользователе в рекомендации
        currRecommendation = recommendations[currIndexRecommendation];
        currIndexPhoto = 0;
        currPhotosUrls = [];
        // Если нет фоток
        if (currRecommendation.photos === null || currRecommendation.photos.length === 0) {
            currRecommendation.photos = [];
            currLengthPhotos = 0;
            setPhotoCurrentRecommendation();
        } else {
            currLengthPhotos = currRecommendation.photos.length;
        }

        currRecommendation.photos.forEach((photoId, ind) => { // Работаем с фото только если они есть
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

        clearRec();
        // Устанавливается имя и возраст профиля рекомендации
        setInnerText("recNameAge", `${currRecommendation.name}, ${currRecommendation.age}`);
        // Устанавливается город профиля рекомендации
        setInnerText("recCity", currRecommendation.city);
        // Устанавливается описание профиля рекомендации
        setInnerText("recDescription", currRecommendation.description);
        
        const divHashtags = document.querySelector("#recHashtags");
        // Устанавливаются хэш-теги профиля рекомендации
        currRecommendation.hashtags.forEach((hashtag) => {
            let divHashtag = document.createElement("div");
            divHashtag.classList.add("tag");
            divHashtag.innerText = hashtag;

            divHashtags.appendChild(divHashtag);
        });
        
        // Устанавливаются другие данные профиля рекомендации
        const otherRecInfo = [
            {
                id: "recJob",
                innerText: currRecommendation.job,
            },
            {
                id: "recZodiac",
                innerText: currRecommendation.zodiac,
            },
            {
                id: "recEducation",
                innerText: currRecommendation.education,
            },
        ];

        const divOther = document.querySelector("#recOtherInfo");
        otherRecInfo.forEach((item) => {
            let divRec = document.createElement("div");
            divRec.classList.add("tag");
            divRec.id = item.id;
            divRec.innerText = item.innerText;
            
            divOther.appendChild(divRec);
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
        currIndexRecommendation = 0;
        // Вызывается отображение всего о пользователе в рекомендации
        setRecProfileAsync();
    }

    const clearRec = () => {
        const divHashtags = document.querySelector("#recHashtags");
        divHashtags.innerHTML = '';

        const divOther = document.querySelector("#recOtherInfo");
        divOther.innerHTML = '';

        setInnerText("recNameAge", '');
        setInnerText("recCity", '');
        setInnerText("recDescription", '');
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

                    <a id="nextPhotoButton" style="
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

                        <div id="recOtherInfo" className={styles.descOtherData}>
                            {/* <div id="recJob" className={styles.tag}></div>
                            <div id="recZodiac" className={styles.tag}></div>
                            <div id="recEducation" className={styles.tag}></div> */}
                            <img src={ico}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}