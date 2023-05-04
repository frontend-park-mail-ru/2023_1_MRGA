import styles from './oneChat.module.css'
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {Tinder} from "@/api/api";
import {getUser} from "@/store/user";
import { convertToDate } from '../../../../../../../lib/jsx/utils';

export const ChatUser = ({userID, className, ...props}) => {
    const avatar = useRef();
    const name = useRef();

    const setAvatarImg = async () => {
        const userInfo = await ((await Tinder.getInfoUserById(userID)).json());

        avatar.getValue().src = URL.createObjectURL((await ((await Tinder.getPhoto(userInfo.body.photos[0])).formData())).get('file'));
        name.getValue().innerHTML = userInfo.body.name;
    }
    setAvatarImg();
    return (
        <div className={[styles.oneChatUser, className].join(' ')}>
            <img className={styles.oneChatAvatar} ref={avatar} {...props}/>
            <div ref={name}></div>
        </div>
    )
}

const MessageArea = ({msg}) => {
    const componentStyle = [styles.messageArea];

    // if (msg.readStatus === false) {
    //     componentStyle.push(styles.unreadMessage);
    // }
    return (
        <div className={componentStyle.join(' ')}>{msg.content}</div>
    )
}

export const OneChat = ({onClick, chat},) => {
    const data = chat.msg.sentAt;
    const arr = chat.chatUserIds.filter((val) => {
        return val !== getUser().userId;
    })
    const readStatus = !chat.msg.readStatus ? ' •': '';
    return (
        <div onClick={onClick.bind(null, chat)} id={chat.chatId} className={styles.oneChatContainer}>
            <ChatUser userID={arr[0]}/>
            <MessageArea msg={chat.msg}/>
            <div className={styles.messageTime}>
                {convertToDate(data)}
                <b className={styles.readStatus}>{readStatus}</b>
            </div>
        </div>
    )
}