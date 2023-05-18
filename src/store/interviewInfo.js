import {createStore} from "../lib/redux";
import {Tinder} from "@/api/api";



const cityActionTypes = {
    set: 'SET'
};

export const SetCities = (cities) => {
    return {
        type: cityActionTypes.set,
        payload: {cities}
    }
}


const userReducer = (state, action) => {
    if (action.type === cityActionTypes.set) {
        return {...state, ...action.payload};
    }
}

export const cityStore = createStore(userReducer, undefined);
cityStore.dispatch(SetCities(["1", "2"]))

export class City {
    #state = {};

    static getCities = async () => {

        const resp = await Tinder.getCities();
        let json = await resp.json();
        if (json.status !== 200) {
            //warning.getValue().innerHTML = json.error;
            return [];
        }
        const cities = Array.from(json.body.cities);
        cityStore.dispatch(SetCities(cities))

    }
}

