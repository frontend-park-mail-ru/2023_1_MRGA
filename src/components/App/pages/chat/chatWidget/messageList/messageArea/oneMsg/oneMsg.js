import styles from "components/App/pages/chat/chatWidget/messageList/messageArea/oneMsg/oneMsg.module.css";
import rsStyle from "../../../chatList/oneChat/oneChat.module.css";
import {getUser} from "@/store/user";
import {convertToDate} from "@/lib/jsx/utils";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import { Tinder, BackendHost, BackendPort, BackendProtocol } from "@/api/api";
import { WSChatAPI } from "@/api/ws_chat_api";
import playIcon from "assets/img/play.png";
import pauseIcon from "assets/img/pause.png";
import transcriptionIcon from "assets/img/transcription.png";

export const OneMsg = ({chatId, msg}) => {
    const audioRef = useRef();
    const playImgRef = useRef();
    const progressRef = useRef();

    const transcriptionRef = useRef();
    const transcriptionText = useRef();

    const readStatusRef = useRef();

    WSChatAPI.getReadStatus((readData) => {
        const gotChatId = readData.chatId;
        const senderId = readData.senderId;

        if (chatId === gotChatId && readStatusRef.getValue().innerText === " •" && senderId !== msg.senderId) {
            readStatusRef.getValue().innerText = "";
        }
    }, chatId+msg.msgId);

    const handleTranscription = async (audioPath) => {
        const transcriptionButton = transcriptionRef.getValue();
        transcriptionButton.disabled = true;
        transcriptionButton.style.opacity = "0.9";

        const responseTranscription = await (await Tinder.getTranscription(audioPath)).json();

        if (responseTranscription.status !== 200) {
            console.error("Error: ", responseTranscription.error);
            transcriptionText.getValue().innerText = "Не удалось рашсифровать сообщение.";
            return;
        }

        const audioText = responseTranscription.body.text;

        if (audioText === "") {
            transcriptionText.getValue().innerText = "Пустое сообщение.";
            return;
        }

        transcriptionText.getValue().innerText = audioText;
    };

    const handlePlayPause = () => {
        const audio = audioRef.getValue();
        const playImg = playImgRef.getValue();

        if (audio && playImg) {
            if (audio.paused) {
                audio.play().catch(e => console.log(e));
                playImg.src = pauseIcon;
            } else {
                audio.pause();
                playImg.src = playIcon;
            }
        }
    };

    const handleTimeUpdate = () => {
        const audio = audioRef.getValue();
        const progressDiv = progressRef.getValue();

        if (audio && progressDiv) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressDiv.style.width = `${progress}%`;
        }
    };

    const componentStyle = [styles.bubbleMessage];

    if (msg.senderId === getUser().userId) {
        componentStyle.push(styles.ownMessage);
    } else {
        componentStyle.push(styles.foreignMessage);
    }
    const readStatus = !msg.readStatus ? " •": "";

    switch (msg.messageType) {
    case "text", "" :
        return (
            <div data-msgId={msg.msgId} className={componentStyle.join(" ")}>
                <div className={styles.messageText}>{msg.content}</div>
                <div className={styles.messageTime}>
                    {convertToDate(msg.sentAt)}
                    <span ref={readStatusRef} className={[rsStyle.readStatus, styles.fsz30].join(" ")}>{readStatus}</span>
                </div>
            </div>
        );
    case "audio":
        componentStyle.push(styles.audioContainer);
        return (
            <div data-msgId={msg.msgId} className={componentStyle.join(" ")}>
                <div className={styles.messageText}>
                    <div className={styles.audioWrapper}>
                        <audio src={`${BackendProtocol}://${BackendHost}:${BackendPort}/api/auth/file/${msg.path}`} ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={() => playImgRef.getValue().src = playIcon}></audio>
                        <div className={styles.playPauseButton} onClick={handlePlayPause}>
                            <button>
                                <img src={playIcon} ref={playImgRef}></img>
                            </button>
                        </div>
                        <div className={styles.progressBar}>
                            <div className={styles.progress} ref={progressRef}></div>
                        </div>
                        <div className={styles.transcriptionButton} onClick={handleTranscription.bind(null, msg.path)}>
                            <button ref={transcriptionRef}>
                                <img src={transcriptionIcon}></img>
                            </button>
                        </div>
                    </div>
                    <div ref={transcriptionText} className={styles.transcriptionText}>

                    </div>
                </div>
                <div className={styles.messageTime}>
                    {convertToDate(msg.sentAt)}
                    <span ref={readStatusRef} className={[rsStyle.readStatus, styles.fsz30].join(" ")}>{readStatus}</span>
                </div>
            </div>
        );
    }
};
