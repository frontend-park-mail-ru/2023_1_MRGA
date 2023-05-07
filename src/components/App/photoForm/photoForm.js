import {Form} from "components/UI/forms/form/form";
import logoMini from "assets/LogoMini.svg";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {Label} from "components/UI/forms/label/label";
import {Select} from "components/UI/forms/select/select";
import {Warning} from "components/UI/forms/warning/warning";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {Tinder} from "@/api/api";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";
import styles from "components/App/profileEditForm/PhotoEditInputs/PhotoEditInput.module.css";
import deletePhoto from "assets/svg/dislike.svg";
import {MyPhotoInput, PhotoInput} from "components/UI/forms/photoInput/photoInput";
import logo from "assets/LogoMini.svg";

export const PhotoForm = () => {
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
                alert('загрузите хотя бы одну фотографию');
                return ;
            }
            const respPhotoUser = await Tinder.postPhotos(formData);
            const jsonPhotoUser = await respPhotoUser.json()
            if (jsonPhotoUser.status !== 200) {
                alert(jsonPhotoUser.error);
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
                <img src={logoMini} width="46" alt={"logo"}/>
                <h1 style={"margin: 30px; text-align: center;"}>Загрузите минимум одну фотографию</h1>
                <div className={styles.form}>
                    {photosRef.map(({photo, label, id, deleteButton}) => {
                        return (
                        <MyPhotoInput control={label} photo={photo} id={id}></MyPhotoInput>
                        )
                    })}
                <SubmitButton onClick={onSubmitClick}>Подтвердить</SubmitButton>
                </div>
            </Form>
        </FormContainer>
    )
}