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
        //const chats = await ((await Tinder.getChats()).json());

    return (
        <div className={styles.chatWidgetContainer}>
            <ChatList messageDispatcher={msgDispatcher} />
            <MessageList ws={ws} messageDispatcher={msgDispatcher}/>
        </div>
    )
}