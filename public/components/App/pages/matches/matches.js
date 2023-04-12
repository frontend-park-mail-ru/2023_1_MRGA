import {HeaderAuth} from "components/App/header/header";
import {createElement} from "@/lib/jsx";
import {AuthorizationForm} from "components/App/authorizationForm/authorizationForm";
import {SideBar} from "components/App/sideBar/sideBar";
import {Matches} from "components/App/matches/matches";
import styles from './matches.css'

// export const MatchesPage = () => {
//     return (
//         <>
//             <Header/>
//             <SideBar/>
//             <Matches/>
//
//         </>
// )
// }
// export const MatchesPage = () => {
//     return (
//         <>
//             <Header/>
//             <div>
//                 <SideBar/>
//                 <Matches/>
//                 {/*<div className={styles.chatSide}>*/}
//                 {/*    <div className={styles.matchesSide}>*/}
//                 {/*        <img src="../../../assets/svg/chat-icon.svg" width="52" height="52" alt=""/>*/}
//                 {/*            <div className={styles.openChat}>Выберите человека, чтобы начать чат</div>*/}
//                 {/*    </div>*/}
//                 {/*</div>*/}
//
//             </div>
//         </>
// )
// }

export const MatchesPage = () => {
    return (
        <>
            <div style="
            background-color: #F0EFFF;
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100%;">
                <HeaderAuth/>
                <div style="
                        min-width: 928px;
                        margin-top: 10px;
                        display: flex;
                        height: 87%;
                        flex-direction: row;
                        justify-content: space-around;">
                    <SideBar/>
                    <div style="
                        margin-left: 12px;
                        margin-right: 12px;
                        min-height: 500px;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-evenly;
                        width: 76%;
                        flex: 1;
                        height: auto;
                        border-radius: 20px;">
                        <Matches/>
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
                                <img src="../../../assets/svg/chat-icon.svg" width="52" height="52" alt=""/>
                                    <div style="
                                        color: #867BFF;
                                        font-weight: 600;
                                        margin-left: 12px;
                                        margin-right: 12px;">
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



