const Koa = require('koa');
const app = new Koa();
var path = require('path')
var io = require('socket.io')(http);

app.use(require('koa-static')(path.join(__dirname, '..', 'client')));
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

var http = require('http').Server(app.callback());
http.listen(3000);