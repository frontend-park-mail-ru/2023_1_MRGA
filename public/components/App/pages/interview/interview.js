import {Header} from "components/App/header/header";

import {InterviewForm} from "components/App/interviewForm/interviewForm";
import {cityStore} from "@/store/interviewInfo";

export const InterviewPage = () => {

    return (
        <div>
            {/* <Header/> */}
            <InterviewForm/>
        </div>
    )
}
