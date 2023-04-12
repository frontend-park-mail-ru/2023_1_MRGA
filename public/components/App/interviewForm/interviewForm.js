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

export const InterviewForm = () => {
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
    const warning = useRef();

    const onJobInputChange = () => {
        if (sex.getValue().value === 'не выбрано') {
            sexWarning.getValue().innerHTML = 'Вы не выбрали работу';
        } else {
            sexWarning.getValue().innerHTML = '';
        }
    }

    const onCityInputChange = () => {
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

    const onDescriptionInputChange = () => {
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

    const onNameInputChange = () => {
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
        onJobInputChange();
        onCityInputChange();
        onNameInputChange();
        onEducationInputChange();
        onDescriptionInputChange();
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
            const respInfoUser = await Tinder.infoUser({
                "name": name.getValue().value,
                "city": city.getValue().value,
                "job": job.getValue().value,
                "education": education.getValue().value,
                "sex": sex.getValue().value,
                "zodiac": zodiac.getValue().value,
                "description": description.getValue().value,
            })
            const jsonInfoUser = await respInfoUser.json()
            if (jsonInfoUser.status !== 200) {
                warning.getValue().innerHTML = jsonInfoUser.error;
                return
            }

            Navigate({to:'/'});
        } catch (e) {
            alert(e);
        }
    }
    const respCities = async () => {
        let resp = await Tinder.getCities();
        let json = await resp.json();
        if (json.status !== 200) {
            warning.getValue().innerHTML = json.error;
            return;
        }
        return json.body.cities;
    }
    const respZodiac = async () => {
        let resp = await Tinder.getZodia();
        let json = await resp.json();
        if (json.status !== 200) {
            warning.getValue().innerHTML = json.error;
            return;
        }
        return json.body.zodiac;
    }
    const respJob = async () => {
        let resp = await Tinder.getJob();
        let json = await resp.json();
        if (json.status !== 200) {
            warning.getValue().innerHTML = json.error;
            return;
        }
        return json.body.jobs;
    }
    const respEducation = async () => {
        let resp = await Tinder.getEducation();
        let json = await resp.json();
        if (json.status !== 200) {
            warning.getValue().innerHTML = json.error;
            return;
        }
        return json.body.education;
    }
    return(
        <FormContainer>
            <Form>
                <img src={logoMini} width="46" alt={"logo"}/>
                <InputWithLabel
                    name={"name"}
                    id={"name"}
                    type={"text"}
                    placeholder={"Хасбулат"}
                    labelText={"Name"}
                    ref={name}
                    required={true}
                    onChange={onNameInputChange}
                />
                <Warning
                    ref={nameWarning}
                    title={"http://ru.wikipedia.org/wiki/Адрес%20электронной%20почты"}
                />
                <span>
                   <Label labelText={"Sex"} htmlFor={"sex"}/>
                   <Select
                       arrayOptions={["не выбрано", "М", "Ж"]}
                       id={"sex"}
                       required={true}
                       name={"sex"}
                       ref={sex}
                       onChange={onSexInputChange}
                   >
                   </Select>
                </span>
                <Warning
                   ref={sexWarning}
                   title={"пол должен быть выбран"}
                />
                <span>
                   <Label labelText={"City"} htmlFor={"city"}/>
                   <Select
                       arrayOptions={respCities}
                       id={"city"}
                       required={true}
                       name={"city"}
                       ref={city}
                       onChange={onCityInputChange}
                   >
                   </Select>
                </span>
                <Warning
                   ref={cityWarning}
                   title={"город должен быть выбран"}
                />
                <span>
                   <Label labelText={"Zodiac"} htmlFor={"zodiac"}/>
                   <Select
                       arrayOptions={respZodiac}
                       id={"zodiac"}
                       required={true}
                       name={"zodiac"}
                       ref={zodiac}
                       onChange={onZodiacInputChange}
                   >
                   </Select>
                </span>
                <Warning
                   ref={zodiacWarning}
                   title={"знак зодиака должен быть выбран"}
                />
                <InputWithLabel
                    name={"description"}
                    id={"description"}
                    type={"text"}
                    placeholder={"Я живу в Москве ;)"}
                    labelText={"Описание"}
                    ref={description}
                    required={true}
                    onChange={onDescriptionInputChange}
                />
                <Warning
                    ref={descriptionWarning}
                    title={"описание должно быть заполнено и не более 300 символов"}
                />
                <span>
                   <Label labelText={"Job"} htmlFor={"job"}/>
                   <Select
                       arrayOptions={respJob}
                       id={"job"}
                       required={true}
                       name={"job"}
                       ref={job}
                       onChange={onJobInputChange}
                   >
                   </Select>
                </span>
                <Warning
                   ref={jobWarning}
                   title={"работа должна быть быть выбран"}
                />
                <span>
                   <Label labelText={"Education"} htmlFor={"education"}/>
                   <Select
                       arrayOptions={respEducation}
                       id={"education"}
                       required={true}
                       name={"education"}
                       ref={education}
                       onChange={onEducationInputChange}
                   >
                   </Select>
                </span>
                <Warning
                   ref={educationWarning}
                   title={"Образование должно быть выбрано"}
                />
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