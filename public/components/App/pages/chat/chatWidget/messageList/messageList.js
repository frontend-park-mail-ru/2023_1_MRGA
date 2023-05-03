import {Tinder} from "@/api/api";
import styles from "components/App/pages/chat/chatWidget/messageList/messageList.module.css";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {OneMsg} from "components/App/pages/chat/chatWidget/messageList/messageArea/oneMsg/oneMsg";
import {MessageArea} from "components/App/pages/chat/chatWidget/messageList/messageArea/messageArea";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import chatIcon from "assets/svg/chat-icon.svg";
import {render} from "@/lib/jsx/render";


export const MessageList = ({messageDispatcher}) => {
    const info = useRef();

    const newMessageRef = useRef();
    const messagesAreaRef = useRef();
    const onSendMessageClick = async (chat, e) => {
        e.preventDefault();

        if (newMessageRef.getValue().value.replaceAll(' ', '') === '') {
            return ;
        }

        const resp = await (await (Tinder.sendMessage(chat.chatId, {content: newMessageRef.getValue().value}))).json();
        messageDispatcher.dispatch(chat);
    }
    messageDispatcher.subscribe( async (chat) => {

        const messagesList = await ((await Tinder.getMessages(chat.chatId)).json());
        info.getValue().innerHTML = '';
        render(info.getValue(),
            <>
                <MessageArea ref={messagesAreaRef} messages={messagesList.body.chat}/>
                <textarea ref={newMessageRef} className={styles.sendInput} placeholder={"Сообщение"}/>
                <SubmitButton onClick={onSendMessageClick.bind(null, chat)} style={styles.sendButton}>отправить</SubmitButton>
            </>
        )
        messagesAreaRef.getValue().scrollTo(0, messagesAreaRef.getValue().scrollHeight);
    })

    return (<Container ref={info}/>)

}

const Container = ({ref}) => {
    return (
        <div ref={ref} className={styles.messageListContainer}>
            <div className={styles.messagesPlaceholderContainer}>
                <img src={chatIcon} width="52" height="52" alt=""/>
                <div className={styles.placeholder}>
                    Выберите человека, чтобы начать чат
                </div>
            </div>
        </div>
    )
}
