import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import styles from './PhotoEditInput.module.css'
// import photoInputStyles from '/components/App/'
import {MyPhotoInput, PhotoInput} from "components/UI/forms/photoInput/photoInput";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";

import logo from 'assets/LogoMini.svg'
import {Tinder} from "@/api/api";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {rootRender} from "@/lib/jsx";
import {ProfilePage} from "components/App/pages/profile/profile";
import {Label} from "components/UI/forms/label/label";

import deletePhoto from 'assets/svg/dislike.svg'
import {modalDispatcher, ModalWindow} from "components/UI/modal/modal";

function PhotoInputContainer(props, children) {
    return (
        <div {...props}>
            {children}
        </div>
    )
}

export const PhotoEditInputs = () => {
    const photosRef = [
        {
            photo: useRef(),
            label: useRef(),
            deleteButton: useRef(),
            id: '0'
        },
        {
            photo: useRef(),
            label: useRef(),
            deleteButton: useRef(),
            id: '1'
        },
        {
            photo: useRef(),
            label: useRef(),
            deleteButton: useRef(),
            id: '2'
        },
        {
            photo: useRef(),
            label: useRef(),
            deleteButton: useRef(),
            id: '3'
        },
        {
            photo: useRef(),
            label: useRef(),
            deleteButton: useRef(),
            id: '4'
        }
    ]

    let photos;
    const loadUserData = async () => {
            photos = (await (await Tinder.getInfoUser()).json()).body.photos;
            for (let i = 0; i < photos.length; i++) {
                try {
                const photo = (await (await Tinder.getPhoto(photos[i])).formData()).get('file');
                photosRef[i].photo.getValue().src = URL.createObjectURL(photo);
                photosRef[i].deleteButton.getValue().classList.remove(styles.hidden);
                } catch (e) {
                    alert('Произошла ошибка при попытке загрузить данные, попробуйте еще раз');
                }
            }

    }
    const onUpdateClick = async (e) => {
        e.preventDefault();

        for (let {label, id} of photosRef) {
            const file = label.getValue().control.files[0]
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                const respPhotoUser = await Tinder.putPhoto(formData, id);
            }
        }

        rootRender(<ProfilePage/>);
    }
    let currentPhotoID;
    const afterConfirm = async (e) => {
        await confirmButton(e)
        dispatcher.hideModal();
    }
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
    }
    const onDeleteClick = async (id, e) => {
        dispatcher.showModal();
        currentPhotoID = id;
        e.preventDefault();
    }
    const dispatcher = modalDispatcher();
    loadUserData().then();
    return (
        <>
        <Label labelText={"Фотографии профиля"}/>
            <ModalWindow dispatcher={dispatcher}>
                Уверены, что хотите удалить фотографию?
                <SubmitButton onClick={afterConfirm}>да</SubmitButton>
            </ModalWindow>
            <div className={styles.form}>
                {photosRef.map(({photo, label, id, deleteButton}) => {
                    return (
                        <MyPhotoInput id={id} control={label} photo={photo}>
                            <img ref={deleteButton} onClick={onDeleteClick.bind(null, id)}
                            src={deletePhoto} className={[styles.deletePhotoButton, styles.hidden].join(' ')}/>
                        </MyPhotoInput>
                    )
                })}
            </div>
        <SubmitButton onClick={onUpdateClick}>сохранить</SubmitButton>
        </>
  )
}
