import {render} from "@/lib/jsx/render";
import {appendChildren, create} from "@/lib/jsx";
import styles from './notification.module.css'

const notificationContainerID = 'notificationContainer';

export const notificationContainer = document.getElementById(notificationContainerID);
notificationContainer.classList.add(styles.notificationContainer);

export const notificationWrapper = create(
    <div className={styles.notificationWrapper}></div>
);
appendChildren(notificationContainer, notificationWrapper)