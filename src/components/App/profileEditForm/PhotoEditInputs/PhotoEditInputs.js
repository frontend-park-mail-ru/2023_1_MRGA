import styles from "./PhotoEditInput.module.css";
import {MyPhotoInput, PhotoInput} from "components/UI/forms/photoInput/photoInput";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";

import {Tinder, BackendProtocol, BackendHost, BackendPort} from "@/api/api";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {rootRender} from "@/lib/jsx";
import {ProfilePage} from "components/App/pages/profile/profile";
import {Label} from "components/UI/forms/label/label";

import deletePhoto from "assets/svg/dislike.svg";
import {modalDispatcher, ModalWindow} from "components/UI/modal/modal";

function PhotoInputContainer(props, children) {
    return (
        <div {...props}>
            {children}
        </div>
    );
}

export const PhotoEditInputs = () => {
    const photosRef = [
        {
            photo: useRef(),
            label: useRef(),
            deleteButton: useRef(),
            id: "0",
        },
        {
            photo: useRef(),
            label: useRef(),
            deleteButton: useRef(),
            id: "1",
        },
        {
            photo: useRef(),
            label: useRef(),
            deleteButton: useRef(),
            id: "2",
        },
        {
            photo: useRef(),
            label: useRef(),
            deleteButton: useRef(),
            id: "3",
        },
        {
            photo: useRef(),
            label: useRef(),
            deleteButton: useRef(),
            id: "4",
        },
    ];

    let photos;
    const loadUserData = async () => {
            photos = (await (await Tinder.getInfoUser()).json()).body.photos;
            for (let i = 0; i < photos.length; i++) {
                try {
                photosRef[i].photo.getValue().src = `${BackendProtocol}://${BackendHost}:${BackendPort}/api/auth/photo/${photos[i]}`;
                photosRef[i].deleteButton.getValue().classList.remove(styles.hidden);
                } catch (e) {
                    alert(e);
                }
            }

    };
    const onUpdateClick = async (e) => {
        e.preventDefault();

        for (const {label, id} of photosRef) {
            const file = label.getValue().control.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const respPhotoUser = await Tinder.putPhoto(formData, id);
            }
        }

        rootRender(<ProfilePage/>);
    };
    let currentPhotoID;
    const afterConfirm = async (e) => {
        await confirmButton(e);
        dispatcher.hideModal();
    };
    const confirmButton = async (e) => {
        e.preventDefault();
        if (!photos) {
            return ;
        }
        if (photos.length === 1) {
            alert("нельзя удалить последнюю фотографию");
            return ;
        }
        try {
            const deletePhotoResult = await Tinder.deletePhoto(currentPhotoID);
            rootRender(<ProfilePage/>);
        } catch (e) {
            alert(e);
        }
    };
    const onDeleteClick = async (id, e) => {
        dispatcher.showModal();
        currentPhotoID = id;
        e.preventDefault();
    };
    const dispatcher = modalDispatcher();
    loadUserData().then();
    return (
        <div>
            <Label labelText={"Фотографии профиля"}/>
            <ModalWindow dispatcher={dispatcher}>
                <div className={styles.deletedText}>
                    Уверены, что хотите удалить фотографию?
                </div>

                <SubmitButton onClick={afterConfirm}>Да</SubmitButton>
            </ModalWindow>
            <div className={styles.form}>
                {photosRef.map(({photo, label, id, deleteButton}) => {
                    return (
                        <MyPhotoInput id={id} control={label} photo={photo}>
                            <img ref={deleteButton} onClick={onDeleteClick.bind(null, id)}
                            src={deletePhoto} className={[styles.deletePhotoButton, styles.hidden].join(" ")}/>
                        </MyPhotoInput>
                    );
                })}
            </div>
        <SubmitButton onClick={onUpdateClick}>Сохранить</SubmitButton>
        </div>
  );
};
