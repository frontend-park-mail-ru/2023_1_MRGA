import {
    MatchNotification,
    NotificationPopupDispatcher,
    notificationWrapper
} from "components/App/notification/notification";
import { WSProtocol, BackendHost, BackendPort } from "./api";
import {render} from "@/lib/jsx/render";

export const MATCH_NOTIFICATION_TYPES = {
    NEW_MATCH: "new_match",
    MISSED_MATCH: "missed_match"
}

const getConnectionObject = () => {
    let connection = undefined;
    let listeners = {};
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
    const GetListeners = () => {
        return listeners;
    }
    const SetListeners = (newListeners) => {
        listeners = newListeners;
    }

    return {connection, Undef, Set, IsUndef, Get, GetListeners, SetListeners}
};

let wsChat = getConnectionObject();
let wsReaction = getConnectionObject();

const onWsError = (event) => {
    console.log('WebSocket error:', event);
};

const onWsClose = (connectionObject, callback, event) => {
    console.log('WebSocket connection closed:', event);
    connectionObject.Undef();
    connectionObject.Set(new WebSocket(`${WSProtocol}://${BackendHost}:${BackendPort}/api/auth/chats/subscribe`));
    if (typeof callback === 'function') {
        callback();
    }
    initWsHandlers(connectionObject);
};

const initWsHandlers = (wsConnection, closeCallback) => {
    wsConnection.Get().addEventListener('close', onWsClose.bind(null, wsConnection, closeCallback));
    wsConnection.Get().addEventListener('error', onWsError);
}

export class WSChatAPI {

    static connect() {
        try {
            if (wsChat.IsUndef()) {
                wsChat.Set(new WebSocket(`${WSProtocol}://${BackendHost}:${BackendPort}/api/auth/chats/subscribe`));
                initWsHandlers(wsChat);
            }
            if (wsReaction.IsUndef()) {
                wsReaction.Set(new WebSocket(`${WSProtocol}://${BackendHost}:${BackendPort}/api/auth/match/subscribe`));
                const closeCallback = () => {
                    const values = Object.values(wsReaction.GetListeners());
                    console.log(values);
                    values.forEach((value) => {
                        wsReaction.Get()?.addEventListener("message", (event) => {
                            const jsonMSG = JSON.parse(event.data);
                            console.log(value);
                            value(jsonMSG);
                            NotificationPopupDispatcher.showModal();
                            setTimeout(() => {
                                NotificationPopupDispatcher.hideModal();
                            }, 3000);
                        });
                    })
                };
                initWsHandlers(wsReaction, closeCallback);
            }
        } catch(e) {
            console.log(e);
        }
    }

    static subscribeOnReaction(callback, id) {
        if (!wsReaction.GetListeners()[id]) {
            wsReaction.GetListeners()[id] = callback;
            console.log(wsReaction.GetListeners()[id]);
            wsReaction.Get()?.addEventListener("message", (event) => {
                const jsonMSG = JSON.parse(event.data);
                wsReaction.GetListeners()[id](jsonMSG);
                NotificationPopupDispatcher.showModal();
                setTimeout(() => {
                    NotificationPopupDispatcher.hideModal();
                }, 3000);
            });
        }
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

    static getReadStatus(listener) {
        wsChat.Get()?.addEventListener("message", (event) => {
            const jsonMSG = JSON.parse(event.data);

            if (jsonMSG.flag === "READ") {
                const readData = {
                    senderId: jsonMSG.body.senderId,
                    chatId: jsonMSG.body.chatId,
                };
                listener(readData);
            }
        });
    }

    static sendReadStatus(readData) {
        const readRequest = {
            flag: "READ",
            readData: readData,
        }
        wsChat.Get()?.send(JSON.stringify(readRequest));
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
