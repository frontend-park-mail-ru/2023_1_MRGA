import {appendChildren, create} from "@/lib/jsx";
import styles from "./notification.module.css";
import {MATCH_NOTIFICATION_TYPES} from "@/api/ws_chat_api";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {modalDispatcher} from "components/UI/modal/modal";
import modalStyles from "../../UI/modal/modal.module.css";

const notificationContainerID = "notificationContainer";

export const notificationContainer = document.getElementById(notificationContainerID);
notificationContainer.classList.add(styles.notificationContainer);

export const NotificationPopupDispatcher = modalDispatcher();

const NotificationWrapper = () => {
    const ref = useRef();
    NotificationPopupDispatcher.subscribe((event) => {
        switch (event) {
            case "hide": {
                ref.getValue().classList.add(modalStyles.hidden);
                break;
            }
            case "show": {
                ref.getValue().classList.remove(modalStyles.hidden);
                break;
            }
            default: {
                return;
            }
        }

    });
    const onClick = (e) => {
        e.preventDefault();
        ref.getValue().classList.add(modalStyles.hidden);
    };
    return (
        <div ref={ref} className={[styles.notificationWrapper, modalStyles.hidden].join(" ")}>
            <b onClick={onClick} className={styles.wrapperHideButton}>Х</b>
        </div>
    );
};

export const notificationWrapper = create(
    <NotificationWrapper/>
);

appendChildren(notificationContainer, notificationWrapper);

export const MatchNotification = ({notification}) => {
    const ref = useRef();
    switch (notification.type) {
        case MATCH_NOTIFICATION_TYPES.NEW_MATCH: {
            return <div className={styles.notification} ref={ref}>У вас новое совпадение</div>;
        }
        case MATCH_NOTIFICATION_TYPES.MISSED_MATCH: {
            return <div className={styles.notification} ref={ref}>Только что вы упустили пару</div>;
        }
    }
};
