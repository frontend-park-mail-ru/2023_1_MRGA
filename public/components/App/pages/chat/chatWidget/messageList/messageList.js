import {Tinder} from "@/api/api";
import styles from "components/App/pages/chat/chatWidget/messageList/messageList.module.css";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {OneMsg} from "components/App/pages/chat/chatWidget/messageList/messageArea/oneMsg/oneMsg";
import {MessageArea} from "components/App/pages/chat/chatWidget/messageList/messageArea/messageArea";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";


export const MessageList = ({chatId, messageDispatcher}) => {
    const info = useRef();
    let messages = [];
    const getMessages = async () => {
        try {
            const messagesList = await ((await Tinder.getMessages(chatId)).json());
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
    }

        messages = []

    return (
        <div className={styles.messageWidgetContainer}>
            <MessageArea/>

            <textarea className={styles.sendInput} placeholder={"Сообщение"}/>
            <SubmitButton style={styles.sendButton}>Send</SubmitButton>

        </div>
    )
}