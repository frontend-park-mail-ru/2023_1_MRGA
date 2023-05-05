import {Tinder} from "@/api/api";
import styles from "./chatWidget.module.css"
import {ChatList} from "components/App/pages/chat/chatWidget/chatList/chatList";
import {MessageList} from "components/App/pages/chat/chatWidget/messageList/messageList";


const messageDispatcher = () => {

    let listeners = [];

    const subscribe = (listener) => {
        listeners.push(listener);
    }
    const dispatch = (chatID) => {
        listeners.forEach((listener) => {
            listener(chatID);
        })
    }

    return {subscribe, dispatch};
}

const sendingMessageDispatcher = () => {

    let listener;

    const subscribe = (listen) => {
        listener = listen;
    }
    const dispatch = (msgData, chatId) => {
        listener(msgData, chatId);
    }

    return {subscribe, dispatch};
}

export const ChatWidget = ({ws, ...props}) => {
    const msgDispatcher = messageDispatcher();
    const chatDispatcher = sendingMessageDispatcher();

    ws.addEventListener("message", (event) => {
        const jsonMSG = JSON.parse(event.data);
        switch (jsonMSG.flag) {
        case "SEND":
            const msg = jsonMSG.body.msg;
            const senderId = jsonMSG.body.senderId;
            const sentAt = jsonMSG.body.sentAt;

            const msgData = {
                content: msg,
                readStatus: false,
                senderId: senderId,
                sentAt: sentAt,
            };

            chatDispatcher.dispatch(msgData, jsonMSG.body.chatId);
            break;
        }
    });

    return (
        <div className={styles.chatWidgetContainer}>
            <ChatList messageDispatcher={msgDispatcher} chatDispatcher={chatDispatcher} />
            <MessageList ws={ws} messageDispatcher={msgDispatcher} chatDispatcher={chatDispatcher} />
        </div>
    )
}