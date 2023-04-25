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
import {rootRender} from "@/lib/jsx";
import {PhotoPage} from "components/App/pages/photo/photo";

export const FiltersForm = () => {
    const sexSearch = useRef();
    const sexSearchWarning = useRef();
    const minAge = useRef();
    const minAgeWarning = useRef();
    const maxAge = useRef();
    const maxAgeWarning = useRef();
    const reasons = useRef();
    const reasonsWarning = useRef();
    const submitButton = useRef();
    const warning = useRef();

    const onSexSearchInputChange = (event) => {
        if (sexSearch.getValue().value === 'не выбрано') {
            sexSearchWarning.getValue().innerHTML = 'Вы не интересующий пол';
            return false;
        } else {
            sexSearchWarning.getValue().innerHTML = '';
            return true;
        }
    }

    const onMinAgeInputChange = () => {
        const ageNumber = minAge.getValue().valueAsNumber;
        if (ageNumber < 18 && ageNumber >= 0) {
            minAgeWarning.getValue().innerHTML = 'Возраст должен быть больше или равен 18';
        } else if (ageNumber < 0) {
            minAgeWarning.getValue().innerHTML = 'Некорректный возраст';
        } else if (ageNumber > maxAge.getValue().valueAsNumber) {
            minAgeWarning.getValue().innerHTML = 'Минимальный допустимый возраст не может быть больше максимального';
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
        } else if (ageNumber < minAge.getValue().valueAsNumber) {
            minAgeWarning.getValue().innerHTML = 'Максимально допустимый возраст не может быть меньше минимального';
        } else if (isNaN(ageNumber)) {
            maxAgeWarning.getValue().innerHTML = 'Введите возраст';
        } else {
            maxAgeWarning.getValue().innerHTML = '';
            return true;
        }
        return false;
    }

    const onReasonInputChange = () => {
        const reasonsValues = reasons.getValue().querySelectorAll('option:checked');

        if (reasonsValues.length === 0) {
            reasonsWarning.getValue().innerHTML = 'Вы не выбрали причины для знакомств';
            return false;
        } else if (reasonsValues.length > 3) {
            reasonsWarning.getValue().innerHTML = 'Выберите не более 3 причин';
            return false;
        } else {
            reasonsWarning.getValue().innerHTML = '';
            return true;
        }
    }

    const allChecks = () => {
        return onSexSearchInputChange() &&
        onMinAgeInputChange() && 
        onMaxAgeInputChange() &&
        onReasonInputChange();
    }

    const onSubmitClick = async (e) => {
        e.preventDefault();
        if (!allChecks()) {
            return;
        }

        try {
            let obj = {
                "minAge": minAge.getValue().valueAsNumber,
                "maxAge": maxAge.getValue().valueAsNumber,
                "sexSearch": sexSearch.getValue().value,
                "reason": fromOptionsToTexts(reasons.getValue()),
            }
            const respFilterUser = await Tinder.filters(obj);
            const jsonFilterUser = await respFilterUser.json();
            if (jsonFilterUser.status !== 200) {
                warning.getValue().innerHTML = jsonFilterUser.error;
                return;
            }
            rootRender(<PhotoPage/>)
        } catch (e) {
            alert(e);
        }
    }

    const fromOptionsToTexts = (select) => {
        let options = select.querySelectorAll("option:checked");
        let result = [];
        options.forEach(item => {
            result.push(item.text);
        });
        return result;
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

    const respReasonFunc = async () => {
        let resp = await Tinder.getReason();
        let json = await resp.json();
        if (json.status !== 200) {
            warning.getValue().innerHTML = json.error;
            return;
        }
        setOptions("reasons", json.body.reasons);
    }
    respReasonFunc();

    return  (
        <FormContainer>
            <Form>
                <img src={logoMini} width="46" alt={"logo"}/>
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
