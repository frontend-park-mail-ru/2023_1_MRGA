import {Tinder, BackendProtocol, BackendHost, BackendPort} from "@/api/api";
import styles from './recommendProfile.module.css'

import ico from 'assets/favicon.ico';
import loading from 'assets/img/loading.png'
import like from 'assets/svg/like.svg';
import dislike from 'assets/svg/dislike.svg';
import prevPhotoArrow from 'assets/svg/prevPhotoArrow.svg';
import nextPhotoArrow from 'assets/svg/nextPhotoArrow.svg';
import locationPoint from 'assets/svg/locationPoint.svg';
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {render} from "@/lib/jsx/render";
import {modalDispatcher, ModalWindow} from "components/UI/modal/modal";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";


export const Recom = () => {
    const info = useRef();
    const nameAndAge = useRef();
    const city = useRef();
    const recDescription = useRef();
    const recHashtags = useRef();
    const education = useRef();
    const zodiac = useRef();
    const buttons = {
        nextPhotoButton: useRef(),
        prevPhotoButton: useRef(),
        likeButton: useRef(),
        passButton: useRef(),
        reportButton: useRef()
    }


    const currRecPhoto = useRef();
    const loadingPhoto = loading;
    let currentRecommendation = 0;
    let recommendations = [];

    const getRecommendations = async () => {
        try {
            const recs = await (await Tinder.getRecommendation()).json();
            if (recs.status === 200) {
                recommendations = recs.body.recommendations;
                return {recommendations: recs.body.recommendations};
            }
        } catch (e) {
            return {recommendations: [], error: e}
        }
    }
    const test = async () => {
        await getRecommendations();
        if (!recommendations || recommendations.length === 0) {
            info.getValue().innerHTML = "На данный момент для вас нет рекомендаций";
            hideButtons();
            return ;
        }
        setCurrentRecommendation();
    }
    const changePhoto = async (step) => {
        const currentRec = recommendations[currentRecommendation];
        currentRec.photoIndex+=step;
        if (currentRec.photoIndex > currentRec.photos.length - 1) {
            currentRec.photoIndex = 0;
        }
        if (currentRec.photoIndex < 0) {
            currentRec.photoIndex = currentRec.photos.length - 1;
        }
        loadRecommendationPhotos();
    }
    const getNextPhoto = changePhoto.bind(null, 1);
    const getPrevPhoto = changePhoto.bind(null, -1);

    const setCurrentRecommendation = () => {
        const currentRec = recommendations[currentRecommendation];

        nameAndAge.getValue().innerHTML = `${currentRec.name}, ${currentRec.age}`
        city.getValue().innerHTML = currentRec.city;
        recDescription.getValue().innerHTML = currentRec.description;
        const hashtags = currentRec.hashtags.map((hashtags) => {
            return <div className={styles.hashtag}>#{hashtags}</div>
        });
        render(recHashtags.getValue(), hashtags);
        education.getValue().innerHTML = `образование: ${currentRec.education}`;
        zodiac.getValue().innerHTML = `знак зодиака: ${currentRec.zodiac}`;
        currentRec.photoIndex = 0;
        loadRecommendationPhotos();
    }
    const hideButtons = () => {
        for (let button in buttons) {
            buttons[button].getValue().classList.add(styles.hidden);
        }
    }
    const clearRecommendations = () => {
        nameAndAge.getValue().innerHTML = '';
        city.getValue().innerHTML = '';
        recDescription.getValue().innerHTML = '';
        recHashtags.getValue().innerHTML = '';
        education.getValue().innerHTML = '';
        zodiac.getValue().innerHTML = '';
        currRecPhoto.getValue().src = loadingPhoto;
        info.getValue().innerHTML = "На данный момент для вас нет рекомендаций";
    }
    const next = () => {
        if (currentRecommendation > recommendations.length - 2) {
            clearRecommendations();
            hideButtons();
            return ;
        }
        currentRecommendation++;

        setCurrentRecommendation();
    }
    const reactionClick = (reaction) => {

        recHashtags.getValue().innerHTML = '';
        if (currentRecommendation <= recommendations.length - 1) {
            try {
                Tinder.postReaction({evaluatedUserId: recommendations[currentRecommendation].userId, reaction: reaction});
            } catch (e) {
                alert(e);
            }
        }
        next();
    }
    let currPhoto;
    const loadRecommendationPhotos = async () => {
        const currentRec = recommendations[currentRecommendation];
        currRecPhoto.getValue().src = `${BackendProtocol}://${BackendHost}:${BackendPort}/meetme/photo/${currentRec.photos[currentRec.photoIndex]}`;
    }
    const dispatcher = modalDispatcher();

    const reportUserClick = async (e) => {
        e.preventDefault();
        const res = await (await Tinder.complainUser({UserId: recommendations[currentRecommendation].userId   })).json();
        // Жалоба на пользователя
        next();
        dispatcher.hideModal();
    }
    test()
    return (
        <div className={styles.content}>
            <div className={styles.avatarSide}>
                <img ref={currRecPhoto} className={styles.avatar} src={loadingPhoto} alt=""/>
                <div className={styles.avatarShadow}>
                    <a ref={buttons.passButton} onClick={reactionClick.bind(null, "pass")} className={styles.swipeBtn} style="margin-right: 16px;">
                        <img src={dislike}/>
                    </a>

                    <a ref={buttons.likeButton} onClick={reactionClick.bind(null, "like")} className={styles.swipeBtn} >
                        <img src={like}/>
                    </a>
                </div>

                <div id="recPhotoDots" className={styles.photoDots}>
                </div>
                <a ref={buttons.prevPhotoButton} onClick={getPrevPhoto} style="
                        position: absolute;
                        left: 8px;
                        ">
                    <img src={prevPhotoArrow}/>

                </a>
                <a ref={buttons.nextPhotoButton} onClick={getNextPhoto} style="
                        position: absolute;
                        right: 8px;
                        ">
                    <img src={nextPhotoArrow}/>
                </a>
            </div>
            <div className={styles.descSide}>
                <div className={styles.desc}>
                    <div ref={nameAndAge} className={styles.name}></div>
                    <div className={styles.distance}>
                        <img src={locationPoint}/>
                        <span ref={city}></span>
                    </div>
                    <div className={styles.descField}>
                        <div ref={recDescription} className={styles.descText}>
                        </div>
                        <div className={styles.descText} ref={education}></div>
                        <div className={styles.descText} ref={zodiac} ></div>
                        <div ref={recHashtags} className={styles.descTags}>
                        </div>

                        <div id="recOtherInfo" className={styles.descOtherData}>
                            <img width={15} src={ico}/>
                            <div ref={info}></div>
                            <ModalWindow dispatcher={dispatcher}>
                                <SubmitButton onClick={reportUserClick}>Пожаловаться на пользователя?</SubmitButton>
                            </ModalWindow>
                            <div ref={buttons.reportButton} onClick={dispatcher.showModal} className={styles.reportButton}>пожаловаться</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}