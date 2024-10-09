const express = require('express');
const app = express();
const http = require('http');
const socketIo  = require('socket.io');


const server = http.createServer(app);

const io = socketIo(server)

// app.use(express.static('public'));

app.get('/' , (req,res)=>{
    res.sendFile(__dirname + '/index.html');
})


io.on('connection',(socket)=>{
   socket.on('user-message',(messy)=>{
    socket.broadcast.emit("message",messy)
   })
})

server.listen(3000, () => console.log('Server running on port 3000'));
