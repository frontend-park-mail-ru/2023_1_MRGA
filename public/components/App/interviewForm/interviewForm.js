import {Form} from "components/UI/forms/form/form";
import logoMini from "assets/LogoMini.svg";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {Label} from "components/UI/forms/label/label";
import {Select} from "components/UI/forms/select/select";
import {Warning} from "components/UI/forms/warning/warning";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import {useRef} from "@/lib/jsx/hooks/useRef";
import {validateName} from "@/lib/validators";
import {Tinder} from "@/api/api";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";

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
<<<<<<< HEAD
=======
    const photo = useRef();
    const photoWarning = useRef();
    const minAge = useRef();
    const minAgeWarning = useRef();
    const maxAge = useRef();
    const maxAgeWarning = useRef();
    const reasons = useRef();
    const reasonsWarning = useRef();
    const sexSearch = useRef();
    const sexSearchWarning = useRef();
    const hashTags = useRef();
    const hashTagsWarning = useRef();
    let photoBuf = Uint8Array
>>>>>>> 7b207193849430b19a9ba0f81e6ff658fa95a31f

    const onJobInputChange = () => {
        if (job.getValue().value === 'не выбрано') {
            jobWarning.getValue().innerHTML = 'Вы не выбрали работу';
            return false;
        } else {
            jobWarning.getValue().innerHTML = '';
            return true;
        }
    }

<<<<<<< HEAD
=======


    const onHashTagsInputChange = () => {
        const hashTagsValues = document.querySelector("#hashTags").querySelectorAll('option:checked');

        if (hashTagsValues.length === 0) {
            hashTagsWarning.getValue().innerHTML = 'Вы не выбрали хэш-теги';
            return false;
        } else {
            hashTagsWarning.getValue().innerHTML = '';
            return true;
        }
    }

>>>>>>> 7b207193849430b19a9ba0f81e6ff658fa95a31f
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

<<<<<<< HEAD
=======
    const onMinAgeInputChange = () => {
        const ageNumber = minAge.getValue().valueAsNumber;
        if (ageNumber < 18 && ageNumber >= 0) {
            minAgeWarning.getValue().innerHTML = 'Возраст должен быть больше или равен 18';
        } else if (ageNumber < 0) {
            minAgeWarning.getValue().innerHTML = 'Некорректный возраст';
        } else if (isNaN(ageNumber)) {
            minAgeWarning.getValue().innerHTML = 'Введите возраст';
        } else {
            minAgeWarning.getValue().innerHTML = '';
            return true;
        }
        return false;
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
            return true;
        }
        return false;
    }

    const onPhotoInputChange = () => {
        if (photo.getValue().files.length === 0) {
            photoWarning.getValue().innerHTML = 'Вы не прикрепили фотографию';
            return false;
        } else {
            photoWarning.getValue().innerHTML = '';
            return true;
        }
    }

    const getPhotoValue = () => {
        const file = photo.getValue().files[0];
        console.log(file)
        const formdata = new FormData();
        formdata.append ('file', file);
        return formdata

    }

    const onReasonInputChange = () => {
        const reasonsValues = document.querySelector("#reasons").querySelectorAll('option:checked');

        if (reasonsValues.length === 0) {
            reasonsWarning.getValue().innerHTML = 'Вы не выбрали причины для знакомств';
            return false;
        } else {
            reasonsWarning.getValue().innerHTML = '';
            return true;
        }
    }

>>>>>>> 7b207193849430b19a9ba0f81e6ff658fa95a31f
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
<<<<<<< HEAD
        return onJobInputChange() &&
        onCityInputChange() &&
        onNameInputChange() &&
        onEducationInputChange() &&
        onDescriptionInputChange() && 
        onZodiacInputChange() &&
        onSexInputChange();
