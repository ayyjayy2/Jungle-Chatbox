const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/chat.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat', (data) => {
        let payload = {
            nickName: data.nickName,
            message: data.chatMsg
        }
        console.log(data)
        socket.emit('newChat', payload);
        socket.broadcast.emit('newChat', payload);
    })
})

http.listen(3000, () => {
    console.log('listening on *:3000');
});