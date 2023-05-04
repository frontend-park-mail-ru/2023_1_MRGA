import {Tinder} from "@/api/api";
import styles from "components/App/pages/chat/chatWidget/messageList/messageList.module.css";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {OneMsg} from "components/App/pages/chat/chatWidget/messageList/messageArea/oneMsg/oneMsg";
import {MessageArea} from "components/App/pages/chat/chatWidget/messageList/messageArea/messageArea";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import chatIcon from "assets/svg/chat-icon.svg";
import {render} from "@/lib/jsx/render";
import {ChatUser} from "components/App/pages/chat/chatWidget/chatList/oneChat/oneChat";


export const MessageList = ({ws, messageDispatcher}) => {
    const info = useRef();

    const newMessageRef = useRef();
    const messagesAreaRef = useRef();
    const onSendMessageClick = async (chat, e) => {
        e.preventDefault();

        if (newMessageRef.getValue().value.replaceAll(' ', '') === '') {
            return ;
        }

        const msg = newMessageRef.getValue().value;

        const resp = await (await (Tinder.sendMessage(chat.chatId, {content: msg}))).json();
        ws.send(JSON.stringify({
            flag: "SEND",
            body: {
                sentAt: resp.sentAt,
                chatId: chat.chatId,
                userIds: chat.userIds,
                msg: msg,
            }
        }));
        messageDispatcher.dispatch(chat);
    }
    messageDispatcher.subscribe( async (chat) => {
        const messagesList = await ((await Tinder.getMessages(chat.chatId)).json());
        info.getValue().innerHTML = ''; // TODO: надо заменить на добавление к старому новых сообщений (чтобы не делать запрос на сервер каждый раз)
        render(info.getValue(),
            <>
                <ChatUser className={styles.companionStyle} userID={chat.chatUserIds[0]}/>
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
