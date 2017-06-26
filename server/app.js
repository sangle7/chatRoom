var Express = require('express');
const app = new Express();
var http = require('http').Server(app);
var path = require('path')
var io = require('socket.io')(http);


app.use(Express.static(path.join(__dirname, '..', 'client')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
});
var userList = [],
    number = 0
io.on('connection', function(socket) {
    socket.on('user login', (name) => {
        userList.push(name)
        io.emit('user login', name);
        io.emit('render online', userList)
    });
    socket.on('typing', (name) => {
        io.emit('typing', name);
    });
    socket.on('chat message', (name, msg) => {
        io.emit('chat message', name, msg);
    });
    socket.on('user disconnected', (name) => {
        var index = userList.indexOf(name)
        userList.splice(index, 1)
        io.emit('user disconnected', name);
        io.emit('render online', userList)
    });
});
http.listen(3000, function() {
    console.log('listening on *:3000');
});
