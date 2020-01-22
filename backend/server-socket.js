var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('join room', room => {
        if (socket.roomName) {
            socket.leave(socket.roomName)
        }
        socket.join(room);
        socket.roomName = room;
        console.log('user joined to room: ', socket.roomName);
    });

    socket.on('message', (txt) => {
        var msgToSend = { by: socket.roomName, txt };
        io.to(socket.roomName).emit('message', msgToSend)
    });
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});









// io.on('connection', function (socket) {
//     console.log('a user connected');
//     socket.on('disconnect', function () {
//         console.log('user disconnected');
//     });
//     socket.on('chat join', function (userName) {
//         console.log(`${userName} just joined`);
//         socket.theUserName = userName;
//         // socket.emit('chat history', historyMsgs)
//         // socket.broadcast.emit('chat newJoin', userName)
//     });
//     socket.on('chat msg', function (txt) {
//         console.log('message: ' + txt);
//         var msgToSend = { by: socket.theUserName, txt };
//         // historyMsgs.push(msgToSend);
//         io.emit('chat newMsg', msgToSend);
//     });

//     socket.on('chat topic', topic => {
//         if (socket.myTopic) {
//             socket.leave(socket.myTopic)
//         }
//         socket.join(topic)
//         socket.myTopic = topic;
//     });
// });