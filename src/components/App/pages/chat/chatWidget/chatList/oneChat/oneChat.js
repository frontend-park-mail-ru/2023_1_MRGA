import styles from "./oneChat.module.css";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {Tinder, BackendProtocol, BackendHost, BackendPort} from "@/api/api";
import {getUser} from "@/store/user";
import { convertToDate } from "@/lib/jsx/utils";
import {WSChatAPI} from "@/api/ws_chat_api";

const MessageArea = ({msg}) => {
    switch (msg.messageType) {
    case "text", "":
        break;
    case "audio":
        msg.content = "Голосовое сообщение";
        break;
    default:
        msg.content = "Сообщение";
        break;
    }
    return (
        <div className={styles.messageArea}>{msg.content}</div>
    );
};

export const OneChat = ({onClick, chat, ref}) => {
    const readStatusRef = useRef();

    const avatar = useRef();
    const name = useRef();

    WSChatAPI.getReadStatus((readData) => {
        const chatId = readData.chatId;
        const senderId = readData.senderId;

        if (chat.chatId === chatId && readStatusRef.getValue().innerText === " •" && senderId !== chat.msg.senderId) {
            readStatusRef.getValue().innerText = "";
        }
    }, "4");

    const data = chat.msg.sentAt;
    const arr = chat.chatUserIds.filter((val) => {
        return val !== getUser().userId;
    });

    const setAvatarImg = async () => {
        const userInfo = await ((await Tinder.getInfoUserById(arr[0])).json());

        avatar.getValue().src = `${BackendProtocol}://${BackendHost}:${BackendPort}/api/auth/photo/${userInfo.body.photos[0]}`;
        name.getValue().innerHTML = userInfo.body.name;
    };
    setAvatarImg();

    const readStatus = !chat.msg.readStatus ? " •": "";

    return (
        <div ref={ref} onClick={onClick.bind(null, chat)} id={chat.chatId} className={styles.oneChatContainer}>
            <div>
                <img className={styles.oneChatAvatar} ref={avatar}/>
            </div>
            <div className={styles.msgWrapper}>
                <b ref={name}></b>
                <MessageArea msg={chat.msg}/>
                <div className={styles.messageTime}>
                    {convertToDate(data)}
                    <b ref={readStatusRef} className={styles.readStatus}>{readStatus}</b>
                </div>
            </div>
        </div>
    );
};
