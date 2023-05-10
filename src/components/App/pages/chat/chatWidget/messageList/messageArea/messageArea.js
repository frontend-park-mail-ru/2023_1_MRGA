import {Tinder} from "@/api/api";
import styles from "components/App/pages/chat/chatWidget/messageList/messageArea/messageArea.module.css";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {OneChat} from "components/App/pages/chat/chatWidget/chatList/oneChat/oneChat";
import {OneMsg} from "components/App/pages/chat/chatWidget/messageList/messageArea/oneMsg/oneMsg";


export const OneMsgSpace = ({msg},) => {
    return (
        <div className={styles.messageSpace}>
            <OneMsg msg={msg}/>
        </div>
    )
}

export const MessageArea = ({messages, ref},) => {
    return (
        <div  ref={ref} className={styles.messageAreaContainer}>
            {messages.map((msg) => {
                return(
                    <OneMsgSpace msg={msg.msg}/>
                )
            })}
        </div>
    )

}