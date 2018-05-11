'use-strict'
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/probando', (req,res)=>{
    res.status(200).send({message:'Este es el metodo probando'});
});

var http_server = require('http').Server(app);
var io = require('socket.io')(http_server);
io.on('connection', (socket)=>{
    console.log('algien se a connectado');
});
http_server.emmit_socket = (data)=>{
    io.sockets.emit('messages', data);
    console.log(data);
    
}
module.exports = http_server;