const express = require('express');
const app = express();
const path = require('path');
const public = path.join(path.resolve(__dirname, '..'), 'public');

const config = {
    PORT: 3000,
    HOST: "192.168.0.2"
}

app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.use('/', express.static(public));

app.listen(config.PORT, config.HOST);
