const gameSchema = new mongoose.Schema({
  name: String,
  hostId: String,
  player: Array,
  numOfPlayers: Number,
  createdAt: String,
  game: Object,
  gameStatus: String,
});

const Game = mongoose.model('Game', gameSchema);

const playerSchema = new mongoose.Schema({
  name: String,
  id: String,
  score: Number,
  isHost: Boolean,
  isReady: Boolean,
  isTurn: Boolean,
  isWinner: Boolean,
  isLoser: Boolean,
  isDraw: Boolean,
});

const Player = mongoose.model('Player', playerSchema);

export { Game, Player };
