import styles from './matchesList.module.css'
import {Tinder} from "@/api/api";

import loadingPhoto from 'assets/img/loading.png'
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {render} from "@/lib/jsx/render";
import {create} from "@/lib/jsx";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {getUser} from "@/store/user";
import { Navigate } from '../../../lib/jsx/components/navigate/navigate';


const MatchNewChat = ({match}) => {
    const avatarRef = useRef();

    const firstMessageRef = useRef();
    const setAvatar = async () => {
        const url = URL.createObjectURL((await ((await (Tinder.getPhoto(match.avatar))).formData())).get('file'));
        avatarRef.getValue().src = url;
    }

    const onFirstMessageSend = async (e) => {
        e.preventDefault();
        // console.log(firstMessageRef.getValue().value);
        const currentUser = getUser();
        // console.log(currentUser);
        const response = await (await Tinder.createChat({userIds: [match.userId]})).json();
        const newChatID = response.body.chatId;
        const rspnse = await (await Tinder.sendMessage(newChatID, {content: firstMessageRef.getValue().value})).json();
        // await Tinder.deleteMatch(match.userId);
        Navigate({to: "/chat"});
    }

    setAvatar();
    return (
        <div className={styles.matchNewChatContainer}>
            <div className={styles.matchNewChatUser}>
                <img className={styles.matchNewChatUserAvatar} ref={avatarRef}/>
                <span>{match.name}</span>
            </div>
            <span className={styles.firstMessageInput}>
                <InputWithLabel ref={firstMessageRef} labelText="Напишите первое сообщение" type={"text"}/>
                <SubmitButton onClick={onFirstMessageSend}>отправить первое сообщение</SubmitButton>
            </span>
        </div>
    )
}

export const MatchesList = ({refToChatArea}) => {

    const info = useRef();
    let matches = []; // []match
    const onPhotoError = (e) => {
        e.target.src = loadingPhoto;
    }
    const onMatchClick = (match) => {

        const newDom = create(<MatchNewChat match={match}/>);
        refToChatArea.getValue().replaceWith(newDom);
        refToChatArea.setValue(newDom);
    }
    const formedMathes = async () => {
        try {
            const matchesJson = await ((await Tinder.getMatches()).json());
            if (matchesJson.status !== 200) {
                info.getValue().innerHTML = 'не удалось загрузить данные';
                return ;
            }
            matches = matchesJson.body?.matches ?? [];
            console.log(matches);
            const container = info.getValue();
            if (matches.length === 0) {
                info.getValue().innerHTML = "Пока не встретилось взаимной симпатии";
            }
            const domMatches = matches.map((match, index) => {
                let imgStyle = [styles.matchImgStyle];
                if (match.shown === false) {
                    imgStyle.push(styles.notSeen);
                }
                matches[index].ref = useRef();
                return (
                    <div onClick={onMatchClick.bind(null, match)} className={styles.matchContainer}>
                        <img onError={onPhotoError} ref={matches[index].ref} className={imgStyle.join(' ')}/>
                        <p className={styles.matchName}>{match.name}</p>
                    </div>
                )
            })
            render(container, domMatches);
            for (let {ref, avatar} of matches) {
                ref.getValue().src = URL.createObjectURL((await ((await Tinder.getPhoto(avatar)).formData())).get('file'));
            }
        } catch (e) {
            alert(e);
        }

    }
    formedMathes();

    return (

        <div className={styles.peopleSide}>
            <div ref={info} className={styles.people}>
            </div>
        </div>
    )
}