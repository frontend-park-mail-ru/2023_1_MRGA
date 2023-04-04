import {Form} from "components/UI/forms/form/form";
import logoMini from "assets/LogoMini.svg";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {Label} from "components/UI/forms/label/label";
import {Select} from "components/UI/forms/select/select";
import {PasswordInput} from "components/UI/forms/passwordInput/passwordInput";
import {Warning} from "components/UI/forms/warning/warning";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";

export const RegistrationForm = () => {
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
                    required={true}
                    // ref={login}
                />
                <InputWithLabel
                    name={"nickname"}
                    id={"login"}
                    type={"text"}
                    placeholder={"yakwilik"}
                    labelText={"Nickname"}
                    required={true}
                    // ref={login}
                />
                <InputWithLabel
                    name={"age"}
                    id={"age"}
                    type={"number"}
                    placeholder={"18"}
                    labelText={"Age"}
                    required={true}
                    min={"18"}
                    // ref={login}
                />
                <span>
                    <Label labelText={"Sex"} htmlFor={"swx"}/>
                    <Select id={"sex"} required={true} name={"sex"}>
                        <option>не выбрано</option>
                        <option>М</option>
                        <option>Ж</option>
                    </Select>
                </span>
                <PasswordInput id="pass1" labelText="Password" placeholder={"Ваш пароль"}/>
                <PasswordInput id="pass2" labelText="Password repeat" placeholder={"повторите Ваш пароль"}/>
                <Warning></Warning>
                <SubmitButton>зарегистрироваться</SubmitButton>
            </Form>
        </FormContainer>
    )
}