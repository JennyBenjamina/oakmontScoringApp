import SocketIOClient from 'socket.io-client';

const socket = SocketIOClient('http://192.168.1.69:4000');

export default socket;
