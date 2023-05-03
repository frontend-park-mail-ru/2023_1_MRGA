import styles from './chatList.module.css'
import {OneChat} from "components/App/pages/chat/chatWidget/chatList/oneChat/oneChat";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {Tinder} from "@/api/api";
import {render} from "@/lib/jsx/render";

export const ChatList = ({messageDispatcher}) => {
    const chatsContainerRef = useRef();

    let chats;
    const setChatList = async () => {
        chats = (await ((await Tinder.getChats()).json())).body.chatsList;
        console.log(chats);
        render(chatsContainerRef.getValue(), chats.map((chat) => {
            return <OneChat onClick={messageDispatcher.dispatch} chat={chat}/>
        }))
    }
    setChatList();
    // {chatList.map((chat) => {
    //     return (
    //         <OneChat chat={chat}/>
    //     )
    // })}
    return (
        <div ref={chatsContainerRef} className={styles.chatListContainer}>

        </div>
    )

}