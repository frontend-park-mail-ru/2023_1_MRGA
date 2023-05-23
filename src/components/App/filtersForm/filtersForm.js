import {Form} from "components/UI/forms/form/form";
import logoMini from "assets/LogoMini.svg";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {Label} from "components/UI/forms/label/label";
import {Select} from "components/UI/forms/select/select";
import {Warning} from "components/UI/forms/warning/warning";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {Tinder} from "@/api/api";
import {rootRender} from "@/lib/jsx";
import {PhotoPage} from "components/App/pages/registration/photo/photo";
import styles from './filters.module.css'
import {validateMaxAge, validateMinAge, validateReasons} from "@/lib/validators";

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
            sexSearchWarning.getValue().innerHTML = 'Вы не выбрали интересующий пол';
            return false;
        } else {
            sexSearchWarning.getValue().innerHTML = '';
            return true;
        }
    }

    const onMinAgeInputChange = () => {
        const ageNumber = minAge.getValue().valueAsNumber;
        const res = validateMinAge(ageNumber);
        if (!res.ok){
            minAgeWarning.getValue().innerHTML = res.warning
            return false;
        }
        if (ageNumber > maxAge.getValue().valueAsNumber) {
            minAgeWarning.getValue().innerHTML = 'Минимальный допустимый возраст не может быть больше максимального';
            return false;
        }
        minAgeWarning.getValue().innerHTML = '';
        return true;
    }

    const onMaxAgeInputChange = () => {
        const ageNumber = maxAge.getValue().valueAsNumber;
        const res = validateMaxAge(ageNumber);
        if (!res.ok){
            maxAgeWarning.getValue().innerHTML = res.warning
            return
        }
        if (ageNumber < minAge.getValue().valueAsNumber) {
            maxAgeWarning.getValue().innerHTML = 'Максимально допустимый возраст не может быть меньше минимального';
        } else {
            maxAgeWarning.getValue().innerHTML = '';
        }
        return res.ok;
    }

    const onReasonInputChange = () => {
        const reasonsValues = reasons.getValue().querySelectorAll('option:checked');
        const res = validateReasons(reasonsValues);
        reasonsWarning.getValue().innerHTML = res.warning
        return res.ok
    }

    const allChecks = () => {
        return onSexSearchInputChange() &&
        onMinAgeInputChange() && 
        onMaxAgeInputChange() &&
        onReasonInputChange();
    }

    const sstn = {
        "М": 0,
        "Ж": 1,
        "ВСЕ": 2
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
                "sexSearch": sstn[sexSearch.getValue().value],
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
                   <Label labelText={"Кого вы ищете, выберите пол"} htmlFor={"sexSearch"}/>
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
                    placeholder={"18"}
                    labelText={"Минимальный возраст"}
                    required={true}
                    min={"18"}
                    onChange={onMinAgeInputChange}
                    ref={minAge}
                />
                <Warning
                    ref={minAgeWarning}
                    title={"Минимальный возраст должен быть выбран"}
                />
                <InputWithLabel
                    name={"maxAge"}
                    id={"maxAge"}
                    type={"number"}
                    placeholder={"150"}
                    labelText={"Максимальный возраст"}
                    required={true}
                    min={"18"}
                    onChange={onMaxAgeInputChange}
                    ref={maxAge}
                />
                <Warning
                    ref={maxAgeWarning}
                    title={"Максимальный возраст должен быть выбран"}
                />

                <span className={styles.reasonsSelectContainer}>
                    <Label labelText={"Выберите причины"}/>
                   <Select
                       id={"reasons"}
                       required={true}
                       name={"reasons"}
                       ref={reasons}
                       onchange={onReasonInputChange}
                       multiple
                   >
                   </Select>
                    <Label style={"font-size: 16px; padding-left: 20px" } labelText={"Зажмите CTRL/CMD, чтобы выбрать несколько"} htmlFor={"hashTags"}/>
                </span>
                <Warning
                    ref={reasonsWarning}
                    title={"Причина должна быть указана"}
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
