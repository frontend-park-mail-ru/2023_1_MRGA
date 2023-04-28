import {Header} from "components/App/header/header";

import {RegistrationForm} from "components/App/registrationForm/registrationForm";
import {FeedPage} from "components/App/pages/lenta/feed";
import {InterviewPage} from "components/App/pages/registration/interview/interview";
import {HashTagsPage} from "components/App/pages/registration/hashTags/hashTags";
import {FiltersPage} from "components/App/pages/registration/filters/filters";
import {PhotoPage} from "components/App/pages/registration/photo/photo";
import {userStore} from "@/store/user";
import {rootRender} from "@/lib/jsx";

const registrationSteps = {
    0: FeedPage,
    1: InterviewPage,
    2: HashTagsPage,
    3: FiltersPage,
    4: PhotoPage
}

export const RegistrationPage = () => {
    const state = userStore.getState();
    console.log(state);
    if (!state) {
        return (
            <>
                <Header/>
                <RegistrationForm/>
            </>
        )
    }
    return rootRender(registrationSteps[state.user.step]());

}