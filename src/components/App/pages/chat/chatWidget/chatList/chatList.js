import styles from './chatList.module.css'
import {OneChat} from "components/App/pages/chat/chatWidget/chatList/oneChat/oneChat";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {Tinder} from "@/api/api";
import {render, prerender} from "@/lib/jsx/render";

export const ChatList = ({ws, messageDispatcher}) => {
    const chatsContainerRef = useRef();

    let chats;

    const setChatList = async () => {
        chats = (await ((await Tinder.getChats()).json())).body.chatsList;

        render(chatsContainerRef.getValue(), chats.map((chat) => {
            chat.ref = useRef();

            return <OneChat ref={chat.ref} onClick={messageDispatcher.dispatch} chat={chat}/>
        }))

        ws.addEventListener("message", (event) => {
            const jsonMSG = JSON.parse(event.data);
            switch (jsonMSG.flag) {
            case "SEND":
                const msg = jsonMSG.body.msg;
                const senderId = jsonMSG.body.senderId;
                const sentAt = jsonMSG.body.sentAt;
                const chatId = jsonMSG.body.chatId;
    
                const msgData = {
                    content: msg,
                    readStatus: false,
                    senderId: senderId,
                    sentAt: sentAt,
                };
    
                if (chatId !== undefined) {
                    changeChatsList(msgData, chatId);
                    break;
                }
            }
        });
    }
    setChatList();

    const changeChatsList = (msgObject, chatId) => {
        if (chats === undefined || chats.length === 0) {
            return;
        }

        const parentElement = chatsContainerRef.getValue();

        const firstChatData = chats[0];

        let currChatData = firstChatData;
        let currChatIndex = 0;

        let prevChatData;
        let found = false;
        for (let idx = 0; idx < chats.length; idx++) {
            const chat = chats[idx];
            if (idx !== 0) {
                if (!found && chat.chatId === chatId) {
                    currChatData = chat;
                    currChatIndex = idx;

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

        currChatData.msg.senderId = msgObject.senderId;
        currChatData.msg.content = msgObject.content;
        currChatData.msg.readStatus = msgObject.readStatus;
        currChatData.msg.sentAt = msgObject.sentAt;

        parentElement.removeChild(currChatData.ref.getValue());

        chats[0] = currChatData;
        chats[0].ref = useRef();
        prerender(parentElement, <OneChat ref={chats[0].ref} onClick={messageDispatcher.dispatch} chat={currChatData}/>);

    }

    return (
        <div ref={chatsContainerRef} className={styles.chatListContainer}>

        </div>
    )

}
