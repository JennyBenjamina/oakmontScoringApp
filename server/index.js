const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http);

const generateID = () => Math.random().toString(36).substring(2, 10);

let chatRooms = [];
let gameRooms = [];

const convertTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return timeString;
};

socketIO.on('connection', function (socket) {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('createRoom', (roomObject) => {
    const { groupName, numOfPlayers, players, user } = roomObject;

    const timeString = convertTime();

    socket.join(groupName);

    gameRooms.unshift({
      id: generateID(),
      hostId: user.id,
      name: groupName,
      player: players,
      numOfPlayers: numOfPlayers,
      createdAt: timeString,
    });

    // returns all the rooms
    socket.emit('roomsList', gameRooms);
    // returns the rooms that the user is hosting
    socket.emit(
      'myRoom',
      gameRooms.filter((room) => room.hostId === user?.id)
    );
  });

  // this returns the rooms that the user is hosting
  // 'tab curr games'
  socket.on('findMyRoom', (userId) => {
    const filteredData = gameRooms.filter((room) => room.hostId === userId);

    socket.emit('myRoom', filteredData);
  });

  // this returns the rooms that the user clicked on
  socket.on('findRoom', (id) => {
    let result = gameRooms.filter((room) => room.id == id);

    if (result.length > 0) {
      if (result[0]) {
        // THIS CONDITION NEEDS TO BE CORRECTED!!!
        // socket.emit('foundRoom', result[0].games);

        // socket.emit('foundRoom', {
        //   id: 1,
        //   title: 'Mock Room',
        //   player: [
        //     {
        //       id: 2,
        //       name: 'Jane Smith',
        //       totalScore: 120,
        //       scores: [
        //         { hole: '1', score: 3 },
        //         { hole: '2', score: 4 },
        //         { hole: '3', score: 6 },
        //         // Add more scores as needed
        //       ],
        //     },
        //     {
        //       id: 1,
        //       name: 'John Doe',
        //       totalScore: 100,
        //       scores: [
        //         { hole: '1', score: 4 },
        //         { hole: '2', score: 3 },
        //         { hole: '3', score: 5 },
        //         // Add more scores as needed
        //       ],
        //     },
        //   ],
        // });

        socket.emit('foundRoom', result[0]);
      } else {
        socket.emit('foundRoom', []);
      }
    }
  });

  socket.on('updateScore', (data) => {
    // new data needs to be leaderboard data
    const { playerId, hole, score, roomId, user } = data;

    let result = gameRooms.filter((room) => room.id == roomId);

    // if (result.length > 0) {
    //   console.log('greater than 0');
    //   socket.to(result[0].name).emit('roomMessage', newScore);
    //   result[0].games.push(newMessage);
    // }

    if (result.length > 0) {
      const updatedPlayers = result[0].player.map((player) => {
        if (player.id == playerId) {
          const holeToUpdate = player.scores.find(
            (score) => score.hole == hole
          );

          if (holeToUpdate) {
            holeToUpdate.score = score;
          } else {
            player.scores.push({ hole: hole, score: score });
          }

          player.totalScore = player.scores.reduce(
            (a, b) => a + (b['score'] || 0),
            0
          );
        }
        return player;
      });
    }

    const player = {
      // id: Number(user?.id),
      id: 3,
      // name: `${firstName} ${lastName}`,
      name: 'John Doe',
      totalScore: 0,
      scores: [
        {
          hole: '1',
          score: 0,
        },
      ],
    };

    const filteredData = gameRooms.filter((room) => room.hostId === user?.id);
    socket.emit('updateScore', filteredData); // change player. should be roomData')
  });

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

app.get('/api/games', (req, res) => {
  res.json(gameRooms);
});

const dataArray = [];
let x = 1;
for (let i = 1; i < 21; i++) {
  if (i < 20) {
    dataArray[i - x] = {
      id: i.toString(),
      hole: i,
      par: 5,
      yards: '543',
      strokeIndex: 3,
      score: '',
      background: '#FEFCAD',
    };
  }
  if (i == 9) {
    dataArray[i] = {
      id: '30',
      hole: 'out',
      par: 36,
      yards: '3500',
      strokeIndex: null,
      score: '',
      background: '#FEFCAD',
    };
    x = 0;
  }
  if (i == 19) {
    dataArray[i] = {
      id: '40',
      hole: 'in',
      par: 36,
      yards: '3700',
      strokeIndex: null,
      score: '',
      background: '#FEFCAD',
    };
  }
  if (i == 20) {
    dataArray[i] = {
      id: '50',
      hole: 'total',
      par: 72,
      yards: '6800',
      strokeIndex: null,
      score: '',
      background: '#FEFCAD',
    };
  }
}

const scorecard = { title: 'scorecard', horizontal: true, data: dataArray };

const scorecardData = {
  title: 'New Tasks',
  horizontal: true,
  data: [
    {
      id: 1,
      hole: '1',
      par: 5,
      yards: '543',
      strokeIndex: 3,
      score: 0,
    },
    {
      id: '2',
      hole: '2',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '3',
      hole: '3',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '4',
      hole: '4',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '5',
      hole: '5',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '11',
      hole: '6',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '22',
      hole: '7',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '33',
      hole: '8',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '44',
      hole: '9',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '55',
      hole: 'out',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '16',
      hole: '10',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '26',
      hole: '11',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '36',
      hole: '12',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '46',
      hole: '13',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '566',
      hole: '14',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '326',
      hole: '15',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '136',
      hole: '16',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '468',
      hole: '17',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '596',
      hole: '18',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '505',
      hole: 'In',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
    {
      id: '551',
      hole: 'Total',
      par: '5',
      yards: '543',
      strokeIndex: '3',
      score: '',
    },
  ],
};

app.get('/scorecard', (req, res) => {
  res.json(scorecard);
});

const player = {
  // id: Number(user?.id),
  id: 3,
  // name: `${firstName} ${lastName}`,
  name: 'John Doe',
  totalScore: 0,
  scores: [
    {
      hole: '1',
      score: 0,
    },
  ],
};

const player2 = {
  // id: Number(user?.id),
  id: 30,
  // name: `${firstName} ${lastName}`,
  name: 'John Smith',
  totalScore: 30,
  scores: [
    {
      hole: '13',
      score: 44,
    },
  ],
};

const player3 = {
  // id: Number(user?.id),
  id: 302,
  // name: `${firstName} ${lastName}`,
  name: 'John Smith',
  totalScore: 30,
  scores: [
    {
      hole: '13',
      score: 44,
    },
  ],
};

app.post('/api/myScores', (req, res) => {
  // const postData = req.body;
  // console.log(postData);

  // res.json({
  //   id: 100,
  //   title: 'from myScores',
  //   player: [player, player2, player3],
  // });

  res.send(gameRooms);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
