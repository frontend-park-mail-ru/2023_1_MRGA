import {Header} from "components/App/header/header";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";

export const NotFoundPage = () => {
    return (
        <>
            <Header/>
            <FormContainer>
                <h1 style={"margin: 30px;"}>Страница не найдена</h1>
            </FormContainer>
        </>
    )
}