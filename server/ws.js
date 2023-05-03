let userIdClients = new Map();
let id = 1;

module.exports = function onConnect(wsClient) {
    wsClient.send(JSON.stringify({
        flag: "CONN+ASK",
        status: 200,
    }));
    
    wsClient.on('message', function(message) {

        const jsonMSG = JSON.parse(message);

        switch (jsonMSG.flag) {
        case "REG":
            const userId = jsonMSG.body.userId;
            wsClient.userId = userId;
            wsClient.id = id;
            id++;
        
            console.log('В запросе REG от %d получены данные: %s', wsClient.userId, jsonMSG);

            let clientsByUser = userIdClients.get(userId);

            if (clientsByUser === undefined || clientsByUser.length === 0) {
                userIdClients.set(userId, [wsClient]);
            }
            if (clientsByUser.length > 0) {
                clientsByUser.push(wsClient);
                userIdClients.set(userId, clientsByUser);
            } else {
                wsClient.send(JSON.stringify({
                    flag: "REG+ASK",
                    status: 404,
                    err: `Не удается зарегистрировать пользователя ${userId} на сервере.`,
                }));
                return;
            }

            wsClient.send(JSON.stringify({
                flag: "REG+ASK",
                status: 200,
            }));

            break;
        case "SEND":
            console.log('В запросе SEND от %d получены данные: %s', wsClient.userId, jsonMSG);

            const msg = jsonMSG.body.msg;
            const userIds = jsonMSG.body.userIds;
            const chatId = jsonMSG.body.chatId;

            userIds.forEach(userId => {
                const clientsByUser = userIdClients.get(userId);
                if (clientsByUser === undefined || clientsByUser.length === 0) {
                    return;
                }
                if (clientsByUser.length > 0) {
                    clientsByUser.forEach(receiverWsClient => {
                        if (receiverWsClient === undefined) {
                            return;
                        }
                        receiverWsClient.send(
                            JSON.stringify({
                                flag: "SEND",
                                body: {
                                    chatId,
                                    senderId: wsClient.userId,
                                    msg,
                                    sendAt: getNowTime(),
                                },
                            })
                        );
                    });
                } else {
                    wsClient.send(JSON.stringify({
                        flag: "SEND+ASK",
                        status: 500,
                        err: `Не удалось отправить сообщение '${msg}' пользователю ${userId}`,
                    }));
                    return;
                }
            });
            break;
        }
    });
    
    wsClient.on('close', () => {
        let clientsByUser = userIdClients.get(wsClient.userId);
        userIdClients.set(userId, clientsByUser.filter(client => client.id !== wsClient.id));
        console.log('Соединение с клиентом %d закрыто', wsClient.id);
    });
};

function getNowTime() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0');
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let year = now.getFullYear().toString();
    let formattedDate = `${hours}:${minutes} ${day}.${month}.${year}`;
    
    return formattedDate;
}
