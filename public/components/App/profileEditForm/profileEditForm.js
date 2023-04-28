import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {getUser} from "@/store/user";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import {Form} from "components/UI/forms/form/form";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {TextAreaWithLabel} from "components/UI/forms/textareaWithLabel/textareaWithLabel";

import styles from './profileEditForm.module.css'
import {useRef} from "@/lib/jsx/hooks/useRef";
import {PhotoForm} from "components/App/photoForm/photoForm";
import {PhotoEditInputs} from "components/App/profileEditForm/PhotoEditInputs/PhotoEditInputs";
import {Label} from "components/UI/forms/label/label";
import {Tinder} from "@/api/api";

export const ProfileEditForm = () => {
    const user = getUser();

    const description = useRef();

    const onDescriptionChange = (e) => {
        e.preventDefault();
        // console.log(description.getValue().value.length);
        userData.description = description.getValue().value;
        Tinder.putInfoUser(userData);
    }
    let userData;
    const loadUserData = async () => {

        userData = (await (await Tinder.getInfoUser()).json()).body;
        // console.log(userData);
        description.getValue().value = userData.description;
    }

    loadUserData().then();
    return (
            <FormContainer>
                <Form>
                    <InputWithLabel
                        name={"name"}
                        id={"name"}
                        type={"text"}
                        value={user.name}
                        labelText={"Имя"}
                        readOnly={true}
                    />
                    <InputWithLabel
                        name={"age"}
                        id={"age"}
                        type={"number"}
                        value={user.age}
                        labelText={"Возраст"}
                        readOnly={true}
                    />
                    <TextAreaWithLabel
                        className={styles.textArea}
                        name={"description"}
                        placeholder={"Я живу в Мытищах ;)"}
                        labelText={"Описание профиля"}
                        ref={description}
                    />
                    {/*<SubmitButton onClick={onDescriptionChange}>изменить описание</SubmitButton>*/}
                    <PhotoEditInputs/>
                </Form>
            </FormContainer>
    )
}