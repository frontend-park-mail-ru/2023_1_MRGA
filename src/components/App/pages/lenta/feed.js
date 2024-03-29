import {HeaderAuth} from "components/App/header/header";
import {SideBar} from "components/App/sideBar/sideBar";
import {Recom} from "components/App/recommendProfile/recommendProfile";
import {PageContainer} from "components/UI/containers/pageContainer/pageContainer";

export const FeedPage = ({isLikes}) => {
    return (
        <>
            <HeaderAuth/>
            <PageContainer>
                    <SideBar current={"/"}/>
                    <Recom isLikes={isLikes}/>
            </PageContainer>
        </>
    );
};
