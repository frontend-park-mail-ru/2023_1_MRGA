import {Header} from "components/App/header/header";
import {createElement} from "@/lib/jsx";

// import {RegistrationForm} from "components/App/registrationForm/registrationForm";

export const InterviewPage = () => {
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
    return (
        <>
            <Header/>
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
        </>
    )
}