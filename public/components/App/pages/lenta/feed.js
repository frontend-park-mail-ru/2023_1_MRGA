import {HeaderAuth} from "components/App/header/header";
import {SideBar} from "components/App/sideBar/sideBar";
import {RecommendProfile} from "components/App/recommendProfile/recommendProfile";
import styles from './feed.css'

export const FeedPage = () => {
    return (
        <>
            <HeaderAuth/>
            <div style="display: flex;">
                <SideBar/>
                <RecommendProfile/>
            </div>
        </>
    )
}
