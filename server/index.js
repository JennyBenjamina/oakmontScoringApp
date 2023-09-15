const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require('http').Server(app);
const cors = require('cors');
const { time } = require('console');

// const corsOptions = {
//   origin: 'http://192.168.1.69:4000', // Replace with your React Native app's IP address
// };

app.use(cors());

const socketIO = require('socket.io')(http);

const generateID = () => Math.random().toString(36).substring(2, 10);

let chatRooms = [];

let messages = [];

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
    //👇🏻 Updates the chatroom messages
    // console.log(result);
    if (result) {
      socket.to(result[0].name).emit('roomMessage', newMessage);
    }

    messages.push(newMessage);
    socket.emit('roomMessage', messages);
    console.log(messages);

    // socket.emit('roomMessage', newMessage);
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api', (req, res) => {
  res.json(chatRooms);
});

const scorecardData = [
  {
    title: 'New Tasks',
    horizontal: true,
    data: [
      {
        id: '1',
        hole: '1',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '2',
        hole: '2',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '3',
        hole: '3',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '4',
        hole: '4',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '5',
        hole: '5',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '11',
        hole: '6',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '22',
        hole: '7',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '33',
        hole: '8',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '44',
        hole: '9',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '55',
        hole: 'out',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '16',
        hole: '10',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '26',
        hole: '11',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '36',
        hole: '12',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '46',
        hole: '13',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '566',
        hole: '14',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '326',
        hole: '15',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '136',
        hole: '16',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '468',
        hole: '17',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '596',
        hole: '18',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '505',
        hole: 'In',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
      {
        id: '551',
        hole: 'Total',
        par: '5',
        yards: '543',
        strokeIndex: '3',
      },
    ],
  },
];

app.get('/scorecard', (req, res) => {
  res.json(scorecardData);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
