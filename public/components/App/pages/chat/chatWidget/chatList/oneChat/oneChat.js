import styles from './oneChat.module.css'
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {Tinder} from "@/api/api";


const ChatUser = ({userID, ...props}) => {
    const avatar = useRef();
    const name = useRef();

    const setAvatarImg = async () => {
        // const userInfo = await ((await Tinder.getInfoUserById(userID)).json());

        // avatar.getValue().src = URL.createObjectURL((await ((await Tinder.getPhoto(userInfo.body.photos[0])).formData())).get('file'));
        // name.getValue().innerHTML = userInfo.body.name;
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
    const componentStyle = [styles.messageArea];

    if (msg.readStatus === false) {
        componentStyle.push(styles.unreadMessage);
    }
    return (
        <div className={componentStyle.join(' ')}>{msg.content}</div>
    )
}

export const OneChat = ({chat},) => {
    const data = new Date(chat.msg.sentAt);
    return (
        <div id={chat.chatId} className={styles.oneChatContainer}>
            <ChatUser userID={chat.msg.senderId}/>
            <MessageArea msg={chat.msg}/>
            <div className={styles.messageTime}>{data.getHours()}:{data.getMinutes()}</div>
        </div>
    )
}