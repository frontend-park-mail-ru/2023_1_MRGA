import {HeaderAuth} from "components/App/header/header";
import {SideBar} from "components/App/sideBar/sideBar";
import {MatchesList} from "components/App/matchesList/matchesList";
import styles from './matches.css'
import {PageContainer} from "components/UI/containers/pageContainer/pageContainer";

import chatIcon from 'assets/svg/chat-icon.svg';

export const MatchesPage = () => {
    return (
        <>
                <HeaderAuth/>
                <PageContainer>
                    <SideBar/>
                        <MatchesList/>
                        <div style="
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
                                <img src={chatIcon} width="52" height="52" alt=""/>
                                    <div style="
                                        color: #867BFF;
                                        font-weight: 600;
                                        margin-left: 12px;
                                        margin-right: 12px;">
                                        Выберите человека, чтобы начать чат
                                    </div>
                            </div>
                        </div>
                </PageContainer>
        </>
)
}



