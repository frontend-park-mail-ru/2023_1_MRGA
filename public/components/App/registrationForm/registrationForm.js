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
import {validateEmail, validatePassword} from "@/lib/validators";
import {Tinder} from "@/api/api";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";
import {rootRender} from "@/lib/jsx";
import {InterviewPage} from "components/App/pages/registration/interview/interview";


const nicknameValidationInfo = `
    Nickname должен начинаться с буков a-z (в любом регистре), цифры 0-9, символа подчеркивания (_) или дефиса (-),
может содержать только буквы a-z (в любом регистре), цифры 0-9, символ подчеркивания (_) или дефис (-),
иметь длину от 3 до 16 символов
`

export const RegistrationForm = () => {
    const email = useRef();
    const emailWarning = useRef();
    const age = useRef();
    const ageWarning = useRef();
    const password = useRef();
    const passwordRepeat = useRef();
    const warning = useRef();
    const submitButton = useRef();


    const onPasswordInputChange = () => {
        const passwordText = password.getValue().value;
        const passwordRepeatText = passwordRepeat.getValue().value;
        const {valid, message} = validatePassword(passwordText);
        if (passwordText === '') {
            warning.getValue().innerText = '';
        } else if (!valid) {
            warning.getValue().innerHTML = message;
        } else if (passwordRepeatText === '') {
            warning.getValue().innerText = '';
        } else if (passwordRepeatText !== '') {
            onPasswordRepeatChange();
        } else {
            warning.getValue().innerText = '';
        }
    }
    const onPasswordRepeatChange = () => {
        const passwordText = password.getValue().value;
        const passwordRepeatText = passwordRepeat.getValue().value;
        const {valid, message} = validatePassword(passwordText);
        if (!valid) {
            warning.getValue().innerHTML = message;
        } else if (passwordText !== passwordRepeatText) {
            warning.getValue().innerHTML = 'Пароли не совпадают';
        } else {
            warning.getValue().innerHTML = '';
        }
    }
    const onEmailChange = () => {
        const emailText = email.getValue().value;
        const isValid = validateEmail(emailText);
        if (!isValid) {
            emailWarning.getValue().innerHTML = 'Некорректный email-адрес';
        } else {
            emailWarning.getValue().innerHTML = '';
        }
    }
    const onAgeInputChange = () => {
        const ageNumber = age.getValue().valueAsNumber;
        if (ageNumber < 18 && ageNumber >= 0) {
            ageWarning.getValue().innerHTML = 'Возраст должен быть больше или равен 18';
        } else if (ageNumber < 0) {
            ageWarning.getValue().innerHTML = 'Некорректный возраст';
        } else if (isNaN(ageNumber)) {
            ageWarning.getValue().innerHTML = 'Введите возраст';
        } else {
            ageWarning.getValue().innerHTML = '';
        }
    }
    const allChecks = () => {
        onPasswordInputChange();
        onEmailChange();
        //onNicknameChange();
        onAgeInputChange();
        //onSexInputChange();
        onPasswordRepeatChange();
    }
    const isValidForm = () => {
        const emailError = emailWarning.getValue().innerText === '';
        //const nicknameError = nicknameWarning.getValue().innerText === '';
        const ageError = ageWarning.getValue().innerText === '';
        //const sexError = sexWarning.getValue().innerText === '';
        const passwordError = warning.getValue().innerText === '';
        return (
            emailError  &&
            ageError  && passwordError
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
                "password": password.getValue().value,
            })
            const json = await resp.json()
            if (json.status !== 200) {
                warning.getValue().innerHTML = json.error;
                return
            }
            rootRender(<InterviewPage/>);
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