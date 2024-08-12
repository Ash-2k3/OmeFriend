const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // Create HTTP server with Express app
const io = new Server(server); // Attach Socket.io to the HTTP server

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});

io.on('connection', (socket) => {
    console.log('A user has connected');

    socket.on('chat message', (msg) => {
           io.emit('chat message', msg);
    })


    socket.on('disconnect', () => {
               console.log('user disconnected');
    })
});

server.listen(PORT, () => {
    console.log('Listening to ' + PORT);
});
