import {Tinder} from "@/api/api";
import styles from "components/App/pages/chat/chatWidget/messageList/messageList.module.css";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {OneMsg} from "components/App/pages/chat/chatWidget/messageList/messageArea/oneMsg/oneMsg";
import {MessageArea} from "components/App/pages/chat/chatWidget/messageList/messageArea/messageArea";


export const MessageList = () => {
    const setMessages = async () => {
        const messages = await ((await Tinder.getMessages(2)).json());
        // const messages = {
        //     chat: [
        //         {
        //             msgId: 1,
        //             msg: {
        //                 senderId: 1,
        //                 content: "hi",
        //                 sentAt: "05:41 01.25.2023",
        //                 readStatus: false,
        //             }
        //         },
        //         {
        //             msgId: 2,
        //             msg: {
        //                 senderId: 2,
        //                 content: "hi",
        //                 sentAt: "05:42 01.25.2023",
        //                 readStatus: false,
        //             }
        //         },
        //         {
        //             msgId: 3,
        //             msg: {
        //                 senderId: 1,
        //                 content: "hi",
        //                 sentAt: "05:43 01.25.2023",
        //                 readStatus: false,
        //             }
        //         }
        //
        //     ]
        // }
        console.log(messages);
    }
    setMessages();
    // const messages = {
    //     chat: [
    //         {
    //             msgId: 1,
    //             msg: {
    //                 senderId: 1,
    //                 content: "hi",
    //                 sentAt: "05:41 01.25.2023",
    //                 readStatus: false,
    //             }
    //         },
    //         {
    //             msgId: 2,
    //             msg: {
    //                 senderId: 2,
    //                 content: "hi",
    //                 sentAt: "05:42 01.25.2023",
    //                 readStatus: false,
    //             }
    //         },
    //         {
    //             msgId: 3,
    //             msg: {
    //                 senderId: 1,
    //                 content: "hi",
    //                 sentAt: "05:43 01.25.2023",
    //                 readStatus: false,
    //             }
    //         }
    //
    //     ]
    // }
    return (
        <div className={styles.messageWidgetContainer}>
            {/*<MessageArea messages={setMessages().messages.chat}/>*/}

            <textarea className={styles.sendInput} placeholder={"Сообщение"}/>
            <SubmitButton style={styles.sendButton}>Send</SubmitButton>

        </div>
    )
}