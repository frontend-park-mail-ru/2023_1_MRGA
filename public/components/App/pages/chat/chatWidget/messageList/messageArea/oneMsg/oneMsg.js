import styles from "components/App/pages/chat/chatWidget/messageList/messageArea/oneMsg/oneMsg.module.css";

import rsStyle from '../../../chatList/oneChat/oneChat.module.css'

const MsgContent = ({content}) => {
    const componentStyle = [styles.messageArea];
}

const MsgSpace = ({msg},) => {
    console.log(msg)
    const componentStyle = [styles.bubbleMessage, styles.theme]
    const data = new Date(msg.sentAt);
    if (msg.senderId === 1) {
        componentStyle.push(styles.ownMessage);
    } else {
        componentStyle.push(styles.foreignMessage);
    }
    const readStatus = !msg.readStatus ? ' •': '';
    const dataTime = data.getHours()+":"+data.getMinutes()
    return (
        <div className={componentStyle.join(' ')}>
            <div className={styles.messageText}>{msg.content}</div>
            <div className={styles.messageTime}>
                {data.getHours()}:{data.getMinutes().toString().padStart(2, '0')}
                <span className={[rsStyle.readStatus, styles.fsz30].join(' ')}>{readStatus}</span>
            </div>
        </div>
    )
}

export const OneMsg = ({msg},) => {
    return (
        <MsgSpace  msg={msg.msg}/>
    )
}
