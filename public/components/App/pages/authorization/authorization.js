import {Header} from "components/App/header/header";
import {createElement} from "@/lib/jsx";
import {AuthorizationForm} from "components/App/authorizationForm/authorizationForm";


export const AuthorizationPage = () => {
    return (<>
        <Header/>
        <AuthorizationForm/>
        </>
    )
}



