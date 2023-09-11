const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require('http').Server(app);
const cors = require('cors');
const { time } = require('console');

app.use(cors());

const socketIO = require('socket.io')(http);

const generateID = () => Math.random().toString(36).substring(2, 10);

let chatRooms = [];

socketIO.on('connection', function (socket) {
  console.log(`⚡: ${socket.id} user just connected!`);
  // console.log('a user connected');

  socket.on('chat message', function (msg) {
    console.log('message from index: ' + msg);
    socket.emit('chat message', 'coming from emit fro index ' + msg);
  });

  socket.on('createRoom', (roomName) => {
    const currentTime = new Date(); // Create a new Date object

    // Get hours, minutes, and seconds
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    // Format hours, minutes, and seconds to ensure they have two digits
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Create a string in the "HH:MM:SS" format
    const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    socket.join(roomName);
    //👇🏻 Adds the new group name to the chat rooms array
    chatRooms.unshift({
      id: generateID(),
      name: roomName,
      messages: [
        {
          text: '',
          time: timeString,
          id: generateID(),
          user: 'clerk user',
        },
      ],
    });

    //👇🏻 Returns the updated chat rooms via another event
    socket.emit('roomsList', chatRooms);
  });

  // socket.on('findRoom', (id) => {
  //   //👇🏻 Filters the array by the ID
  //   let result = chatRooms.filter((room) => room.id == id);
  //   console.log(result[0].messages);
  //   //👇🏻 Sends the messages to the app
  //   socket.emit('foundRoom', result[0].messages[0]);
  // });

  // WORKING ON THIS !!!!!!!!!!!!!!!!!
  socket.on('newMessage', (data) => {
    //👇🏻 Destructures the property from the object
    const { room_id, message, user, timestamp } = data;
    console.log('from data');
    console.log(room_id);
    //👇🏻 Finds the room where the message was sent
    let result = chatRooms.filter((room) => room.id == room_id);

    //👇🏻 Create the data structure for the message
    const newMessage = {
      id: generateID(),
      text: message,
      time: `${timestamp.hour}:${timestamp.mins}`,
      user: user.fullName,
    };
    console.log(newMessage);
    //👇🏻 Updates the chatroom messages
    // socket.to(result[0].name).emit('roomMessage', newMessage);
    socket.emit('roomMessage', newMessage);
    // result[0].messages.push(newMessage);
    // console.log(result[0].roomName);

    //👇🏻 Trigger the events to reflect the new changes
    socket.emit('roomsList', chatRooms);
    // socket.emit('foundRoom', result[0].messages);
  });
  // working on this!!!!!!!!!

  socket.on('disconnect', function () {
    socket.disconnect();
    console.log('user disconnected');
  });
});

app.get('/api', (req, res) => {
  res.json(chatRooms);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
