var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const nextId = 1
const players = {}

server.listen(8000);

const position = {
  x: 0,
  y: 0
}



app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  players[socket.id] = {
    color: Math.random() * 360,
    x: 0,
    y: 0
  }
  socket.emit('players', players)
  socket.broadcast.emit('players', players)
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
    // console.log(data);
  // });
  console.log(socket.connected, socket.id)

  socket.on("disconnect", (data) => {
    delete players[socket.id]
    socket.broadcast.emit('players', players)
  })

  socket.on("move", function(data) {
    let sendData = () => {
      // for (playerId of Object.keys(players)) {
      //   let x = players[playerId].x
      //   let y = players[playerId].y

      //   socket.broadcast.emit("position", {
      //     playerId: playerId,
      //     x: x,
      //     y: y
      //   })
      //   socket.emit("position", {
      //     playerId: playerId,
      //     x: x,
      //     y: y
      //   })
      // }
      console.table(players)
      socket.emit('players', players)
      socket.broadcast.emit('players', players)
    }

    // socket.on('disconnect', function () {
    //   socket.emit('disconnected');
    //   online = online - 1;

    // });

    switch(data) {
      case "left":
        players[socket.id].x -= 3;

        //socket.emit("position", position);
        sendData()
        // console.log(position);
        break;
      case "right":
        players[socket.id].x += 3;
        // socket.emit("position", position);
        sendData()
        // console.log(position);
        break;
      case "up":
        players[socket.id].y -= 3;
        // socket.emit("position", position);
        sendData()
        // console.log(position);
        break;  
      case "down":
        players[socket.id].y += 3;
        // socket.emit("position", position);
        sendData()
        // console.log(position);
        break;  
    }
  })
});



