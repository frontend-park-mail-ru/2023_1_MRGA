import {HeaderAuth} from "components/App/header/header";
import {createElement} from "@/lib/jsx";
import {AuthorizationForm} from "components/App/authorizationForm/authorizationForm";
import {SideBar} from "components/App/sideBar/sideBar";
import {MatchesList} from "components/App/matchesList/matchesList";
import {RecommendProfile} from "components/App/recommendProfile/recommendProfile";
import styles from './feed.css'

export const FeedPage = () => {
    return (
        <>
            <HeaderAuth/>
            <div style="
                        margin-top: 10px;">
                <div style="display: flex;">
                    <SideBar/>
                    <RecommendProfile/>
                </div>
            </div>
        </>
    )
}
