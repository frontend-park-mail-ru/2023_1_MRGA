import {Form} from "components/UI/forms/form/form";
import logoMini from "assets/LogoMini.svg";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {Label} from "components/UI/forms/label/label";
import {Select} from "components/UI/forms/select/select";
import {Warning} from "components/UI/forms/warning/warning";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import {useRef} from "@/lib/jsx/hooks/useRef";
import {Tinder} from "@/api/api";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";

export const PhotoForm = () => {
    const photo = useRef();
    const photoWarning = useRef();
    const submitButton = useRef();
    const warning = useRef();
    
    const onPhotoInputChange = () => {
        let n = photo.getValue().files.length;
        if (n === 0) {
            photoWarning.getValue().innerHTML = 'Вы не прикрепили фотографию';
            return false;
        } else if (n > 5) {
            photoWarning.getValue().innerHTML = 'Прикрепите не более 5 фотографий';
            return false;
        } else {
            photoWarning.getValue().innerHTML = '';
            return true;
        }
    }

    const allChecks = () => {
        return onPhotoInputChange();
    }

    const onSubmitClick = async (e) => {
        e.preventDefault();
        if (!allChecks()) {
            return;
        }

        try {
            let files = photo.getValue().files;

            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('files[]', files[i]);
            }

            const respPhotoUser = await Tinder.postPhotos(formData);

            const jsonPhotoUser = await respPhotoUser.json()
            if (jsonPhotoUser.status !== 200) {
                warning.getValue().innerHTML = jsonPhotoUser.error;
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
                <InputWithLabel
                    id={"photo"}
                    labelText={"Attach photos"}
                    required={true}
                    name={"photo[]"}
                    ref={photo}
                    onChange={onPhotoInputChange}
                    type="file" 
                    multiple/>
                <Warning
                    ref={photoWarning}
                    title={"фотография должна быть прикреплена"}
                />
                <SubmitButton
                    ref={submitButton}
                    onClick={onSubmitClick}
                >
                    зарегистрироваться
                </SubmitButton>
                <Warning
                    ref={warning}
                />
            </Form>
        </FormContainer>
    )
}
