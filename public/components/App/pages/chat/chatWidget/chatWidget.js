import {Tinder} from "@/api/api";
import styles from "./chatWidget.module.css"
import {ChatList} from "components/App/pages/chat/chatWidget/chatList/chatList";
import {MessageList} from "components/App/pages/chat/chatWidget/messageList/messageList";

export const ChatWidget = () => {

    const setChats = async () => {
        //const chats = await ((await Tinder.getChats()).json());
        const chats = {
            chatList: [
                {
                    chatId: 1,
                    msg: {
                        content: "Я пишу тебе письмо",
                        readStatus: false,
                        senderId: 1,
                        sentAt: "05:41 01.25.2023"
                    }
                },
                {
                    chatId: 2,
                    msg: {
                        content: "Ты прочитала это письмо",
                        readStatus: true,
                        senderId: 2,
                        sentAt: "05:41 01.25.2023"
                    }
                }
            ]
        }
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