import styles from './chatList.module.css'
import {OneChat} from "components/App/pages/chat/chatWidget/chatList/oneChat/oneChat";

export const ChatList = () => {

    const chatList = [
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
    return (
        <div className={styles.chatListContainer}>
            {chatList.map((chat) => {
                return (
                    <OneChat chat={chat}/>
                )
            })}
        </div>
    )

}