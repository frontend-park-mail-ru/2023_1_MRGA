import {Tinder} from "@/api/api";

export const ChatWidget = () => {

    const setChats = async () => {
        const chats = await ((await Tinder.getChats()).json());
        console.log(chats);
    }
    setChats();
    return (
        <div> тут будет чат</div>
    )
}