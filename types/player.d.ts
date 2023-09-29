export interface Player {
  isHost: boolean;
  id: string;
  name: string;
  totalScore: number;
  handicap: number;
  scores: {
    hole: string;
    score: number;
  }[];
}

export interface roomData {
  id: number;
  title: string;
  player: Player[];
}

export interface leaderboardData {
  id: number;
  title: string;
  players: Player[];
}

export interface ScoreCardProps {
  players: Player[];
  notEditable: boolean;
  handleScoreChange: (
    playerId: string,
    hole: string,
    score: number,
    roomId: string
  ) => void;
  roomId: string;
}

export interface ModalProps {
  setVisible: (visible: boolean) => void;
  socket: SocketIOClient.Socket;
}

export type gameData = {
  id: string;
  hole: string;
  par: number;
  yards: string;
  strokeIndex: number;
  score: string;
  background: string;
};

export type ScorecardData = {
  title: string;
  horizontal: boolean;
  data: gameData[];
};

export interface leaderboardPlayer {
  id: string;
  name: string;
  totalScore: number;
  isHost: boolean;
  scores: {
    hole: string;
    score: number;
  }[];
}
