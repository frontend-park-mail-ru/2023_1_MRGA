import styles from "./matchesList.module.css";
import {Tinder, BackendProtocol, BackendHost, BackendPort} from "@/api/api";
import loadingPhoto from "assets/img/loading.png";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {render} from "@/lib/jsx/render";
import {create} from "@/lib/jsx";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {getUser} from "@/store/user";
import { Navigate } from "../../../lib/jsx/components/navigate/navigate";
import matchIconImg from "assets/img/match.png";
import backgroundPremiumImg from "assets/img/background.png";
import heartIcon from "assets/img/heart.png";
import { getLikesString } from "@/lib/jsx/utils";
import {modalDispatcher, ModalWindow} from "components/UI/modal/modal";

const MatchNewChat = ({match}) => {
    const firstMessageRef = useRef();

    const onFirstMessageSend = async (e) => {
        e.preventDefault();
        const currentUser = getUser();
        const response = await (await Tinder.createChat({userIds: [match.userId]})).json();
        const newChatID = response.body.chatId;
        const rspnse = await (await Tinder.sendMessage(newChatID, {content: firstMessageRef.getValue().value, userIds: [match.userId]})).json();
        await Tinder.deleteMatch(match.userId);
        Navigate({to: "/chat"});
    };

    return (
        <div className={styles.matchNewChatContainer}>
            <div className={styles.matchNewChatUser}>
                <img className={styles.matchNewChatUserAvatar} src={`${BackendProtocol}://${BackendHost}:${BackendPort}/api/auth/photo/${match.avatar}`}/>
                <span>{match.name}</span>
            </div>
            <span className={styles.firstMessageInput}>
                <InputWithLabel ref={firstMessageRef} labelText="Напишите первое сообщение" type={"text"}/>
                <SubmitButton onClick={onFirstMessageSend}>Отправить первое сообщение</SubmitButton>
            </span>
        </div>
    );
};

export const MatchesList = ({refToChatArea, matchText, matchIcon, hasBeenRedirected}) => {
    const notPremiumModalDispatcher = modalDispatcher();

    const info = useRef();
    let matches = [];

    const onPhotoError = (e) => {
        e.target.src = loadingPhoto;
    };

    const onMatchClick = (match) => {

        const newDom = create(<MatchNewChat match={match}/>);
        refToChatArea.getValue().replaceWith(newDom);
        refToChatArea.setValue(newDom);
    };

    const onLikesCount = (access, event) => {
        if (!access) {
            notPremiumModalDispatcher.showModal();
            return;
        }

        Navigate({to: "/likes"});
    };

    const formedMathes = async () => {
        try {
            const matchesJson = await ((await Tinder.getMatches()).json());
            if (matchesJson.status !== 200) {
                info.getValue().innerHTML = "Не удалось загрузить данные";
                return ;
            }
            matches = matchesJson.body?.matches ?? [];

            const container = info.getValue();
            if (matches.length === 0) {
                matchText.getValue().innerHTML = "Пока не встретилось взаимной симпатии";
                matchIcon.getValue().src = matchIconImg;
            }

            const likesCountJson = await ((await Tinder.getLikesCount()).json());
            if (likesCountJson.status !== 200) {
                info.getValue().innerHTML = "Не удалось загрузить некоторые данные";
                return ;
            }
            const accessLikesCount = likesCountJson.body.access;
            const likesCount = likesCountJson.body.count;

            const likesCountText = getLikesString(likesCount);

            const domLikesCount = (
                <div className={[styles.matchContainer].join(" ")}>
                    <div onClick={onLikesCount.bind(null, accessLikesCount)} className={styles.likesCountContainer}>
                        <img src={backgroundPremiumImg} className={`${styles.matchImgStyle} ${styles.goldSubscription}`}/>
                        <img src={heartIcon} className={styles.heartImage}/>
                        <p className={`${styles.matchName} ${styles.centeredText}`}>{likesCount}</p>
                    </div>
                    <p className={`${styles.matchName}`}>{likesCountText}</p>
                </div>
            );

            const domMatches = matches.map((match, index) => {
                const imgStyle = [styles.matchImgStyle];
                if (match.shown === false) {
                    imgStyle.push(styles.notSeen);
                }
                matches[index].ref = useRef();
                return (
                    <div onClick={onMatchClick.bind(null, match)} className={styles.matchContainer}>
                        <img onError={onPhotoError} ref={matches[index].ref} className={imgStyle.join(" ")}/>
                        <p className={styles.matchName}>{match.name}</p>
                    </div>
                );
            });
            render(container, domLikesCount);
            render(container, domMatches);
            for (const {ref, avatar} of matches) {
                ref.getValue().src = `${BackendProtocol}://${BackendHost}:${BackendPort}/api/auth/photo/${avatar}`;
            }

            if (hasBeenRedirected) {
                notPremiumModalDispatcher.showModal();
            }
        } catch (e) {
            console.log(e);
        }

    };
    formedMathes();

    return (
        <div className={styles.peopleSide}>
            <ModalWindow dispatcher={notPremiumModalDispatcher}>
                <div className={styles.likeText}>Хотите выбирать и сразу получать&nbsp;<b>пару</b>?<br/>
                    Оформите <span className={styles.premiumGold}>MeetMe Gold</span> и выбирайте сами!<br/>
                    Для приобретения подписки пишите в telegram нашему&nbsp;
                    <u><a href={"https://t.me/yakwilik"}>админу</a></u>
                </div>
            </ModalWindow>
            <div ref={info} className={styles.people}>
            </div>
        </div>
    );
};
