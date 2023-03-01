const http = require('http');
const fs = require('fs');

const page404 = fs.readFileSync('public/page404.html');
const SERVER_PORT = 3000;

const server = http.createServer((req, res) => {
    const {url} = req;
    console.log('url :: ', url);
    const normalizeUrl = url === '/' ? '/Header.html' : url;
    const filepath = `./server/components${normalizeUrl}`

    fs.readFile(filepath, (err, data) => {
        if (err) {
            console.log('err :: ', err);
            res.write(page404);
            res.end();
        } else {
            console.log('received data :: ' + data);
            res.write(data);
            res.end();
        }
    })

});



server.listen(SERVER_PORT);