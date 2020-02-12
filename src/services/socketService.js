import io from 'socket.io-client';
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : '//localhost:3002'
var socket;

export default { setup, terminate, on, off, emit }

function setup() {
    socket = io(BASE_URL);
}

function terminate() {
    socket = null;
}

function on(eventName, data) {
    socket.on(eventName, data)
}

function off(eventName, data) {
    socket.off(eventName, data)
}

function emit(eventName, data) {
    socket.emit(eventName, data)
}
