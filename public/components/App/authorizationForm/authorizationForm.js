import {useRef} from "@/lib/jsx/hooks/useRef";
import {Tinder} from "@/api/api";
import {Form} from "components/UI/forms/form/form";
import logoMini from "assets/LogoMini.svg";
import styles from "components/App/authorizationForm/authorizationForm.module.css";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {PasswordInput} from "components/UI/forms/passwordInput/passwordInput";
import {Warning} from "components/UI/forms/warning/warning";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";
import {cityStore} from "@/store/interviewInfo";
import {routes} from "@/router/router";
import {useState} from "@/lib/jsx/hooks/useState";

export const AuthorizationForm = () => {
    const [state, setState] = useState(4);

    const login = useRef();
    const password = useRef();
    const error = useRef();
    const authClick = async (e) => {
        e.preventDefault()
        error.getValue().innerHTML = '';
        try {
            const resp = await Tinder.login({"password": password.getValue().value, "email": login.getValue().value})
            const json = await resp.json()

            if (json.status !== 200) {
                error.getValue().innerHTML = json.err;
                return
            }
            const currentPath = window.location.pathname;
            routes = routes.filter((route) => {
                return route.path !== "/login";
            })
            // routes = routes.filter((route) => {
            //     return route.path !== "/signup  ";
            // })
            Navigate({to: "/"});
        } catch (e) {
            alert(e)
        }
    }
    return (
        <FormContainer>
            <Form>
                <div onClick={setState.bind(null, state+1)}>{state.toString()}</div>
                <img src={logoMini} alt="logoMini" width={46}/>
                <span className={styles.inviteText}>
                    <p>Введите ваши данные</p>
                </span>
                <InputWithLabel
                    name={"email"}
                    id={"login"}
                    type={"text"}
                    placeholder={"123@mail.ru"}
                    labelText={"Почта или login"}
                    ref={login}
                    required={true}
                />
                <PasswordInput 
                    id='pass' 
                    placeholder={"Введите пароль"} 
                    labelText='Password' 
                    ref={password}
                />
                <Warning ref={error}></Warning>
                <SubmitButton onClick={authClick}>войти</SubmitButton>
            </Form>
        </FormContainer>
    )
}