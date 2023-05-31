import {Form} from "components/UI/forms/form/form";
import logoMini from "assets/LogoMini.svg";

import {Warning} from "components/UI/forms/warning/warning";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {Tinder} from "@/api/api";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";
import styles from "components/App/profileEditForm/PhotoEditInputs/PhotoEditInput.module.css";
import photoFormStyles from './photoForm.module.css'
import {MyPhotoInput} from "components/UI/forms/photoInput/photoInput";
import logo from "assets/LogoMini.svg";
import {modalDispatcher, ModalWindow} from "components/UI/modal/modal";

export const PhotoForm = () => {
    const photoWarning = useRef();
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
    const dispatcher = modalDispatcher();
    const onSubmitClick = async (e) => {
        e.preventDefault();

        try {
            let photoCount = 0;
            const formData = new FormData();
            for (let {label} of photosRef) {
                const file = label.getValue().control.files[0]
                if (file) {
                    formData.append('files[]', file);
                    photoCount++;
                }
            }
            if (photoCount === 0) {
                dispatcher.showModal();
                return ;
            }
            const respPhotoUser = await Tinder.postPhotos(formData);
            const jsonPhotoUser = await respPhotoUser.json()
            if (jsonPhotoUser.status !== 200) {
                if (jsonPhotoUser.error === "there is not face"){
                    let warningPhoto = "Лица не обнаружены на фотографии(ях) под номером(ами): "
                    for (const photoNum of jsonPhotoUser.body.problemPhoto){
                        warningPhoto = warningPhoto + String(photoNum+1) + " "
                    }
                    photoWarning.getValue().innerHTML = warningPhoto
                }
                return
            }
            Navigate({to:'/'});
        } catch (e) {
            alert(e);
        }
    }
    return  (
        <FormContainer>
            <Form>
                <ModalWindow dispatcher={dispatcher}>
                    <div> загрузите хотя бы одну фотографию</div>
                </ModalWindow>
                <img src={logoMini} width="46" alt={"logo"}/>
                <h1 style={"margin: 30px; text-align: center;"}>Загрузите минимум одну фотографию</h1>
                <div className={styles.form}>
                    {photosRef.map(({photo, label, id, deleteButton}) => {
                        return (
                        <MyPhotoInput control={label} photo={photo} id={id}></MyPhotoInput>
                        )
                    })}
                <Warning
                    className={photoFormStyles.warningWidth}
                    ref={photoWarning}
                    title={"Некоректное фото"}
                />
                <SubmitButton onClick={onSubmitClick}>Подтвердить</SubmitButton>
                </div>

            </Form>
        </FormContainer>
    )
}
