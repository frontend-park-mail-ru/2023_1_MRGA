import {HeaderAuth} from "components/App/header/header";
import {PageContainer} from "components/UI/containers/pageContainer/pageContainer";
import {SideBar} from "components/App/sideBar/sideBar";
import {Recom} from "components/App/recommendProfile/recommendProfile";
import {ChatWidget} from "components/App/pages/chat/chatWidget/chatWidget";
import {getUser} from "@/store/user";

// const host = "95.163.180.8";
const host = "localhost";

export const ChatPage = () => {

    let ws = new WebSocket(`ws://${host}:9090`, "json");

    const initWS = async () => {
        const userId = getUser().userId;

        ws.addEventListener("open", (event) => {
            ws.send(JSON.stringify({
                flag: "REG",
                body: {
                    userId: userId,
                }
            }));

        });

        ws.addEventListener("close", (event) => {
        });
    }
    initWS();

    return (
        <>
            <HeaderAuth/>
            <PageContainer>
                <SideBar/>
                <ChatWidget ws={ws}/>
            </PageContainer>
        </>
    )
}