import styles from './modal.module.css'
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
export const modalDispatcher = () => {
    let subscribers = [];
    const showModal = () => {
        subscribers.forEach((sub) => sub("show"));
    }
    const hideModal = () => {
        subscribers.forEach((sub) => sub("hide"));
    }
    const subscribe = (callback) => {
        subscribers.push(callback);
    }
    return {
        showModal,
        hideModal,
        subscribe
    }
}
export const ModalWindow = ({dispatcher,...props}, children) => {
    dispatcher.subscribe((event) => {
        switch (event) {
            case "hide": {
                modal.getValue().classList.add(styles.hidden);
                break;
            }
            case "show": {
                modal.getValue().classList.remove(styles.hidden);
                break;
            }
            default: {
                return
            }
        }

    })
    const hide = (e) => {
        e.preventDefault();
        modal.getValue().classList.add(styles.hidden);
    }
    const modal = useRef();
    return (
        <div ref={modal}  className={[styles.modalOverlay, styles.hidden].join(' ')} {...props}>
            <div className={styles.modal}>
            <SubmitButton onClick={hide} style={styles.modalClose}>×</SubmitButton>
            {children}
            </div>
        </div>
    )
}