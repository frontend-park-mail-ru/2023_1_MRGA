import {
    NotificationPopupDispatcher,
} from "components/App/notification/notification";
import { WSProtocol, BackendHost, BackendPort } from "./api";

export const MATCH_NOTIFICATION_TYPES = {
    NEW_MATCH: "new_match",
    MISSED_MATCH: "missed_match",
};

const getConnectionObject = () => {
    let connection = undefined;
    let listeners = {};
    const Undef = () => {
        connection = undefined;
    };
    const Set = (newConnection) => {
        connection = newConnection;
    };
    const IsUndef = () => {
        return connection === undefined;
    };
    const Get = () => {
        return connection;
    };
    const GetListeners = () => {
        return listeners;
    };
    const SetListeners = (newListeners) => {
        listeners = newListeners;
    };

    return {connection, Undef, Set, IsUndef, Get, GetListeners, SetListeners};
};

const wsChat = getConnectionObject();
const wsReaction = getConnectionObject();

const onWsError = (event) => {
    console.log("WebSocket error:", event);
};

const onWsClose = (connectionObject, callback, url, event) => {
    console.log("WebSocket connection closed:", event);
    connectionObject.Undef();
    connectionObject.Set(new WebSocket(url));
    console.log("ws connection:", connectionObject.Get());
    if (typeof callback === "function") {
        callback();
    }
    if (connectionObject === wsReaction) {
        initWsHandlers(connectionObject, reactionCloseCallback, url);
    }
    if (connectionObject === wsChat) {
        initWsHandlers(connectionObject, chatCloseCallback, url);
    }

};

const reactionCloseCallback = () => {
    const values = Object.entries(wsReaction.GetListeners());
    wsReaction.SetListeners({});
    wsReaction.Get().addEventListener("open", () => {
        console.log("connection opened for reaction");
        values.forEach(([key, value]) => {
            wsReaction.GetListeners()[key] = value;
            wsReaction.Get()?.addEventListener("message", value);
        });
    });

};

const chatCloseCallback = () => {
    const values = Object.entries(wsChat.GetListeners());
    wsChat.SetListeners({});
    wsChat.Get().addEventListener("open", () => {
        console.log("connection opened for chat");
        values.forEach(([key, value]) => {
            wsChat.GetListeners()[key] = value;
            wsChat.Get()?.addEventListener("message", value);
        });
    });

};

const initWsHandlers = (wsConnection, closeCallback, url) => {
    wsConnection.Get().addEventListener("close", onWsClose.bind(null, wsConnection, closeCallback, url));
    wsConnection.Get().addEventListener("error", onWsError);
};

export class WSChatAPI {

    static connect() {
        try {
            if (wsChat.IsUndef()) {
                const chatURL = `${WSProtocol}://${BackendHost}:${BackendPort}/api/auth/chats/subscribe`;
                wsChat.Set(new WebSocket(chatURL));
                initWsHandlers(wsChat, chatCloseCallback, chatURL);
            }
            if (wsReaction.IsUndef()) {
                const reactionURL = `${WSProtocol}://${BackendHost}:${BackendPort}/api/auth/match/subscribe`;
                wsReaction.Set(new WebSocket(reactionURL));
                initWsHandlers(wsReaction, reactionCloseCallback, reactionURL);
            }
        } catch(e) {
            console.log(e);
        }
    }

    static subscribeOnReaction(callback, id) {
        if (!wsReaction.GetListeners()[id]) {
            const handler = (event) => {
                // debugger;
                console.log("event: ", event);
                const data = event.data;
                const jsonMSG = JSON.parse(data);
                console.log("data: ", data);
                console.log("json: ", jsonMSG);
                callback(jsonMSG);
                NotificationPopupDispatcher.showModal();
                // setTimeout(() => {
                //     NotificationPopupDispatcher.hideModal();
                // }, 3000);
            };
            wsReaction.GetListeners()[id] = handler;
            wsReaction.Get()?.addEventListener("message", handler);
        }
    }
    static getMessage(listener, id) {
        if (!wsChat.GetListeners()[id]) {
            console.log("get message id:", id);
            const callback = (event) => {
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
            };
            wsChat.GetListeners()[id] = callback;
            wsChat.Get()?.addEventListener("message", callback);

        }

    }

    static getReadStatus(listener, id) {
        console.log("id:", id);
        if (!wsChat.GetListeners()[id]) {
            const callback = (event) => {
                const jsonMSG = JSON.parse(event.data);

                if (jsonMSG.flag === "READ") {
                    const readData = {
                        senderId: jsonMSG.body.senderId,
                        chatId: jsonMSG.body.chatId,
                    };
                    listener(readData);
                }
            };
            wsChat.Get()?.addEventListener("message", callback);
            wsChat.GetListeners()[id] = callback;
        }
    }

    static sendReadStatus(readData) {
        const readRequest = {
            flag: "READ",
            readData: readData,
        };
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
