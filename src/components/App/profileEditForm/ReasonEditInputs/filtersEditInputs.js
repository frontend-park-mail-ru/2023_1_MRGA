import {Tinder} from "@/api/api";
import {Select} from "components/UI/forms/select/select";
import {Label} from "components/UI/forms/label/label";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {render} from "@/lib/jsx/render";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";
import {fromOptionsToTexts} from "components/App/hashTagsForm/hashTagsForm";
import {rootRender} from "@/lib/jsx";
import {ProfilePage} from "components/App/pages/profile/profile";
import {Warning} from "components/UI/forms/warning/warning";
import {validateHashtags, validateMaxAge, validateMinAge, validateReasons} from "@/lib/validators";

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
    const hashTagsWarning = useRef();

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
            return ;
        }
        if (ageNumber < minAge.getValue().valueAsNumber) {
            maxAgeWarning.getValue().innerHTML = 'Максимально допустимый возраст не может быть меньше минимального';
        } else {
            maxAgeWarning.getValue().innerHTML = '';
        }
        return res.ok;
    }

    const onReasonInputChange = () => {
        const reasonsValues = reasonSelectRef.getValue().querySelectorAll('option:checked');
        const res = validateReasons(reasonsValues);
        reasonsWarning.getValue().innerHTML = res.warning
        return res.ok
    }

    const onHashTagsInputChange = () => {
        const hashTagsValues = hashTagsSelectRef.getValue().querySelectorAll('option:checked');

        const res = validateHashtags(hashTagsValues);
        hashTagsWarning.getValue().innerHTML = res.warning
        return res.ok
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
        const respHashTags = await Tinder.putHashtags(obj);
        rootRender(<ProfilePage/>)
    }
    getReasons();
    return (
        <div>
            <Label labelText={"Кого вы ищете, выберите пол"} htmlFor={"sexSearch"}/>
            <Select ref={genderSelectRef}/>
            <InputWithLabel
                type={"number"}
                labelText={"Минимальный возраст"}
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
                labelText={"Максимальный возраст"}
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
            <SubmitButton onClick={onFiltersChangeSubmit} >Сохранить фильтры</SubmitButton>
            <Label labelText={"Выберите интересы"}/>
            <Select onChange={onHashTagsInputChange} ref={hashTagsSelectRef} multiple/>
            <Warning
                ref={hashTagsWarning}
                title={"выберите интересы"}
            />
            <SubmitButton onClick={onHashTagsChangeSubmit}>Сохранить интересы</SubmitButton>
        </div>
    )
}
