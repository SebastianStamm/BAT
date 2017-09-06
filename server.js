const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

app.use(express.static('./'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let controller = null;
let player = null;

wss.on('connection', function connection(ws) {
//   const location = url.parse(ws.upgradeReq.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('close', function close() {
    if(controller === ws && player) {
        player.send('DISCONNECTED');
    }
    if(player === ws && controller) {
        controller.send('DISCONNECTED');
    }
  });

  ws.on('message', function incoming(message) {
    console.log(message);
    const parts = message.split(' ');

    if(parts[0] === 'INIT' && parts[1] === 'CONTROLLER') {
        controller = ws;
        if(player) {
            player.send('CONNECTED');
            controller.send('CONNECTED');
        }
        return;
    }
    if(parts[0] === 'INIT' && parts[1] === 'PLAYER') {
        player = ws;
        if(controller) {
            player.send('CONNECTED');
            controller.send('CONNECTED');
        }
        return;
    }

    if(ws === player && controller) {
        controller.send(message);
    }
    if(ws === controller && player) {
        player.send(message);
    }
  });
});

server.listen(8085, function listening() {
  console.log('Listening on %d', server.address().port);
});