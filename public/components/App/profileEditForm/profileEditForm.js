import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {getUser} from "@/store/user";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import {Form} from "components/UI/forms/form/form";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {TextAreaWithLabel} from "components/UI/forms/textareaWithLabel/textareaWithLabel";

import styles from './profileEditForm.module.css'
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {PhotoForm} from "components/App/photoForm/photoForm";
import {PhotoEditInputs} from "components/App/profileEditForm/PhotoEditInputs/PhotoEditInputs";
import {Label} from "components/UI/forms/label/label";
import {Tinder} from "@/api/api";
import {TestComponent} from "@/lib/jsx/components/testComponent/testComponent";
import {useState} from "@/lib/jsx/hooks/useState/useState";
import {FiltersEditInputs} from "components/App/profileEditForm/ReasonEditInputs/filtersEditInputs";

export const ProfileEditForm = () => {
    const user = getUser();

    const description = useRef();

    const email = useRef();

    const job = useRef();

    const education = useRef();

    const city = useRef();


    const onDescriptionChange = (e) => {
        e.preventDefault();
        userData.description = description.getValue().value;
        userData.ciry = city.getValue().value;
        Tinder.putInfoUser(userData);
    }
    let userData;
    const loadUserData = async () => {

        userData = (await (await Tinder.getInfoUser()).json()).body;
        console.log(userData);
        description.getValue().value = userData.description;
        email.getValue().value = userData.email;
        job.getValue().value = userData.job;
        education.getValue().value = userData.education;
        city.getValue().value = userData.city;
    }
    const [state, setState] = useState(0);

    loadUserData().then();
    return (
            <FormContainer>
                <Form>
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
                        labelText={"почта"}
                        ref={email}
                        readOnly={true}
                    />
                    <InputWithLabel
                        type={"text"}
                        labelText={"город"}
                        ref={city}
                        readOnly={true}
                    />
                    <InputWithLabel
                        type={"text"}
                        labelText={"работа"}
                        ref={job}
                        readOnly={true}
                    />
                    <InputWithLabel
                        type={"text"}
                        labelText={"образование"}
                        ref={education}
                        readOnly={true}
                    />
                    <TextAreaWithLabel
                        className={styles.textArea}
                        name={"description"}
                        placeholder={"Я живу в Мытищах ;)"}
                        labelText={"Описание профиля"}
                        ref={description}
                    />
                    <SubmitButton onClick={onDescriptionChange}>изменить описание</SubmitButton>
                    <PhotoEditInputs/>
                    <FiltersEditInputs/>
                </Form>
            </FormContainer>
    )
}