var icy = require('icy');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

module.exports = function() {
  new Promise((resolve, reject) => {

    wss.on('connection', (ws) => {
      resolve(ws);

      ws.on('message', (message) => {
          console.log('received: %s', message);
          ws.send(`Hello, you sent -> ${message}`);
      });

      ws.send('Hi there, I am a WebSocket server');
    });

  })
    .then(ws => {
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

      app.get('/station/:id', (req, res) => {
        // console.log(req.params)
        // ws.send(req.params.id)
        // res.send('foff')

        const streamUrl = `http://ice3.somafm.com/${req.params.id}-128-mp3`
        ws.send(`start stream for ${streamUrl}`)

        icy.get(streamUrl, function (icyres) {
          icyres.on('metadata', function (metadata) {
            var parsed = icy.parse(metadata);
            // console.error('parsed: ', parsed);
            // console.log(typeof parsed)
            // console.log('metadata: ', metadata)
            // ws.send('metadata?')
            ws.send(JSON.stringify(parsed))
          });

          res.set('content-type', 'audio/mp3');

          icyres.pipe(res)

          req.on(['close', 'end'], () => {
            res.end()
          })
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
