import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {getUser} from "@/store/user";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import {Form} from "components/UI/forms/form/form";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {TextAreaWithLabel} from "components/UI/forms/textareaWithLabel/textareaWithLabel";

import styles from './profileEditForm.module.css'
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {PhotoEditInputs} from "components/App/profileEditForm/PhotoEditInputs/PhotoEditInputs";
import {Tinder} from "@/api/api";
import {FiltersEditInputs} from "components/App/profileEditForm/ReasonEditInputs/filtersEditInputs";

export const ProfileEditForm = () => {
    const user = getUser();

    const description = useRef();

    const email = useRef();

    const job = useRef();

    const education = useRef();

    const city = useRef();

    const zodiac = useRef();
    const onDescriptionChange = (e) => {
        e.preventDefault();
        userData.description = description.getValue().value;
        userData.ciry = city.getValue().value;
        Tinder.putInfoUser(userData);
    }
    let userData;
    const loadUserData = async () => {

        userData = (await (await Tinder.getInfoUser()).json()).body;

        description.getValue().value = userData.description;
        email.getValue().value = userData.email;
        job.getValue().value = userData.job;
        education.getValue().value = userData.education;
        city.getValue().value = userData.city;
        zodiac.getValue().value = userData.zodiac;
    }
    loadUserData().then();
    return (
            <FormContainer>
                <Form>
                    {/*TODO: сделать верстку всех инпутов через цикл*/}
                    <InputWithLabel
                        type={"text"}
                        value={user.name}
                        labelText={"Имя"}
                        readOnly={true}
                    />
                    <InputWithLabel
                        type={"number"}
                        value={user.age}
                        labelText={"Возраст"}
                        readOnly={true}
                    />
                    <InputWithLabel
                        type={"email"}
                        labelText={"Почта"}
                        ref={email}
                        readOnly={true}
                    />
                    <InputWithLabel
                        type={"text"}
                        labelText={"Город"}
                        ref={city}
                        readOnly={true}
                    />
                    <InputWithLabel
                        type={"text"}
                        labelText={"Работа"}
                        ref={job}
                        readOnly={true}
                    />
                    <InputWithLabel
                        type={"text"}
                        labelText={"Образование"}
                        ref={education}
                        readOnly={true}
                    />
                    <InputWithLabel
                        type={"text"}
                        labelText={"Знак зодиака"}
                        ref={zodiac}
                        readOnly={true}
                    />
                    <TextAreaWithLabel
                        className={styles.textArea}
                        name={"description"}
                        placeholder={"Я живу в Мытищах ;)"}
                        labelText={"Описание профиля"}
                        ref={description}
                    />
                    <SubmitButton onClick={onDescriptionChange}>Изменить описание</SubmitButton>
                    <PhotoEditInputs/>
                    <FiltersEditInputs/>
                </Form>
            </FormContainer>
    )
}
