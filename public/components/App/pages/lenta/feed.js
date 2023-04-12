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
            <RecommendProfile/>
        </>
    )
}
// export const FeedPage = () => {
//     return (
//         <>
//             <div style="
//             background-color: #F0EFFF;
//             display: flex;
//             flex-direction: column;
//             height: 100vh;
//             width: 100%;">
//                 <HeaderAuth/>
//                 <div style="
//                         min-width: 928px;
//                         margin-top: 10px;
//                         display: flex;
//                         height: 87%;
//                         flex-direction: row;
//                         justify-content: space-around;">
//                     <SideBar/>
//                     <div style="
//                         margin-left: 12px;
//                         margin-right: 12px;
//                         min-height: 500px;
//                         display: flex;
//                         flex-direction: row;
//                         justify-content: space-evenly;
//                         width: 76%;
//                         flex: 1;
//                         height: auto;
//                         border-radius: 20px;">
//                         <RecommendProfile/>
//                         <div style="
//                             background-color: white;
//                             border-radius: 20px;
//                             display: flex;
//                             flex-direction: column;
//                             width: 60%;
//                             min-width: 400px;
//                             position: relative;
//                             justify-content: center;">
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }



