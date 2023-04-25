import {HeaderAuth} from "components/App/header/header";
import {SideBar} from "components/App/sideBar/sideBar";
import {RecommendProfile} from "components/App/recommendProfile/recommendProfile";
import styles from './feed.css'
import {PageContainer} from "components/UI/containers/pageContainer/pageContainer";

export const FeedPage = () => {
    return (
        <>
            <HeaderAuth/>
            <PageContainer>
                    <SideBar/>
                    <RecommendProfile/>
            </PageContainer>
        </>
    )
}
