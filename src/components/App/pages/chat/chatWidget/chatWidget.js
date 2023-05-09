import {Tinder} from "@/api/api";
import styles from "./chatWidget.module.css"
import {ChatList} from "components/App/pages/chat/chatWidget/chatList/chatList";
import {MessageList} from "components/App/pages/chat/chatWidget/messageList/messageList";


const messageDispatcher = () => {

    let listeners = [];

    const subscribe = (listener) => {
        listeners.push(listener);
    }
    const dispatch = (chatID) => {
        listeners.forEach((listener) => {
            listener(chatID);
        })
    }

    return {subscribe, dispatch};
}

export const ChatWidget = ({...props}) => {
    const msgDispatcher = messageDispatcher();

    return (
        <div className={styles.chatWidgetContainer}>
            <ChatList messageDispatcher={msgDispatcher} />
            <MessageList messageDispatcher={msgDispatcher} />
        </div>
    )
}