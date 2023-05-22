import { WSProtocol, BackendHost, BackendPort } from "./api";

let ws;

export class WSChatAPI {

    static connect() {
        try {
            if (ws === undefined) {
                ws = new WebSocket(`${WSProtocol}://${BackendHost}:${BackendPort}/meetme/chats/subscribe`);

                ws.addEventListener('close', (event) => {
                    console.log('WebSocket connection closed:', event);
                });
                
                ws.addEventListener('error', (event) => {
                    console.log('WebSocket error:', event);
                });
            }
        } catch(e) {
            console.log(e);
        }
    }

    static getMessage(listener) {
        ws.addEventListener("message", (event) => {
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
        ws.addEventListener("message", (event) => {
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
        ws.send(JSON.stringify(readRequest));
    }

    static disconnect() {
        try {
            if (ws !== undefined) {
                ws.close();
                ws = undefined;
            }
        } catch(e) {
            console.log(e);
        }
    }
}
