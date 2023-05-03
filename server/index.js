const express = require('express');
const app = express();
const path = require('path');
const ws = require('ws');
const ws_connection = require('./ws');

const public = path.join(path.resolve(__dirname, '..'), 'dist');

const config = {
    PORT: 3000,
    WS_PORT: 9090,
    // HOST: "0.0.0.0"
    HOST: "192.168.0.45"
}

const wsServer = new WebSocketServer.Server({host: config.HOST, port: WS_PORT}, () => {
    console.log(`WebSocketServer is running on ${config.HOST}:${config.WS_PORT}`);
});
wsServer.on('connection', ws_connection);

app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.use('/', express.static(public));

app.listen(config.PORT, config.HOST);
