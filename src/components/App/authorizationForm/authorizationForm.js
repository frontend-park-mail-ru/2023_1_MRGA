import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {Tinder} from "@/api/api";
import {Form} from "components/UI/forms/form/form";
import logoMini from "assets/LogoMini.svg";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {PasswordInput} from "components/UI/forms/passwordInput/passwordInput";
import {Warning} from "components/UI/forms/warning/warning";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";

export const AuthorizationForm = () => {
    const login = useRef();
    const password = useRef();
    const error = useRef();
    const authClick = async (e) => {
        e.preventDefault();
        error.getValue().innerHTML = "";
        try {
            const resp = await Tinder.login({"password": password.getValue().value, "email": login.getValue().value});
            const json = await resp.json();

            if (json.status !== 200) {
                if (json.error.toString().includes("record not found")) {
                    error.getValue().innerHTML = "Не существует пользователя с такой почтой";
                } else if (json.error.toString().includes("hashedPassword is not the hash of the given password")) {
                    error.getValue().innerHTML = "Неправильный логин или пароль";
                } else {
                    error.getValue().innerHTML = json.error;
                }
                return;
            }
            Navigate({to: "/"});
        } catch (e) {
            alert(e);
        }
    };

    return (
        <FormContainer>
            <Form>
                <img src={logoMini} alt="logoMini" width={46}/>
                <InputWithLabel
                    name={"email"}
                    id={"login"}
                    type={"text"}
                    placeholder={"123@mail.ru"}
                    labelText={"Почта"}
                    ref={login}
                    required={true}
                />
                <PasswordInput
                    id='pass'
                    placeholder={"Введите пароль"}
                    labelText='Пароль'
                    ref={password}
                />
                <Warning ref={error}></Warning>
                <SubmitButton onClick={authClick}>войти</SubmitButton>
            </Form>
        </FormContainer>
    );
};
