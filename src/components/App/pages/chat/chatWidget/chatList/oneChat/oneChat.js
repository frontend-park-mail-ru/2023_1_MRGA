import styles from './oneChat.module.css'
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {Tinder, BackendProtocol, BackendHost, BackendPort} from "@/api/api";
import {getUser} from "@/store/user";
import { convertToDate } from '@/lib/jsx/utils';

export const ChatUser = ({userID, className, ...props}) => {
    const avatar = useRef();
    const name = useRef();

    const setAvatarImg = async () => {
        const userInfo = await ((await Tinder.getInfoUserById(userID)).json());

        avatar.getValue().src = `${BackendProtocol}://${BackendHost}:${BackendPort}/meetme/photo/${userInfo.body.photos[0]}`;
        name.getValue().innerHTML = userInfo.body.name;
    }
    setAvatarImg();
    return (
        <div className={styles.oneChatUser}>
            <img className={styles.oneChatAvatar} ref={avatar} {...props}/>
            <div ref={name}></div>
        </div>
    )
}

const MessageArea = ({msg}) => {

    return (
        <div className={styles.messageArea}>{msg.content}</div>
    )
}

export const OneChat = ({onClick, chat, ref}) => {
    const data = chat.msg.sentAt;
    const arr = chat.chatUserIds.filter((val) => {
        return val !== getUser().userId;
    })
    const readStatus = !chat.msg.readStatus ? ' •': '';
    return (
        <div ref={ref} onClick={onClick.bind(null, chat)} id={chat.chatId} className={styles.oneChatContainer}>
            <ChatUser userID={arr[0]}/>
            <MessageArea msg={chat.msg}/>
            <div className={styles.messageTime}>
                {convertToDate(data)}
                <b className={styles.readStatus}>{readStatus}</b>
            </div>
        </div>
    )
}