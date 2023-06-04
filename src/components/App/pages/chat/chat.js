import {HeaderAuth} from "components/App/header/header";
import {PageContainer} from "components/UI/containers/pageContainer/pageContainer";
import {SideBar} from "components/App/sideBar/sideBar";
import {ChatWidget} from "components/App/pages/chat/chatWidget/chatWidget";

export const ChatPage = () => {

    return (
        <>
            <HeaderAuth/>
            <PageContainer>
                <SideBar current={"/chat"}/>
                <ChatWidget/>
            </PageContainer>
        </>
    );
};
