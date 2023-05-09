import { BackendHost, BackendPort } from "./api";

let ws;

export class WSChatAPI {

    static connect() {
        try {
            if (ws === undefined) {
                ws = new WebSocket(`ws://${BackendHost}:${BackendPort}/meetme/chats/subscribe`);

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
                const msg = jsonMSG.body.msg;
                const senderId = jsonMSG.body.senderId;
                const sentAt = jsonMSG.body.sentAt;
                const chatId = jsonMSG.body.chatId;
                
                listener(msg, senderId, sentAt, chatId);
            }
        });
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

    // static send(sentAt, chatId, userIds, msg) {
        // const msgObject = {
        //     flag: "SEND",
        //     body: {
        //         sentAt: sentAt,
        //         chatId: chatId,
        //         userIds: userIds,
        //         msg: msg,
        //     }
        // };

        // ws.send(JSON.stringify(msgObject));
    // }

}
