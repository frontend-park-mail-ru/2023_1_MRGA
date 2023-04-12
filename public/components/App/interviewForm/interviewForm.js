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
import {City, cityStore} from "@/store/interviewInfo";


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
    const photo = useRef();
    const photoWarning = useRef();
    const minAge = useRef();
    const minAgeWarning = useRef();
    const maxAge = useRef();
    const maxAgeWarning = useRef();
    const reasons = useRef();
    const reasonsWarning = useRef();



    const onJobInputChange = () => {
        if (job.getValue().value === 'не выбрано') {
            jobWarning.getValue().innerHTML = 'Вы не выбрали работу';
        } else {
            jobWarning.getValue().innerHTML = '';
        }
    }

    const onPhotoInputChange = () => {
        console.log(photo.getValue().files[0])

    }

    const onCityInputChange = () => {
        if (city.getValue().value === 'не выбрано') {
            cityWarning.getValue().innerHTML = 'Вы не выбрали город';
        } else {
            cityWarning.getValue().innerHTML = '';
        }
    }

    const onEducationInputChange = () => {
        if (education.getValue().value === 'не выбрано') {
            educationWarning.getValue().innerHTML = 'Вы не выбрали образование';
        } else {
            educationWarning.getValue().innerHTML = '';
        }
    }

    const onDescriptionInputChange = () => {
        const descriptionText = name.getValue().value;
        if (descriptionText === "") {
           descriptionWarning.getValue().innerHTML = 'Некорректное описание';
        } else {
            descriptionWarning.getValue().innerHTML = '';
        }
    }

    const onZodiacInputChange = () => {
        if (zodiac.getValue().value === 'не выбрано') {
            zodiacWarning.getValue().innerHTML = 'Вы не выбрали знак зодиака';
        } else {
            zodiacWarning.getValue().innerHTML = '';
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

    const onMinAgeInputChange = () => {
        const ageNumber = minAge.getValue().valueAsNumber;
        if (ageNumber < 18 && ageNumber >= 0) {
            minAgeWarning.getValue().innerHTML = 'Возраст должен быть больше или равен 18';
        } else if (ageNumber < 0) {
            minAgeWarning.getValue().innerHTML = 'Некорректный возраст';
        } else if (isNaN(ageNumber)) {
            minAgeWarning.getValue().innerHTML = 'Введите возраст';
        } else {
            console.log(ageNumber)
            minAgeWarning.getValue().innerHTML = '';
        }
    }

    const onMaxAgeInputChange = () => {
        const ageNumber = minAge.getValue().valueAsNumber;
        if (ageNumber < 18 && ageNumber >= 0) {
            maxAgeWarning.getValue().innerHTML = 'Возраст должен быть больше или равен 18';
        } else if (ageNumber < 0) {
            maxAgeWarning.getValue().innerHTML = 'Некорректный возраст';
        } else if (isNaN(ageNumber)) {
            maxAgeWarning.getValue().innerHTML = 'Введите возраст';
        } else {
            maxAgeWarning.getValue().innerHTML = '';
        }
    }

    const getSelectValues = (select) => {
        let result = [];
        const options = select && select.options;
        let opt;

        for (var i=0, iLen=options.length; i<iLen; i++) {
            opt = options[i];

            if (opt.selected) {
                result.push(opt.value || opt.text);
            }
        }
        return result;
    }

    const getPhotoValue = (photoInp) => {
        const file = photoInp.getValue().files[0];
        const form_data = new FormData();
        form_data.append('image', file, file.name);
        form_data.append('title', 'www');
        form_data.append('body', 'ghghghghgh');
        form_data.append('tag', '123456');
        form_data.append('lang', 'ru');
        form_data.append('published_at', '2020-01-01 20:00:00');
        return form_data
    }

    const onReasonInputChange = () => {
        const reasonsValues = getSelectValues(reasons.getValue());

        if (reasonsValues.length === 0) {
            reasonsWarning.getValue().innerHTML = 'Вы не выбрали пол';
        } else {
            reasonsWarning.getValue().innerHTML = '';
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
        onPhotoInputChange();
        onMinAgeInputChange();
        onMaxAgeInputChange();
        onReasonInputChange();
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
            const respFilterUser = await Tinder.filters({
                "minAge": minAge.getValue().valueAsNumber,
                "maxAge": maxAge.getValue().valueAsNumber,
                "reasons": getSelectValues(reasons.getValue())
            })
            const jsonFilterUser = await respFilterUser.json()
            if (jsonFilterUser.status !== 200) {
                warning.getValue().innerHTML = jsonFilterUser.error;
                return
            }
            const respPhotoUser = await Tinder.photo({
                "photo": getPhotoValue(photo),
                "avatar": true,
            })

            Navigate({to:'/'});
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

    const respZodiac = async () => {
        let resp = await Tinder.getZodiac();
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
        let arr = Array.from(json.body.education)
        return json.body.education;
    }

    return  (
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
                        id={"sex"}
                        required={true}
                        name={"sex"}
                        ref={sex}
                        onChange={onSexInputChange}
                    >{["не выбрано", "М", "Ж"].map(option => <option>{option}</option>)}</Select>
                   {/*<Select*/}
                   {/*    arrayOptions={["не выбрано", "М", "Ж"]}*/}
                   {/*    id={"sex"}*/}
                   {/*    required={true}*/}
                   {/*    name={"sex"}*/}
                   {/*    ref={sex}*/}
                   {/*    onChange={onSexInputChange}*/}
                   {/*>*/}
                   {/*</Select>*/}
                </span>
                <Warning
                    ref={sexWarning}
                    title={"пол должен быть выбран"}
                />
                <span>
                   <Label labelText={"City"} htmlFor={"city"}/>
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
                   <Label labelText={"Zodiac"} htmlFor={"zodiac"}/>
                   <Select
                       arrayOptions={respZodiac}
                       id={"zodiac"}
                       required={true}
                       name={"zodiac"}
                       ref={zodiac}
                       onChange={onZodiacInputChange}
                   >{['весы', 'рак'].map(option => <option>{option}</option>)}
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
                   >{["есть", 'нет'].map(option => <option>{option}</option>)}
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
                   >{["есть", 'нет'].map(option => <option>{option}</option>)}
                   </Select>
                </span>
                <Warning
                    ref={educationWarning}
                    title={"Образование должно быть выбрано"}
                />
                <InputWithLabel
                    name={"minAge"}
                    id={"minAge"}
                    type={"number"}
                    placeholder={"minAge"}
                    labelText={"min Age"}
                    required={true}
                    min={"18"}
                    onChange={onMinAgeInputChange}
                    ref={minAge}
                />
                <Warning
                    ref={minAgeWarning}
                    title={"пол должен быть выбран"}
                />
                <InputWithLabel
                    name={"maxAge"}
                    id={"maxAge"}
                    type={"number"}
                    placeholder={"maxAge"}
                    labelText={"max Age"}
                    required={true}
                    min={"18"}
                    onChange={onMaxAgeInputChange}
                    ref={maxAge}
                />
                <Warning
                    ref={maxAgeWarning}
                    title={"пол должен быть выбран"}
                />
                <Select multiple size={2}
                    id={"reasons"}
                    labelText={"reasons"}
                    required={true}
                    name={"reasons"}
                    ref={reasons}
                    onChange={onReasonInputChange}
                >{["love", 'friendship', 'relax', "love", 'friendship', 'relax'].map(option => <option>{option}</option>)}
                </Select>
                <Warning
                    ref={reasonsWarning}
                    title={"пол должен быть выбран"}
                />
                <InputWithLabel
                    id={"photo"}
                    labelText={"photo"}
                    required={true}
                    name={"photo"}
                    ref={photo}
                    onChange={onPhotoInputChange}
                    type="file" />
                <SubmitButton
                    ref={submitButton}
                    onClick={onSubmitClick}
                >
                    зарегистрироваться
                </SubmitButton>
                <Warning
                    ref={warning}
                />
            </Form>
        </FormContainer>
    )
}