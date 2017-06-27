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
    usocket = {};
io.on('connection', function(socket) {
    socket.on('user login', (name) => {
        userList.push(name)
        usocket[name] = socket;
        io.emit('user login', name);
        io.emit('render online', userList)
    });
    socket.on('typing', (name) => {
        io.emit('typing', name);
    });
    socket.on('chat message', (name, msg, to) => {
        if (!to) {
            io.emit('chat message', name, msg);
        } else {
            usocket[to].emit('get private message', name, msg);
        }
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
