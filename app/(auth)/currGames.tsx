import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/clerk-expo';
import ScoreCard from '../../components/ScoreCard';
import { Player } from '../../types/player';

import socket from '../../utils/socket';
import { FlatList } from 'react-native-gesture-handler';

const scorecard = () => {
  const { user } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [players, setPlayers] = useState<Player[]>([] as Player[]);
  const [postData, setPostData] = useState({});
  const [rooms, setRooms] = useState([] as any);

  useLayoutEffect(() => {
    socket.emit('findMyRoom', user?.id);

    // socket.on('myRoom', (roomData) => {
    //   // console.log('from scorecard tab');
    //   console.log('socket myRoom');
    //   console.log(roomData);
    //   if (roomData) {
    //     // console.log('inside room data');
    //     setRooms(roomData);
    //     setPlayers(roomData.player);
    //   }
    // });
  }, []);

  const onSaveUser = async () => {
    try {
      const result = await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
      console.log(result);
    } catch (err: any) {
      alert(err);
    }
  };

  useEffect(() => {
    socket.on('myRoom', (roomData) => {
      if (roomData) {
        setRooms(roomData);
      }
    });

    socket.on('updateScore', (scoreData) => {
      if (scoreData) {
        setRooms(scoreData);
      }
    });
  }, []);

  // handle new score here!!!
  // const handleScoreChange = (
  //   playerId: string,
  //   hole: string,
  //   score: number,
  //   roomId: string
  // ) => {

  //   socket.emit('updateScore', { playerId, hole, score, roomId, user });
  // };

  const handleScoreChange = useCallback(
    (playerId: string, hole: string, score: number, roomId: string) => {
      const updatedRooms = rooms.map((room: any) => {
        if (room.id === roomId) {
          const updatedPlayers = room.player.map((player: any) => {
            if (player.id === playerId) {
              const updatedScores = player.scores.map((item: any) => {
                if (item.hole === hole) {
                  return { ...item, score };
                }
                return item;
              });
              return { ...player, scores: updatedScores };
            }
            return player;
          });
          return { ...room, player: updatedPlayers };
        }
        return room;
      });
      setRooms(updatedRooms);

      socket.emit('updateScore', { playerId, hole, score, roomId, user });
    },
    [rooms, setRooms, socket, user]
  );

  return (
    <View style={styles.container}>
      {rooms.length === 0 ? (
        <Text>No Games</Text>
      ) : rooms.length > 1 ? (
        <FlatList
          data={rooms}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <ScoreCard
                roomId={item.id}
                players={item.player}
                notEditable={false}
                handleScoreChange={handleScoreChange}
              />
            </View>
          )}
        />
      ) : (
        <ScoreCard
          roomId={rooms[0].id}
          players={rooms[0].player}
          notEditable={false}
          handleScoreChange={handleScoreChange}
        />
      )}
    </View>
  );
};

export default scorecard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderwidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
});
