import styles from "./chatList.module.css";
import {OneChat} from "components/App/pages/chat/chatWidget/chatList/oneChat/oneChat";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {Tinder} from "@/api/api";
import {WSChatAPI} from "@/api/ws_chat_api";
import {getUser} from "@/store/user";
import {render, prerender} from "@/lib/jsx/render";

export const ChatList = ({messageDispatcher}) => {
    const chatsContainerRef = useRef();

    let chats;

    const setChatList = async () => {
        chats = (await ((await Tinder.getChats()).json())).body.chatsList;

        render(chatsContainerRef.getValue(), chats.map((chat) => {
            chat.ref = useRef();
            chat.activeChat = false;

            return <OneChat ref={chat.ref} onClick={messageDispatcher.dispatch} chat={chat}/>;
        }));

        WSChatAPI.getMessage((msgId, msg, senderId, sentAt, chatId, messageType, path) => {
            const msgData = {
                content: msg,
                readStatus: false,
                senderId: senderId,
                sentAt: sentAt,
                messageType: messageType,
                path: path,
            };

            if (chatId !== undefined) {
                changeChatsList(msgData, chatId);
            }
        });

        messageDispatcher.subscribe((chat) => {
            chats.forEach((element, idx) => {
                if (element.chatId === chat.chatId && !element.activeChat) {
                    chats[idx].ref.getValue().classList.add(styles.activeChat);
                    chats[idx].activeChat = true;
                } else if (element.chatId !== chat.chatId && element.activeChat) {
                    chats[idx].ref.getValue().classList.remove(styles.activeChat);
                    chats[idx].activeChat = false;
                }
            });
        });
    };
    setChatList();

    const changeChatsList = (msgObject, chatId) => {
        if (chats === undefined || chats.length === 0) {
            return;
        }

        const parentElement = chatsContainerRef.getValue();

        const firstChatData = chats[0];

        let currChatData = firstChatData;

        let prevChatData;
        let found = false;
        for (let idx = 0; idx < chats.length; idx++) {
            const chat = chats[idx];
            if (idx !== 0) {
                if (!found && chat.chatId === chatId) {
                    currChatData = chat;

                    found = true;

                    chats[idx] = prevChatData;

                    break;
                } else if (!found) {
                    chats[idx] = prevChatData;
                }
            } else {
                if (chat.chatId === chatId) {
                    found = true;
                }
            }

            prevChatData = chat;
        }

        if (!found) {
            chats.unshift({
                msg: {
                    senderId: msgObject.senderId,
                    content: msgObject.content,
                    sentAt: msgObject.sentAt,
                    readStatus: msgObject.readStatus,
                    messageType: msgObject.messageType,
                    path: msgObject.path,
                },
                chatId: chatId,
                chatUserIds: [msgObject.senderId],
                ref: useRef(),
            });
            prerender(parentElement, <OneChat ref={chats[0].ref} onClick={messageDispatcher.dispatch} chat={chats[0]}/>);
            return;
        }

        currChatData.msg.messageType = msgObject.messageType;
        currChatData.msg.path = msgObject.path;
        currChatData.msg.senderId = msgObject.senderId;
        currChatData.msg.senderId = msgObject.senderId;
        currChatData.msg.content = msgObject.content;
        currChatData.msg.readStatus = msgObject.readStatus;
        currChatData.msg.sentAt = msgObject.sentAt;


        parentElement.removeChild(currChatData.ref.getValue());

        chats[0] = currChatData;
        chats[0].ref = useRef();
        if (currChatData.activeChat) {
            chats[0].activeChat = true;
        } else {
            chats[0].activeChat = false;
        }

        prerender(parentElement, <OneChat ref={chats[0].ref} onClick={messageDispatcher.dispatch} chat={currChatData}/>);

        if (chats[0].activeChat === true) {
            chats[0].ref.getValue().classList.add(styles.activeChat);
        }
    };

    return (
        <div ref={chatsContainerRef} className={styles.chatListContainer}>

        </div>
    );
};
