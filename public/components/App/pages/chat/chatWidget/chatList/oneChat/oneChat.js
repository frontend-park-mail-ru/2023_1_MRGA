import styles from './oneChat.module.css'
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {Tinder} from "@/api/api";


const ChatAvatarImg = ({userID, ...props}) => {
    const avatar = useRef();

    const setAvatarImg = async () => {
        const userInfo = await ((await Tinder.getInfoUserById(userID)).json());

        avatar.getValue().src = URL.createObjectURL((await ((await Tinder.getPhoto(userInfo.body.photos[0])).formData())).get('file'));
        // console.log(photo);
    }
    setAvatarImg();
    return (
        <img className={styles.oneChatAvatar} ref={avatar} {...props}/>
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
    console.log(data);
    return (
        <div id={chat.chatId} className={styles.oneChatContainer}>
            <ChatAvatarImg userID={chat.msg.senderId}/>
            <MessageArea msg={chat.msg}/>
            <div>{data.getHours()}: {data.getMinutes()}</div>
        </div>
    )
}