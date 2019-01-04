var icy = require('icy');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

module.exports = function() {
  const app = express();

  // add headers
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  // Websocket

  const server = http.createServer(app);

  const wss = new WebSocket.Server({ server });

  const wsConnections = {}
  let wsCounter = 0

  // manage websocket connections
  wss.on('connection', (ws) => {
    wsConnections[++wsCounter] = ws

    ws.on('error', () => {
      delete wsConnections[wsCounter]
    });

    ws.on('close', () => {
      delete wsConnections[wsCounter]
    });
  });

  // channel audio streaming

  // audio stream for SomaFM station
  app.get('/audio/:station_id/:channel_id', (req, res) => {
    const streamUrl = `http://ice3.somafm.com/${req.params.channel_id}-128-mp3`

    icy.get(streamUrl, function (icyres) {
      icyres.on('metadata', function (metadata) {
        Object.keys(wsConnections)
          .map(id => wsConnections[id])
          .filter(conn => conn.readyState === WebSocket.OPEN)
          .map(conn => {
            conn.send(JSON.stringify({
              room: 'ChannelMeta',
              data: icy.parse(metadata),
              station: req.params.channel_id
            }))
          })
      });

      res.set('content-type', 'audio/mp3');

      icyres.pipe(res)

      req.on('close', () => {
        icyres.end()
        res.end()
      })

      req.on('end', () => {
        icyres.end()
        res.end()
      })

      req.on('error', () => {
        icyres.end()
        res.end()
      })

    })
  })

  server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
  });
}
