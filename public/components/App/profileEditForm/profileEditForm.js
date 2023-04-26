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

export const ProfileEditForm = () => {
    const user = getUser();

    const description = useRef();

    const onDescriptionChange = () => {
        console.log(description.getValue().value.length);
    }
    // console.log(user);
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
                        onInput={onDescriptionChange}
                    />
                    <Label labelText={"Фотографии профиля"}/>
                    <PhotoEditInputs/>
                </Form>
            </FormContainer>
    )
}