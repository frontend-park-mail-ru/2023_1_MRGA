import {Tinder} from "@/api/api";
import {Select} from "components/UI/forms/select/select";
import {Link} from "@/lib/jsx/components/link/link";
import {Label} from "components/UI/forms/label/label";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {render} from "@/lib/jsx/render";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {fromOptionsToTexts} from "components/App/hashTagsForm/hashTagsForm";
import {rootRender} from "@/lib/jsx";
import {ProfilePage} from "components/App/pages/profile/profile";
import {Warning} from "components/UI/forms/warning/warning";

export const FiltersEditInputs = () => {
    let myFilters;
    let myHashTags;
    let allReasons = []
    let allHashTags = []
    let selectedReasons = [];
    let selectedHashTags = [];
    let selectedGender = {
        "М": false,
        "Ж": false,
        "Все": false
    }

    const reasonSelectRef = useRef();
    const genderSelectRef = useRef();
    const hashTagsSelectRef = useRef();
    const minAge = useRef();
    const maxAge = useRef();
    const minAgeWarning = useRef();
    const maxAgeWarning = useRef();
    const reasonsWarning = useRef();

    const setSelectedGenderSearch = () => {
        switch (myFilters.sexSearch) {
            case 0: {
                selectedGender['М'] = true;
                return ;
            }
            case 1: {
                selectedGender['Ж'] = true;
                return ;
            }
            case 2: {
                selectedGender['Все'] = true;
                return ;
            }
            default: {
                return ;
            }
        }
    }
    const setSelected = (allVariants, selectedVariants, resultArray) => {
        for (let index in allVariants) {
            let selected = false
            if (selectedVariants.includes(allVariants[index])) {
                selected = true;
            }
            resultArray.push({
                reason: allVariants[index],
                selected
            })
        }
    }

    const getReasons = async () => {
        try {
            allReasons = (await ((await Tinder.getReason()).json())).body.reasons;
            allHashTags = (await ((await Tinder.getHashTags()).json())).body.hashtags;
            myFilters = (await ((await Tinder.getFilters()).json())).body.filters;
            myHashTags = (await ((await Tinder.getMyHashtags()).json())).body.hashtag;
            setSelected(allReasons, myFilters.reason, selectedReasons);
            setSelected(allHashTags, myHashTags, selectedHashTags);
            setSelectedGenderSearch();
            render(genderSelectRef.getValue(),
                Object.entries(selectedGender).map(([key, value]) => {
                    return <option selected={value}>{key}</option>
                })
            );
            render(reasonSelectRef.getValue(), selectedReasons.map(({reason, selected}) => {
                return <option selected={selected}>{reason}</option>
            }))
            render(hashTagsSelectRef.getValue(), selectedHashTags.map(({reason, selected}) => {
                return <option selected={selected}>{reason}</option>
            }))
            minAge.getValue().value = myFilters.minAge;
            maxAge.getValue().value = myFilters.maxAge;


        } catch (e) {
            alert(e)
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
        const ageNumber = maxAge.getValue().valueAsNumber;
        if (ageNumber < 18 && ageNumber >= 0) {
            maxAgeWarning.getValue().innerHTML = 'Возраст должен быть больше или равен 18';
        } else if (ageNumber < 0 || ageNumber>150) {
            maxAgeWarning.getValue().innerHTML = 'Некорректный возраст';
        } else if (ageNumber < minAge.getValue().valueAsNumber) {
            maxAgeWarning.getValue().innerHTML = 'Максимально допустимый возраст не может быть меньше минимального';
        } else if (isNaN(ageNumber)) {
            maxAgeWarning.getValue().innerHTML = 'Введите возраст';
        } else {
            maxAgeWarning.getValue().innerHTML = '';
            return true;
        }
        return false;
    }

    const onReasonInputChange = () => {
        const reasonsValues = reasonSelectRef.getValue().querySelectorAll('option:checked');

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
    const onHashTagsInputChange = () => {
        const hashTagsValues = hashTagsSelectRef.getValue().querySelectorAll('option:checked');

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

    const allFilterChecks = () => {
        return onMinAgeInputChange() &&
            onMaxAgeInputChange() &&
            onReasonInputChange();
    }


    const onFiltersChangeSubmit = async (e) => {
        e.preventDefault();
        if (!allFilterChecks()){
            return ;
        }
        const ss = {
            "М": 0,
            "Ж": 1,
            "Все": 2
        }
        let obj = {
            "minAge": minAge.getValue().valueAsNumber,
            "maxAge": maxAge.getValue().valueAsNumber,
            "sexSearch": ss[genderSelectRef.getValue().value],
            "reason": fromOptionsToTexts(reasonSelectRef.getValue()),
        }
        const respFilterUser = await (await Tinder.putFilters(obj)).json();

        rootRender(<ProfilePage/>)
    }

    const onHashTagsChangeSubmit = async (e) => {
        e.preventDefault();
        if (!onHashTagsInputChange()){
            return ;
        }
        let obj = {
            "hashtag": fromOptionsToTexts(hashTagsSelectRef.getValue()),
        }
        const respHashTags = await Tinder.addHashTags(obj);
        rootRender(<ProfilePage/>)
    }
    getReasons();
    return (
        <div>
            <Label labelText={"Кого вы ищете, выберите пол"} htmlFor={"sexSearch"}/>
            <Select ref={genderSelectRef}/>
            <InputWithLabel
                type={"number"}
                labelText={"минимальный возраст"}
                min={18}
                max={150}
                ref={minAge}
                onChange={onMinAgeInputChange}
            />
            <Warning
                ref={minAgeWarning}
                title={"минимальный возраст должен быть введен"}
            />
            <InputWithLabel
                type={"number"}
                labelText={"максимальный возраст"}
                max={"150"}
                min={"18"}
                ref={maxAge}
                onChange={onMaxAgeInputChange}
            />
            <Warning
                ref={maxAgeWarning}
                title={"максимальный возраст должен быть введен"}
            />
            <Label labelText={"Выберите причины"}/>
            <Select onChange={onReasonInputChange} ref={reasonSelectRef} multiple/>
            <Warning
                ref={reasonsWarning}
                title={"выберите причины поиска"}
            />
            <SubmitButton onClick={onFiltersChangeSubmit} >сохранить фильтры</SubmitButton>
            <Label labelText={"Выберите интересы"}/>
            <Select onChange={onHashTagsInputChange} ref={hashTagsSelectRef} multiple/>
            <SubmitButton onClick={onHashTagsChangeSubmit}>сохранить интересы</SubmitButton>
        </div>
    )
}