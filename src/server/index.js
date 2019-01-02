var icy = require('icy');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');



module.exports = function() {
  const app = express();

  // Add headers
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });

  //initialize a simple http server
  const server = http.createServer(app);

  //initialize the WebSocket server instance
  const wss = new WebSocket.Server({ server });

  const wsConnections = {}
  let wsCounter = 0

  wss.on('connection', (ws) => {
    wsConnections[++wsCounter] = ws

    ws.on('error', () => {
      delete wsConnections[wsCounter]
    });
  });


  app.get('/station/:id', (req, res) => {
    const streamUrl = `http://ice3.somafm.com/${req.params.id}-128-mp3`

    icy.get(streamUrl, function (icyres) {
      icyres.on('metadata', function (metadata) {
        var parsed = icy.parse(metadata);

        for(let id in wsConnections) {
          let conn = wsConnections[id]
          conn.send(JSON.stringify({
            room: 'ChannelMeta',
            data: parsed,
            station: req.params.id
          }))
        }
      });

      res.set('content-type', 'audio/mp3');

      icyres.pipe(res)

      req.on(['close', 'end'], () => {
        res.end()
      })
    })
  })


  //start our server
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
  });
}

// const app = express()
// const port = 3000

// // URL to a known ICY stream
// var url = 'http://ice3.somafm.com/groovesalad-128-mp3';

// app.get('/', (req, res) => {
//   // connect to the remote stream
//   icy.get(url, function (icyres) {

//     // log any "metadata" events that happen
//     icyres.on('metadata', function (metadata) {
//       var parsed = icy.parse(metadata);
//       console.error('parsed: ', parsed);
//     });

//     res.set('content-type', 'audio/mp3');

//     // send the (audio) stream to express' response
//     icyres.pipe(res)

//     // end request to express
//     req.on(['close', 'end'], () => {
//       res.end()
//     })
//   });

// })

// console.log(`listening on port ${port}`)
// app.listen(port)
