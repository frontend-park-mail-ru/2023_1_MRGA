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
import {getUser} from "@/store/user";


export const MessageList = ({ws, messageDispatcher}) => {
    const info = useRef();

    const newMessageRef = useRef();
    const messagesAreaRef = useRef();
    
    const onSendMessageClick = async (chat, e) => {
        e.preventDefault();

        const msg = newMessageRef.getValue().value;

        if (msg.replaceAll(' ', '') === '') {
            return ;
        }

        const resp = await (await (Tinder.sendMessage(chat.chatId, {content: msg}))).json();
        if (resp.status !== 200) {
            console.log(resp.err);
            return;
        }

        const msgObject = {
            flag: "SEND",
            body: {
                sentAt: resp.body.sentAt,
                chatId: chat.chatId,
                userIds: chat.chatUserIds,
                msg: msg,
            }
        };

        ws.send(JSON.stringify(msgObject));
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
        info.getValue().innerHTML = ''; // TODO: надо заменить на добавление к старому новых сообщений (чтобы не делать запрос на сервер каждый раз)
        render(info.getValue(),
            <>
                <ChatUser className={styles.companionStyle} userID={chat.chatUserIds[0]}/>
                <MessageArea ref={messagesAreaRef} messages={messagesList.body.chat}/>
                <textarea ref={newMessageRef} onKeyDown={(event) => handleTextareaKeyDown(event, chat)} className={styles.sendInput} placeholder={"Сообщение"}/>
                <SubmitButton onClick={onSendMessageClick.bind(null, chat)} style={styles.sendButton}>отправить</SubmitButton>
            </>
        )
        messagesAreaRef.getValue().scrollTo(0, messagesAreaRef.getValue().scrollHeight);

        ws.addEventListener("message", (event) => {
            const jsonMSG = JSON.parse(event.data);
            switch (jsonMSG.flag) {
            case "REG+ASK":
            case "SEND+ASK":
                if (jsonMSG.status !== 200) {
                    console.log(jsonMSG.err);
                }
                break;
            case "SEND":
                const chatId = jsonMSG.body.chatId;
                const msg = jsonMSG.body.msg;
                const senderId = jsonMSG.body.senderId;
                const sentAt = jsonMSG.body.sentAt;

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

                break;
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
