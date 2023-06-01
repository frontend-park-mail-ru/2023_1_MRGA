import {Header} from "components/App/header/header";
import {createElement} from "@/lib/jsx";

import {RegistrationForm} from "components/App/registrationForm/registrationForm";

export const RegistrationPage = () => {
    return (
        <>
        <Header/>
        <RegistrationForm/>
        </>
    )
}