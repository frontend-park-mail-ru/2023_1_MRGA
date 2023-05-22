import { BackendHost, BackendPort } from "./api";
import {notificationWrapper} from "components/App/notification/notification";
import {appendChildren, create} from "@/lib/jsx";

const getConnectionObject = () => {
    let connection = undefined;
    const Undef = () => {
        connection = undefined;
    }
    const Set = (newConnection) => {
        connection = newConnection;
    }
    const IsUndef = () => {
        return connection === undefined;
    }
    const Get = () => {
        return connection;
    }

    return {connection, Undef, Set, IsUndef, Get}
};

let wsChat = getConnectionObject();
let wsReaction = getConnectionObject();

const onWsError = (event) => {
    console.log('WebSocket error:', event);
};

const onWsClose = (connectionObject, event) => {
    console.log('WebSocket connection closed:', event);
    connectionObject.Undef();
};

const initWsHandlers = (wsConnection) => {
    wsConnection.Get().addEventListener('close', onWsClose.bind(null, wsConnection));
    wsConnection.Get().addEventListener('error', onWsError);
}

export class WSChatAPI {

    static connect() {
        try {
            if (wsChat.IsUndef()) {
                wsChat.Set(new WebSocket(`ws://${BackendHost}:${BackendPort}/meetme/chats/subscribe`));
                initWsHandlers(wsChat);
            }
            if (wsReaction.IsUndef()) {
                wsReaction.Set(new WebSocket(`ws://${BackendHost}:${BackendPort}/meetme/match/subscribe`));
                initWsHandlers(wsReaction);
            }
        } catch(e) {
            console.log(e);
        }
    }
    static subscribeOnReaction(callback) {
        wsReaction.Get()?.addEventListener("message", (event) => {
            const jsonMSG = JSON.parse(event.data);
            appendChildren(notificationWrapper, create(
                <div>new notification</div>
            ));
            appendChildren(notificationWrapper, create(
                <div>new notification</div>
            ));
            appendChildren(notificationWrapper, create(
                <div>new notification</div>
            ));
            console.log(jsonMSG);
        });
    }
    static getMessage(listener) {
        wsChat.Get()?.addEventListener("message", (event) => {
            const jsonMSG = JSON.parse(event.data);

            if (jsonMSG.flag === "SEND") {
                const msgId = jsonMSG.body.msgId;
                const msg = jsonMSG.body.msg;
                const senderId = jsonMSG.body.senderId;
                const sentAt = jsonMSG.body.sentAt;
                const chatId = jsonMSG.body.chatId;
                const messageType = jsonMSG.body.messageType;
                const path = jsonMSG.body.path;
                
                listener(msgId, msg, senderId, sentAt, chatId, messageType, path);
            }
        });
    }

    static disconnect() {
        try {
            if (!wsChat.IsUndef()) {
                wsChat.Get().close();
                wsChat.Undef();
            }
        } catch(e) {
            console.log(e);
        }
    }
}
