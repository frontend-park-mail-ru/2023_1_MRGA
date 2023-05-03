import {Tinder} from "@/api/api";
import styles from "./chatWidget.module.css"
import {ChatList} from "components/App/pages/chat/chatWidget/chatList/chatList";
import {MessageList} from "components/App/pages/chat/chatWidget/messageList/messageList";


const messageDispatcher = () => {

    let listeners = [];

    const subscribe = (listener) => {
        listeners.push(listener);
    }
    const dispatch = (messageID) => {
        listeners.forEach((listener) => {
            listener(messageID);
        })
    }

    return {subscribe, dispatch};
}

export const ChatWidget = () => {
    const msgDispatcher = messageDispatcher();
        //const chats = await ((await Tinder.getChats()).json());

    return (
        <div className={styles.chatWidgetContainer}>
            <ChatList messageDispatcher={msgDispatcher} />
            <MessageList messageDispatcher={msgDispatcher} chatId={2}/>
        </div>
    )
}