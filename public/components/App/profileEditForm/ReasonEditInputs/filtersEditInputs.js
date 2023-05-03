import {Tinder} from "@/api/api";
import {Select} from "components/UI/forms/select/select";
import {Link} from "@/lib/jsx/components/link/link";
import {Label} from "components/UI/forms/label/label";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
import {render} from "@/lib/jsx/render";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";

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
    const printArray = (array) => {
        for (let obj in array) {
            console.log(obj, array[obj]);
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
    const onFiltersChangeSubmit = (e) => {
        e.preventDefault();
    }

    const onHashTagsChangeSubmit = (e) => {
        e.preventDefault();
    }
    getReasons();
    return (
        <div>
            <Label labelText={"Кого вы ищете, выберите пол"} htmlFor={"sexSearch"}/>
            <Select ref={genderSelectRef}/>
            <InputWithLabel
                type={"number"}
                labelText={"минимальный возраст"}
                min={"18"}
                ref={minAge}
            />
            <InputWithLabel
                type={"number"}
                labelText={"максимальный возраст"}
                max={"150"}
                ref={maxAge}
            />
            <Label labelText={"Выберите причины"}/>
            <Select ref={reasonSelectRef} multiple/>
            <SubmitButton onClick={onFiltersChangeSubmit} >сохранить фильтры</SubmitButton>
            <Label labelText={"Выберите интересы"}/>
            <Select ref={hashTagsSelectRef} multiple/>
            <SubmitButton onClick={onHashTagsChangeSubmit}>сохранить интересы</SubmitButton>
        </div>
    )
}