=======
        return true
        // return onJobInputChange() && onCityInputChange() &&
        // onNameInputChange() &&
        // onEducationInputChange() &&
        // onDescriptionInputChange() &&
        // onZodiacInputChange() &&
        // onSexInputChange() &&
        // onPhotoInputChange() &&
        // onMinAgeInputChange() &&
        // onMaxAgeInputChange() &&
        // onReasonInputChange() &&
        // onSexSearchInputChange() &&
        // onHashTagsInputChange();
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
>>>>>>> 7b207193849430b19a9ba0f81e6ff658fa95a31f
    }

    const onSubmitClick = async (e) => {
        e.preventDefault();
        if (!allChecks()) {
            return;
        }
        try {
<<<<<<< HEAD
            let obj = {
=======

            const respInfoUser = await Tinder.infoUser({
>>>>>>> 7b207193849430b19a9ba0f81e6ff658fa95a31f
                "name": name.getValue().value,
                "city": city.getValue().value,
                "job": job.getValue().value,
                "education": education.getValue().value,
                "sex": sex.getValue().value,
                "zodiac": zodiac.getValue().value,
                "description": description.getValue().value,
            }
            console.log(obj);
            const respInfoUser = await Tinder.infoUser(obj);
            const jsonInfoUser = await respInfoUser.json()
            if (jsonInfoUser.status !== 200) {
                warning.getValue().innerHTML = jsonInfoUser.error;
                return
            }
<<<<<<< HEAD
            console.log(jsonInfoUser);
            Navigate({to:'/hashTags'});
=======

            const respFilterUser = await Tinder.filters({
                "minAge": minAge.getValue().valueAsNumber,
                "maxAge": maxAge.getValue().valueAsNumber,
                "sexSearch": sexSearch.getValue().value,
                "reason": fromOptionsToTexts(document.querySelector("#reasons"))
            });
            const jsonFilterUser = await respFilterUser.json()
            if (jsonFilterUser.status !== 200) {
                warning.getValue().innerHTML = jsonFilterUser.error;
                return
            }

            const respHashTags = await Tinder.addHashTags({
                "hashtag": fromOptionsToTexts(document.querySelector("#hashTags"))
            });
            const jsonHashTags = await respHashTags.json()
            if (jsonHashTags.status !== 200) {
                warning.getValue().innerHTML = jsonHashTags.error;
                return
            }

            const respPhotoUser = await Tinder.photo({
                "photo": getPhotoValue(),
                "avatar": true,
            });
            const jsonPhotoUser = await respPhotoUser.json()
            if (jsonPhotoUser.status !== 200) {
                warning.getValue().innerHTML = jsonPhotoUser.error;
                return
            }

            Navigate({to:'/'});
>>>>>>> 7b207193849430b19a9ba0f81e6ff658fa95a31f
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
                        onchange={onSexInputChange}
                    >{["не выбрано", "М", "Ж"].map(option => <option>{option}</option>)}</Select>
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
                    labelText={"Description"}
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
                   <Label labelText={"Education"} htmlFor={"education"}/>
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
<<<<<<< HEAD
=======
                <InputWithLabel
                    name={"minAge"}
                    id={"minAge"}
                    type={"number"}
                    placeholder={"minAge"}
                    labelText={"Min аge"}
                    required={true}
                    min={"18"}
                    onChange={onMinAgeInputChange}
                    ref={minAge}
                />
                <Warning
                    ref={minAgeWarning}
                    title={"минимальный возраст должен быть выбран"}
                />
                <InputWithLabel
                    name={"maxAge"}
                    id={"maxAge"}
                    type={"number"}
                    placeholder={"maxAge"}
                    labelText={"Max аge"}
                    required={true}
                    min={"18"}
                    onChange={onMaxAgeInputChange}
                    ref={maxAge}
                />
                <Warning
                    ref={maxAgeWarning}
                    title={"максимальный возраст должен быть выбран"}
                />
                <span>
                   <Label labelText={"Search sex"} htmlFor={"sexSearch"}/>
                   <Select
                       id={"sexSearch"}
                       required={true}
                       name={"sexSearch"}
                       ref={sexSearch}
                       onchange={onSexSearchInputChange}
                   >
                    {["не выбрано", "М", "Ж", "ВСЕ"].map(option => <option>{option}</option>)}
                   </Select>
                </span>
                <Warning
                    ref={sexSearchWarning}
                    title={"Интересующий пол должен быть выбран"}
                />
                <span>
                   <Label labelText={"Reasons"} htmlFor={"reasons"}/>
                   <Select
                       id={"reasons"}
                       required={true}
                       name={"reasons"}
                       ref={reasons}
                       onchange={onReasonInputChange}
                       multiple
                   >
                   </Select>
                </span>
                <Warning
                    ref={reasonsWarning}
                    title={"причина должна быть указана"}
                />
                <InputWithLabel
                    id={"photo"}
                    labelText={"photo"}
                    required={true}
                    name={"photo"}
                    ref={photo}
                    onChange={onPhotoInputChange}
                    type="file" />
                <Warning
                    ref={photoWarning}
                    title={"фотография должна быть прикреплена"}
                />
>>>>>>> 7b207193849430b19a9ba0f81e6ff658fa95a31f
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
