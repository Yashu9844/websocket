const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handling room joining
    socket.on('join-room', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    // Handling messages sent to a specific room
    socket.on('user-message', ({ message, room }) => {
        // Send the message to everyone in the room except the sender
        socket.to(room).emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected ${socket.id}`);
        
    });
});

server.listen(3000, () => console.log('Server running on port 3000'));
