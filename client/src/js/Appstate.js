import {
    observable,
    extendObservable
} from 'mobx';
import io from 'socket.io-client'
const socket = io()

export const Appstate = observable({
    username: null,
    messages: [],
    onlineList: [],
    toastMessage: '',
    toastOpen: false,
    privateMessage: observable.map({}),
    to: null
});

Appstate.setUserName = function (name) {
    this.username = name
    socket.emit('user login', name);
}
Appstate.isTyping = function () {
    socket.emit('typing', this.username);
}
Appstate.sendMessage = function (msg) {
    socket.emit('chat message', this.username, msg, this.to);
    if (this.to) {
        if (!this.privateMessage.has(this.to)) {
            this.privateMessage.set(this.to, []);
        }
        let arr = this.privateMessage.get(this.to)
        arr.push({
            username: this.username,
            msg: msg
        })
        this.privateMessage.set(this.to, arr);
    }
}
Appstate.changeTo = function (to) {
    this.to = to
}
socket.on('chat message', (username, msg) => {
    Appstate.messages.push({
        username: username,
        msg: msg
    })
});

socket.on('get private message', (name, msg) => {
    if (!Appstate.privateMessage.has(name)) {
        Appstate.privateMessage.set(name, []);
    }
    let arr = Appstate.privateMessage.get(name)
    arr.push({
        username: name,
        msg: msg
    }) 
    Appstate.privateMessage.set(name, arr);
})


socket.on('typing', (username) => {
    Appstate.toastMessage = username + ' is typing'
    Appstate.toastOpen = true
    setTimeout(() => {
        Appstate.toastOpen = false
    }, 2000)
});

socket.on('user disconnected', (username) => {
    Appstate.toastMessage = username + ' left the room'
    Appstate.toastOpen = true
    setTimeout(() => {
        Appstate.toastOpen = false
    }, 2000)
});

socket.on('user login', (username) => {
    Appstate.toastMessage = username + ' entered the room'
    Appstate.toastOpen = true
    setTimeout(() => {
        Appstate.toastOpen = false
    }, 2000)
});

socket.on('render online', (list) => {
    Appstate.onlineList = list
});
window.onunload = () => {
    socket.emit('user disconnected', Appstate.username);
}