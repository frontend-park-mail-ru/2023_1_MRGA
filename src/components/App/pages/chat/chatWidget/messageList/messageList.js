import {Tinder} from "@/api/api";
import styles from "components/App/pages/chat/chatWidget/messageList/messageList.module.css";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {MsgSpace, OneMsg} from "components/App/pages/chat/chatWidget/messageList/messageArea/oneMsg/oneMsg";
import {MessageArea, OneMsgSpace} from "components/App/pages/chat/chatWidget/messageList/messageArea/messageArea";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import chatIcon from "assets/svg/chat-icon.svg";
import {render} from "@/lib/jsx/render";
import {ChatUser} from "components/App/pages/chat/chatWidget/chatList/oneChat/oneChat";
import {WSChatAPI} from "@/api/ws_chat_api";

export const MessageList = ({messageDispatcher}) => {
    const info = useRef();

    const newMessageRef = useRef();
    const messagesAreaRef = useRef();
    
    const onSendMessageClick = async (chat, e) => {
        e.preventDefault();

        const msg = newMessageRef.getValue().value;

        if (msg.replaceAll(' ', '') === '') {
            return ;
        }

        const resp = await (await (Tinder.sendMessage(chat.chatId, {content: msg, userIds: chat.chatUserIds}))).json();
        if (resp.status !== 200) {
            console.log(resp.err);
            return;
        }

        newMessageRef.getValue().value = '';
    }

    const handleTextareaKeyDown = async (event, chat) => {
        if (event.shiftKey && event.keyCode === 13) {
          event.preventDefault();
          const textarea = newMessageRef.getValue();
          textarea.value += '\n';
        } else if (event.keyCode === 13) {
          event.preventDefault();
          onSendMessageClick(chat, event);
        }
    }

    messageDispatcher.subscribe( async (chat) => {
        const messagesList = await ((await Tinder.getMessages(chat.chatId)).json());
        info.getValue().innerHTML = '';
        render(info.getValue(),
            <>
                <ChatUser className={styles.companionStyle} userID={chat.chatUserIds[0]}/>
                <MessageArea ref={messagesAreaRef} messages={messagesList.body.chat}/>
                <textarea ref={newMessageRef} onKeyDown={(event) => handleTextareaKeyDown(event, chat)} className={styles.sendInput} placeholder={"Сообщение"}/>
                <SubmitButton onClick={onSendMessageClick.bind(null, chat)} style={styles.sendButton}>отправить</SubmitButton>
            </>
        )
        messagesAreaRef.getValue().scrollTo(0, messagesAreaRef.getValue().scrollHeight);

        WSChatAPI.getMessage((msg, senderId, sentAt, chatId) => {
            const msgData = {
                content: msg,
                readStatus: false,
                senderId: senderId,
                sentAt: sentAt,
            };

            if (chat.chatId === chatId) {
                render(messagesAreaRef.getValue(), <OneMsgSpace msg={msgData} />);
                messagesAreaRef.getValue().scrollTo(0, messagesAreaRef.getValue().scrollHeight);
            }
        });
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
