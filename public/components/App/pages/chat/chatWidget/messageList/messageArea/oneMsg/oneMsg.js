import styles from "components/App/pages/chat/chatWidget/messageList/messageArea/oneMsg/oneMsg.module.css";

const MsgContent = ({content}) => {
    const componentStyle = [styles.messageArea];
}

const MsgSpace = ({msg},) => {
    console.log(msg)
    const componentStyle = [styles.messageSpace]
    const data = new Date(msg.sentAt);
    if (msg.senderId === 1) {
        componentStyle.push(styles.ownMessage);
    } else {
        componentStyle.push(styles.foreignMessage);
    }
    return (
        <div className={componentStyle.join(' ')}>
            <div>{msg.content}</div>
            <div className={styles.messageTime}>{data.getHours()}:{data.getMinutes()}</div>
        </div>
    )
}

export const OneMsg = ({msg},) => {
    return (
        <MsgSpace  msg={msg.msg}/>
    )
}