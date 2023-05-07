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

export const ChatWidget = ({ws, ...props}) => {
    const msgDispatcher = messageDispatcher();

    return (
        <div className={styles.chatWidgetContainer}>
            <ChatList ws={ws} messageDispatcher={msgDispatcher} />
            <MessageList ws={ws} messageDispatcher={msgDispatcher} />
        </div>
    )
}