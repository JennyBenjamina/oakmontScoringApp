import React, { useLayoutEffect, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import { styles } from '../../../utils/styles';

import {
  Player,
  gameData,
  roomData,
  leaderboardPlayer,
} from '../../../types/player';

import { useLocalSearchParams } from 'expo-router';

import { useUser } from '@clerk/clerk-expo';

import ScoreCard from '../../../components/ScoreCard';

import socket from '../../../utils/socket';
import { leaderboardData } from '../../../types/player';
import game from './[game]';

const LiveScoring = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [gameScores, setGameScores] = useState<gameData[]>([]);
  const [title, setTitle] = useState<string>('');
  const [gameRoom, setGameRoom] = useState<roomData | null>(null);
  const local = useLocalSearchParams();
  const [roomID, setRoomID] = useState<string>('');

  const { id, name } = local;

  useLayoutEffect(() => {
    socket.emit('findRoom', id);

    socket.on('foundRoom', (roomData) => {
      // console.log('useLayoutEffect');
      // console.log(roomData);
      setGameRoom(roomData);
    });
  }, []);

  useEffect(() => {
    socket.on('foundRoom', (roomData: roomData) => {
      if (roomData) {
        setGameRoom(roomData);
        setRoomID(roomData.id.toString());
      } else {
        console.log('no room found');
      }
    });

    socket.on('roomMessage', (score) => {
      // CHECK SETGAMESCORES
      console.log('score received');
      setGameScores(score);
    });
  }, [socket]);

  useEffect(() => {
    console.log('gameRoom');
    console.log(gameRoom);
  }, [gameRoom]);

  const createLeaderboard = (gameRoom: roomData | null) => {
    const leaderboard: leaderboardPlayer[] = [];
    let totalScore = 0;

    if (gameRoom) {
      gameRoom.player?.map((playerName: Player) => {
        totalScore = playerName.scores.reduce((total, score) => {
          return total + score.score;
        }, 0);

        // this code makes same names only appear once in the leaderboard
        const existingPlayer = leaderboard.find(
          (player) => player.name === playerName.name
        );

        if (existingPlayer) {
          existingPlayer.totalScore += totalScore;
          // existingPlayer.scores.push(...playerScores);
        } else {
          leaderboard.push({
            id: playerName.id, // change this to a better id
            name: playerName.name,
            totalScore,
            scores: playerName.scores,
            isHost: playerName.isHost,
          });
        }
      });

      leaderboard.sort((a, b) => a.totalScore - b.totalScore);
    }

    return leaderboard;
  };

  const leaderboard = createLeaderboard(gameRoom);

  const renderScorecard = (player: Player) => {
    return (
      <ScoreCard
        roomId={roomID}
        players={[player]}
        notEditable={true}
        handleScoreChange={() => console.log('cannot change from here')}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* MAKE THIS PART DYNAMIC FROM THE WEB SOCKET on. */}
      {/* CHECK WHAT THE GAMES KEY STORES. IT USED TO BE MESSAGES ... TIME/TEXT */}
      <Text style={styles.header}>{name}</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Player</Text>
        <Text style={styles.headerText}>Score</Text>
        <Text style={styles.headerText}>Thru</Text>
      </View>
      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedPlayer(item)}
            style={styles.row}
          >
            <Text style={styles.playerName}>{item.name}</Text>
            <Text style={styles.playerScore}>{item.totalScore}</Text>
            <Text style={styles.holeNumber}>
              {item.scores.length > 0
                ? item.scores[item.scores.length - 1]?.hole
                : 'Did Not Start'}
            </Text>
          </TouchableOpacity>
        )}
      />
      {selectedPlayer && renderScorecard(selectedPlayer)}
    </View>
  );
};

export default LiveScoring;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingBottom: 8,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerScore: {
    fontSize: 16,
  },
  holeNumber: {
    fontSize: 16,
  },
  scorecard: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    marginTop: 16,
  },
  scorecardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

// const LiveScoring = () => {
//   const { user } = useUser();

//   const [firstName, setFirstName] = useState(user?.firstName);
//   const [lastName, setLastName] = useState(user?.lastName);
//   const [username, setUsername] = useState('');

//   const local = useLocalSearchParams();

//   // USE FETCH THIS GET THIS INFORMATION FROM THE BACKEND. THIS MEANS THERE HAS TO
//   // BE A USER INTERFACE TO ENTER THE TITLE AND THE PLAYERS' NAMES.
//   const [leaderboardData, setLeaderboardData] = useState([
//     initialScorecardData,
//   ]);
//   //   {
//   //     leaderboardInfo: [
//   //       {
//   //         id: 1,
//   //         title: 'Golf Tournament',
//   //         players: [
//   //           { id: 1, name: 'Player 1', score: 3, holeNumber: 1 },
//   //           { id: 2, name: 'Player 2', score: 4, holeNumber: 1 },
//   //           { id: 3, name: 'Player 3', score: 2, holeNumber: 1 },
//   //           // Add more players and data here
//   //         ],
//   //       },
//   //     ],
//   //     selectedPlayer: null as Player | null,
//   //   },
//   // ]);

//   // const { leaderboardInfo } = leaderboardData[0];

//   const { title, players } = leaderboardData[0];
//   const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

//   const [gameScores, setGameScores] = useState<gameData[] | gameData>([]);

//   const { id, name } = local;
