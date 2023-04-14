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
    const mainPhoto = useRef();
    const mainPhotoWarning = useRef();
    const photo2 = useRef();
    const photo3 = useRef();
    const photo4 = useRef();
    const photo5 = useRef();
    const submitButton = useRef();
    const warning = useRef();
    
    const onMainPhotoInputChange = () => {
        let n = mainPhoto.getValue().files.length;
        if (n === 0) {
            mainPhotoWarning.getValue().innerHTML = 'Главная фотография обязательна';
            return false;
        } else {
            mainPhotoWarning.getValue().innerHTML = '';
            return true;
        }
    }

    const allChecks = () => {
        return onMainPhotoInputChange();
    }

    const onSubmitClick = async (e) => {
        e.preventDefault();
        if (!allChecks()) {
            return;
        }

        try {
            let mainFile = mainPhoto.getValue().files[0];
            let file2 = photo2.getValue().files;
            let file3 = photo3.getValue().files;
            let file4 = photo4.getValue().files;
            let file5 = photo5.getValue().files;

            const formData = new FormData();
            formData.append('files[]', mainFile);
            if (file2.length !== 0) {
                formData.append('files[]', file2[0]);
            }
            if (file3.length !== 0) {
                formData.append('files[]', file3[0]);
            }
            if (file4.length !== 0) {
                formData.append('files[]', file4[0]);
            }
            if (file5.length !== 0) {
                formData.append('files[]', file5[0]);
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
                    id={"mainPhoto"}
                    labelText={"Attach Main photo"}
                    required={true}
                    name={"mainPhoto"}
                    ref={mainPhoto}
                    onChange={onMainPhotoInputChange}
                    type="file"
                    accept="image/jpeg,image/png"/>
                <Warning
                    ref={mainPhotoWarning}
                    title={"Главная фотография должна быть прикреплена"}
                />
                <InputWithLabel
                    id={"photo2"}
                    labelText={"Attach other photo"}
                    name={"photo2"}
                    ref={photo2}
                    type="file"
                    accept="image/jpeg,image/png"/>
                <InputWithLabel
                    id={"photo3"}
                    labelText={"Attach other photo"}
                    name={"photo3"}
                    ref={photo3}
                    type="file"
                    accept="image/jpeg,image/png"/>
                <InputWithLabel
                    id={"photo4"}
                    labelText={"Attach other photo"}
                    name={"photo4"}
                    ref={photo4}
                    type="file"
                    accept="image/jpeg,image/png"/>
                <InputWithLabel
                    id={"photo5"}
                    labelText={"Attach other photo"}
                    name={"photo5"}
                    ref={photo5}
                    type="file"
                    accept="image/jpeg,image/png"/>
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
