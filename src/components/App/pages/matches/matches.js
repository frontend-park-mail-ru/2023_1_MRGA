import {HeaderAuth} from "components/App/header/header";
import {SideBar} from "components/App/sideBar/sideBar";
import {MatchesList} from "components/App/matchesList/matchesList";
import {PageContainer} from "components/UI/containers/pageContainer/pageContainer";

import chatIcon from "assets/img/chat.png";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";

export const MatchesPage = () => {
    const chatArea = useRef();
    const matchIcon = useRef();
    const matchText = useRef();

    return (
        <>
            <HeaderAuth/>
            <PageContainer>
                <SideBar current={"/matches"}/>
                <MatchesList refToChatArea={chatArea} matchText={matchText} matchIcon={matchIcon} hasBeenRedirected={false}/>
                <div ref={chatArea} style="
                    background-color: white;
                    border-radius: 20px;
                    display: flex;
                    flex-direction: column;
                    width: 60%;
                    min-width: 400px;
                    position: relative;
                    justify-content: center;">
                    <div style="
                        display: flex;
                        flex-direction: column;
                        justify-items: center;
                        align-items: center;">
                        <img ref={matchIcon} src={chatIcon} width="52" height="52" alt=""/>
                            <div ref={matchText} style="
                                color: rgb(116 106 228);
                                margin: 7px 12px;">
                                Выберите человека, чтобы начать чат
                            </div>
                    </div>
                    </div>
            </PageContainer>
        </>
    );
};
