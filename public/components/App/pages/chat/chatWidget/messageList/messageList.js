import {Tinder} from "@/api/api";
import styles from "components/App/pages/chat/chatWidget/messageList/messageList.module.css";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {OneMsg} from "components/App/pages/chat/chatWidget/messageList/messageArea/oneMsg/oneMsg";
import {MessageArea} from "components/App/pages/chat/chatWidget/messageList/messageArea/messageArea";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";


export const MessageList = () => {
    const info = useRef()
    let messages = []
    const getMessages = async () => {
        try {
            const messagesList = await ((await Tinder.getMessages(2)).json());
            messages = messagesList.chat;
            return {messages: messagesList.chat}
        } catch (e) {
            return {messages: [], error: e}
        }
    }

    const test = async () => {
        await getMessages();
        if (!messages || messages.length === 0) {
            info.getValue().innerHTML = "На данный момент для вас нет сообщений";
            return ;
        }
        //setCurrentRecommendation();
    }

        messages = [
                {
                    msgId: 1,
                    msg: {
                        senderId: 1,
                        content: "hi",
                        sentAt: "05:41 01.25.2023",
                        readStatus: false,
                    }
                },
                {
                    msgId: 2,
                    msg: {
                        senderId: 2,
                        content: "hi",
                        sentAt: "05:42 01.25.2023",
                        readStatus: false,
                    }
                },
                {
                    msgId: 3,
                    msg: {
                        senderId: 1,
                        content: "hikkkkk",
                        sentAt: "05:43 01.25.2023",
                        readStatus: false,
                    }
                },
            {
                msgId: 2,
                msg: {
                    senderId: 2,
                    content: "hi",
                    sentAt: "05:42 01.25.2023",
                    readStatus: false,
                }
            },
            {
                msgId: 3,
                msg: {
                    senderId: 1,
                    content: "hi",
                    sentAt: "05:43 01.25.2023",
                    readStatus: false,
                }
            },
            {
                msgId: 2,
                msg: {
                    senderId: 2,
                    content: "hikmkmkmkmkmkmkmk mkmkmkmkmkmkmkmkmkmkm",
                    sentAt: "05:42 01.25.2023",
                    readStatus: false,
                }
            },
            {
                msgId: 3,
                msg: {
                    senderId: 1,
                    content: "hi",
                    sentAt: "05:43 01.25.2023",
                    readStatus: false,
                }
            }

            ]

    //getMessages();
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
            <MessageArea messages={messages}/>

            <textarea className={styles.sendInput} placeholder={"Сообщение"}/>
            <SubmitButton style={styles.sendButton}>Send</SubmitButton>

        </div>
    )
}