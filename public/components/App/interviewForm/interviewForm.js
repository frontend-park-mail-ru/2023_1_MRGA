import {Form} from "components/UI/forms/form/form";
import logoMini from "assets/LogoMini.svg";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {Label} from "components/UI/forms/label/label";
import {Select} from "components/UI/forms/select/select";
import {PasswordInput} from "components/UI/forms/passwordInput/passwordInput";
import {Warning} from "components/UI/forms/warning/warning";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import {useRef} from "@/lib/jsx/hooks/useRef";
import {validateName} from "@/lib/validators";
import {Tinder} from "@/api/api";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";


const nameValidationInfo = `
    Nickname должен начинаться с буков a-z (в любом регистре), цифры 0-9, символа подчеркивания (_) или дефиса (-),
может содержать только буквы a-z (в любом регистре), цифры 0-9, символ подчеркивания (_) или дефис (-),
иметь длину от 3 до 16 символов
`

export const RegistrationForm = () => {
    const name = useRef();
    const nameWarning = useRef();
    const sex = useRef();
    const sexWarning = useRef();
    const job = useRef();
    const jobWarning = useRef();
    const education = useRef();
    const educationWarning = useRef();
    const zodiac = useRef();
    const zodiacWarning = useRef();
    const city = useRef();
    const cityWarning = useRef();
    const description = useRef();
    const descriptionWarning = useRef();
    const submitButton = useRef();

    const onJobChange = () => {
        if (sex.getValue().value === 'не выбрано') {
            sexWarning.getValue().innerHTML = 'Вы не выбрали работу';
        } else {
            sexWarning.getValue().innerHTML = '';
        }
    }

    const onCityChange = () => {
        if (sex.getValue().value === 'не выбрано') {
            sexWarning.getValue().innerHTML = 'Вы не выбрали город';
        } else {
            sexWarning.getValue().innerHTML = '';
        }
    }

    const onEducationInputChange = () => {
        if (sex.getValue().value === 'не выбрано') {
            sexWarning.getValue().innerHTML = 'Вы не выбрали образование';
        } else {
            sexWarning.getValue().innerHTML = '';
        }
    }

    const onDescriptionChange = () => {
        const nameText = name.getValue().value;
        if (nameText === "") {
            nameWarning.getValue().innerHTML = 'Некорректное описание';
        } else {
            nameWarning.getValue().innerHTML = '';
        }
    }

    const onZodiacInputChange = () => {
        if (sex.getValue().value === 'не выбрано') {
            sexWarning.getValue().innerHTML = 'Вы не выбрали знак зодиака';
        } else {
            sexWarning.getValue().innerHTML = '';
        }
    }

    const onNameChange = () => {
        const nameText = name.getValue().value;
        const isValid = validateName(nameText);
        if (!isValid) {
            nameWarning.getValue().innerHTML = 'Некорректное имя';
        } else {
            nameWarning.getValue().innerHTML = '';
        }
    }

    const onSexInputChange = () => {
        if (sex.getValue().value === 'не выбрано') {
            sexWarning.getValue().innerHTML = 'Вы не выбрали пол';
        } else {
            sexWarning.getValue().innerHTML = '';
        }
    }
    const allChecks = () => {
        onJobChange();
        onCityChange();
        onNameChange();
        onEducationInputChange();
        onDescriptionChange();
        onZodiacInputChange();
        onSexInputChange();
    }
    const isValidForm = () => {
        const cityError = cityWarning.getValue().innerText === '';
        const jobError = jobWarning.getValue().innerText === '';
        const educationError = educationWarning.getValue().innerText === '';
        const descriptionError = descriptionWarning.getValue().innerText === '';
        const zodiacError = zodiacWarning.getValue().innerText === '';
        const nameError = nameWarning.getValue().innerText === '';
        const sexError = sexWarning.getValue().innerText === '';
        return (
            cityError && jobError &&
            educationError && descriptionError &&
            zodiacError && nameError && sexError
        )
    }
    const onSubmitClick = async (e) => {
        e.preventDefault();
        allChecks();
        if (!isValidForm()) {
            return ;
        }
        try {
            const resp = await Tinder.registration({
                "email": email.getValue().value,
                "birthDay": `${2023-age.getValue().valueAsNumber}-01-01`,
                // "username": nickname.getValue().value,
                // "age": age.getValue().valueAsNumber,
                // "sex": sex.getValue().value,
                "password": password.getValue().value,
            })
            const json = await resp.json()
            if (json.status !== 200) {
                warning.getValue().innerHTML = json.error;
                return
            }
            Navigate({to:'/interview'});
        } catch (e) {
            alert(e);
        }
    }
    return(
        <FormContainer>
            <Form>
                <img src={logoMini} width="46" alt={"logo"}/>
                <InputWithLabel
                    name={"email"}
                    id={"email"}
                    type={"text"}
                    placeholder={"123@mail.ru"}
                    labelText={"Email Address"}
                    ref={email}
                    required={true}
                    onChange={onEmailChange}
                    // ref={login}
                />
                <Warning
                    ref={emailWarning}
                    title={"http://ru.wikipedia.org/wiki/Адрес%20электронной%20почты"}
                />
                {/*<InputWithLabel*/}
                {/*    name={"nickname"}*/}
                {/*    id={"login"}*/}
                {/*    type={"text"}*/}
                {/*    placeholder={"yakwilik"}*/}
                {/*    labelText={"Nickname"}*/}
                {/*    required={true}*/}
                {/*    onChange={onNicknameChange}*/}
                {/*    ref={nickname}*/}
                {/*/>*/}
                {/*<Warning*/}
                {/*    ref={nicknameWarning}*/}
                {/*    title={nicknameValidationInfo}*/}
                {/*/>*/}
                <InputWithLabel
                    name={"age"}
                    id={"age"}
                    type={"number"}
                    placeholder={"18"}
                    labelText={"Age"}
                    required={true}
                    min={"18"}
                    onChange={onAgeInputChange}
                    ref={age}
                />
                <Warning
                    ref={ageWarning}
                    title={"возраст должен быть больше или равен 18"}
                />
                {/*<span>*/}
                {/*    <Label labelText={"Sex"} htmlFor={"sex"}/>*/}
                {/*    <Select*/}
                {/*        id={"sex"}*/}
                {/*        required={true}*/}
                {/*        name={"sex"}*/}
                {/*        ref={sex}*/}
                {/*        onChange={onSexInputChange}*/}
                {/*    >*/}
                {/*        <option>не выбрано</option>*/}
                {/*        <option>М</option>*/}
                {/*        <option>Ж</option>*/}
                {/*    </Select>*/}
                {/*</span>*/}
                {/*<Warning*/}
                {/*    ref={sexWarning}*/}
                {/*    title={"возраст должен быть больше или равен 18"}*/}
                {/*/>*/}
                <PasswordInput
                    id="pass1"
                    labelText="Password"
                    placeholder={"Ваш пароль"}
                    ref={password}
                    required={true}
                    onChange={onPasswordInputChange}
                />
                <PasswordInput
                    id="pass2"
                    labelText="Password repeat"
                    placeholder={"повторите Ваш пароль"}
                    required={true}
                    ref={passwordRepeat}
                    onChange={onPasswordInputChange}
                />
                <Warning ref={warning}></Warning>
                <SubmitButton
                    ref={submitButton}
                    onClick={onSubmitClick}
                >
                    зарегистрироваться
                </SubmitButton>
            </Form>
        </FormContainer>
    )
}