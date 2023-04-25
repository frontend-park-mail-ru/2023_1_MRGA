import {Form} from "components/UI/forms/form/form";
import logoMini from "assets/LogoMini.svg";
import {Label} from "components/UI/forms/label/label";
import {Select} from "components/UI/forms/select/select";
import {Warning} from "components/UI/forms/warning/warning";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import {useRef} from "@/lib/jsx/hooks/useRef";
import {Tinder} from "@/api/api";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";
import {rootRender} from "@/lib/jsx";
import {FiltersPage} from "components/App/pages/filters/filters";


export const HashTagsForm = () => {
    const hashTags = useRef();
    const hashTagsWarning = useRef();
    const submitButton = useRef();
    const warning = useRef();

    const onHashTagsInputChange = () => {
        const hashTagsValues = hashTags.getValue().querySelectorAll('option:checked');

        if (hashTagsValues.length === 0) {
            hashTagsWarning.getValue().innerHTML = 'Вы не выбрали хэш-теги';
            return false;
        } else if (hashTagsValues.length > 5) {
            hashTagsWarning.getValue().innerHTML = 'Выберите не более 5 тегов';
            return false;
        } else {
            hashTagsWarning.getValue().innerHTML = '';
            return true;
        }
    }

    const allChecks = () => {
        return onHashTagsInputChange();
    }

    const onSubmitClick = async (e) => {
        e.preventDefault();
        if (!allChecks()) {
            return;
        }
        try {
            let obj = {
                "hashtag": fromOptionsToTexts(hashTags.getValue()),
            }
            const respHashTags = await Tinder.addHashTags(obj);
            const jsonHashTags = await respHashTags.json();
            if (jsonHashTags.status !== 200) {
                warning.getValue().innerHTML = jsonHashTags.error;
                return;
            }
            rootRender(<FiltersPage/>)
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

   const respHashTagsFunc = async () => {
        const resp = await Tinder.getHashTags();
        let json = await resp.json();
        if (json.status !== 200) {
            warning.getValue().innerHTML = json.error;
            return;
        }
        setOptions("hashTags", json.body.hashtags);
    }
    respHashTagsFunc();

    return  (
        <FormContainer>
            <Form>
                <img src={logoMini} width="46" alt={"logo"}/>
                <span>
                   <Label labelText={"Hash tags"} htmlFor={"hashTags"}/>
                   <Select
                       id={"hashTags"}
                       required={true}
                       name={"hashTags"}
                       ref={hashTags}
                       onchange={onHashTagsInputChange}
                       multiple
                   >
                   </Select>
                </span>
                <Warning
                    ref={hashTagsWarning}
                    title={"Хэштеги должны быть выбраны"}
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
