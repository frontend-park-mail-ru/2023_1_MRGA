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
    
    const recordButton = useRef();
    let isRecording = false;
    let mediaRecorder;
    let recordedBlobs;

    const supportedType = 'audio/webm';
    async function startRecording() {
        const constraints = { audio: true, video: false };
        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            mediaRecorder = new MediaRecorder(stream);
            recordedBlobs = [];

            mediaRecorder.addEventListener('dataavailable', (event) => {
                if (event.data && event.data.size > 0) {
                    recordedBlobs.push(event.data);
                }
            });
            mediaRecorder.start();

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async function stopRecording(chat) {
        mediaRecorder.stop();
        await new Promise(resolve => mediaRecorder.addEventListener('stop', resolve));
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        const blob = new Blob(recordedBlobs, { type: supportedType });

        if (blob.size === 0) {
            console.error('Error: Recorded audio has 0 size.');
            return;
        }

        try {
            await sendDataToServer(chat, blob);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function sendDataToServer(chat, blob) {
        const formData = new FormData();
        formData.append('files[]', blob, 'audio.webm');
        
        try {
            const responseSaveFile = await ((await Tinder.postFiles(formData)).json());
            if (responseSaveFile.status !== 200 || responseSaveFile.body.pathToFiles.length !== 1) {
                console.error('Error: ', responseSaveFile.error);
                return;
            }

            const path = responseSaveFile.body.pathToFiles[0];

            const msgForSending = {
                content: "",
                userIds: chat.chatUserIds,
                messageType: "audio",
                path: path,
            };

            const responseSendMessage = await (await (Tinder.sendMessage(chat.chatId, msgForSending))).json();

            if (responseSendMessage.status !== 200) {
                сonsole.error('Error: ', responseSendMessage.error);
                return;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
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
                <div className={styles.inputArea}>
                    <div className={styles.messageArea}>
                        <textarea ref={newMessageRef} onKeyDown={(event) => handleTextareaKeyDown(event, chat)} className={styles.sendInput} placeholder={"Сообщение"}/>
                        <div>
                            <button ref={recordButton} className={styles.recordButton}>🎙️</button>
                        </div>
                    </div>
                    <SubmitButton onClick={onSendMessageClick.bind(null, chat)} style={styles.sendButton}>отправить</SubmitButton>
                </div>
            </>
        )

        recordButton.getValue().addEventListener('click', async () => {
            if (!isRecording) {
                startRecording();
                recordButton.getValue().textContent = '⬆️';
            } else {
                await stopRecording(chat);
                recordButton.getValue().textContent = '🎙';
            }
            isRecording = !isRecording;
        });

        messagesAreaRef.getValue().scrollTo(0, messagesAreaRef.getValue().scrollHeight);

        WSChatAPI.getMessage((msgId, msg, senderId, sentAt, chatId, messageType, path) => {
            const msgData = {
                msgId: msgId,
                content: msg,
                readStatus: false,
                senderId: senderId,
                sentAt: sentAt,
                messageType: messageType,
                path: path,
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
