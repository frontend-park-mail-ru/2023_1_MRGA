import {Form} from "components/UI/forms/form/form";
import logoMini from "assets/LogoMini.svg";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {Label} from "components/UI/forms/label/label";
import {Select} from "components/UI/forms/select/select";
import {Warning} from "components/UI/forms/warning/warning";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {validateName} from "@/lib/validators";
import {Tinder} from "@/api/api";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";
import {rootRender} from "@/lib/jsx";
import {HashTagsPage} from "components/App/pages/registration/hashTags/hashTags";

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
        if (job.getValue().value === 'не выбрано') {
            jobWarning.getValue().innerHTML = 'Вы не выбрали работу';
            return false;
        } else {
            jobWarning.getValue().innerHTML = '';
            return true;
        }
    }

    const onCityInputChange = () => {
        if (city.getValue().value === 'не выбрано') {
            cityWarning.getValue().innerHTML = 'Вы не выбрали город';
            return false;
        } else {
            cityWarning.getValue().innerHTML = '';
            return true;
        }
    }

    const onEducationInputChange = () => {
        if (education.getValue().value === 'не выбрано') {
            educationWarning.getValue().innerHTML = 'Вы не выбрали образование';
            return false;
        } else {
            educationWarning.getValue().innerHTML = '';
            return true;
        }
    }

    const onDescriptionInputChange = () => {
        const descriptionText = name.getValue().value;
        if (descriptionText === "") {
           descriptionWarning.getValue().innerHTML = 'Некорректное описание';
           return false;
        } else {
            descriptionWarning.getValue().innerHTML = '';
            return true;
        }
    }

    const onZodiacInputChange = () => {
        if (zodiac.getValue().value === 'не выбрано') {
            zodiacWarning.getValue().innerHTML = 'Вы не выбрали знак зодиака';
            return false;
        } else {
            zodiacWarning.getValue().innerHTML = '';
            return true;
        }
    }

    const onNameInputChange = () => {
        const nameText = name.getValue().value;
        const isValid = validateName(nameText);
        if (!isValid) {
            nameWarning.getValue().innerHTML = 'Некорректное имя';
            return false;
        } else {
            nameWarning.getValue().innerHTML = '';
            return true;
        }
    }

    const onSexInputChange = () => {
        if (sex.getValue().value === 'не выбрано') {
            sexWarning.getValue().innerHTML = 'Вы не выбрали пол';
            return false;
        } else {
            sexWarning.getValue().innerHTML = '';
            return true;
        }
    }

    const allChecks = () => {
        return onJobInputChange() &&
        onCityInputChange() &&
        onNameInputChange() &&
        onEducationInputChange() &&
        onDescriptionInputChange() && 
        onZodiacInputChange() &&
        onSexInputChange();
    }

    const onSubmitClick = async (e) => {
        e.preventDefault();
        if (!allChecks()) {
            return;
        }
        try {
            let obj = {
                "name": name.getValue().value,
                "city": city.getValue().value,
                "job": job.getValue().value,
                "education": education.getValue().value,
                "sex": sex.getValue().value,
                "zodiac": zodiac.getValue().value,
                "description": description.getValue().value,
            }
            const respInfoUser = await Tinder.infoUser(obj);
            const jsonInfoUser = await respInfoUser.json()
            if (jsonInfoUser.status !== 200) {
                warning.getValue().innerHTML = jsonInfoUser.error;
                return
            }
            rootRender(<HashTagsPage/>)
        } catch (e) {
            alert(e);
        }
    }

    const setOptions = (id, arrOptions) => {
        let select = document.querySelector(`#${id}`);
        arrOptions.forEach(item => {
            let option = document.createElement("option");
            option.label = item;
            option.text = item;
            select.appendChild(option);
        });
    }

    const respCitiesFunc = async () => {
        const resp = await Tinder.getCities();
        let json = await resp.json();
        if (json.status !== 200) {
            warning.getValue().innerHTML = json.error;
            return;
        }
        setOptions("city", json.body.cities);
    }
   respCitiesFunc();

    const respZodiacFunc = async () => {
        let resp = await Tinder.getZodiac();
        let json = await resp.json();
        if (json.status !== 200) {
            warning.getValue().innerHTML = json.error;
            return;
        }
        setOptions("zodiac", json.body.zodiac);
    }
    respZodiacFunc();

    const respJobFunc = async () => {
        let resp = await Tinder.getJob();
        let json = await resp.json();
        if (json.status !== 200) {
            warning.getValue().innerHTML = json.error;
            return;
        }
        setOptions("job", json.body.jobs);
    }
    respJobFunc();

    const respEducationFunc = async () => {
        let resp = await Tinder.getEducation();
        let json = await resp.json();
        if (json.status !== 200) {
            warning.getValue().innerHTML = json.error;
            return;
        }
        setOptions("education", json.body.education);
    }
    respEducationFunc();

    return  (
        <FormContainer>
            <Form>
                <img src={logoMini} width="46" alt={"logo"}/>
                <InputWithLabel
                    name={"name"}
                    id={"name"}
                    type={"text"}
                    placeholder={"Женя"}
                    labelText={"Имя"}
                    ref={name}
                    required={true}
                    onChange={onNameInputChange}
                />
                <Warning
                    ref={nameWarning}
                    title={"http://ru.wikipedia.org/wiki/Адрес%20электронной%20почты"}
                />
                <span>
                   <Label labelText={"Пол"} htmlFor={"sex"}/>
                    <Select
                        id={"sex"}
                        required={true}
                        name={"sex"}
                        ref={sex}
                        onchange={onSexInputChange}
                    >{["не выбрано", "М", "Ж"].map(option => <option>{option}</option>)}</Select>
                </span>
                <Warning
                    ref={sexWarning}
                    title={"Необходимо выбрать пол"}
                />
                <span>
                   <Label labelText={"Город"} htmlFor={"city"}/>
                    <Select
                        id={"city"}
                        required={true}
                        name={"city"}
                        ref={city}
                        onchange={onCityInputChange}
                    >
                        <option>не выбрано</option>
                    </Select>
                </span>
                <Warning
                    ref={cityWarning}
                    title={"город должен быть выбран"}
                />
                <span>
                   <Label labelText={"Знак зодиака"} htmlFor={"zodiac"}/>
                   <Select
                       id={"zodiac"}
                       required={true}
                       name={"zodiac"}
                       ref={zodiac}
                       onchange={onZodiacInputChange}
                   >
                    <option>не выбрано</option>
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
                    placeholder={"Я живу в Мытищах ;)"}
                    labelText={"Описание профиля"}
                    ref={description}
                    required={true}
                    onChange={onDescriptionInputChange}
                />
                <Warning
                    ref={descriptionWarning}
                    title={"описание должно быть заполнено и не более 300 символов"}
                />
                <span>
                   <Label labelText={"Работа"} htmlFor={"job"}/>
                   <Select
                       id={"job"}
                       required={true}
                       name={"job"}
                       ref={job}
                       onchange={onJobInputChange}
                   >
                    <option>не выбрано</option>
                   </Select>
                </span>
                <Warning
                    ref={jobWarning}
                    title={"работа должна быть быть выбрана"}
                />
                <span>
                   <Label labelText={"Образование"} htmlFor={"education"}/>
                   <Select
                       id={"education"}
                       required={true}
                       name={"education"}
                       ref={education}
                       onchange={onEducationInputChange}
                   >
                    <option>не выбрано</option>
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
                    Зарегистрироваться
                </SubmitButton>
                <Warning
                    ref={warning}
                />
            </Form>
        </FormContainer>
    )
}
