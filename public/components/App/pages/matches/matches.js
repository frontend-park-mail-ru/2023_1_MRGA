import {Header} from "components/App/header/header";
import {createElement} from "@/lib/jsx";
import {AuthorizationForm} from "components/App/authorizationForm/authorizationForm";
import {SideBar} from "components/App/sideBar/sideBar";
import {Matches} from "components/App/matches/matches";
import styles from './matches.css'

export const MatchesPage = () => {
    return (
        <>
            <div className={styles.container}>
                <Header/>
                <div className={styles.matchesSide}>
                    <SideBar/>
                    <div>
                        <Matches/>
                        <div className={styles.chatSide}>
                            <div className={styles.matchesSide}>
                                <img src="../../../assets/svg/chat-icon.svg" width="52" height="52" alt=""/>
                                    <div className={styles.openChat}>
                                        Выберите человека, чтобы начать чат
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
)
}



