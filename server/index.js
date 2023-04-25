const express = require('express');
const app = express();
const path = require('path');
const public = path.join(path.resolve(__dirname, '..'), 'dist');

const config = {
    PORT: 3000,
    HOST: "192.168.0.45"
}

app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.use('/', express.static(public));

app.listen(config.PORT, config.HOST);
