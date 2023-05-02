import {Tinder} from "@/api/api";
import styles from "./chatWidget.module.css"
import {ChatList} from "components/App/pages/chat/chatWidget/chatList/chatList";
import {MessageList} from "components/App/pages/chat/chatWidget/messageList/messageList";

export const ChatWidget = () => {

    const setChats = async () => {
        const chats = await ((await Tinder.getChats()).json());
        console.log(chats);
    }
    setChats();
    return (
        <div className={styles.chatWidgetContainer}>
            <ChatList/>
            <MessageList/>
        </div>
    )
}