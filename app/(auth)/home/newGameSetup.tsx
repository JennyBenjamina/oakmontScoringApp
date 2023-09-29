import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import { useEffect, useState } from 'react';
import { styles } from '../../../utils/styles';
import { Player } from '../../../types/player';
import { useUser } from '@clerk/clerk-expo';
import socket from '../../../utils/socket';
import { Link } from 'expo-router';

const newGameSetup = () => {
  const { user } = useUser();
  const [buttonColor, setButtonColor] = useState('#40c5f4');

  const [gameName, setGameName] = useState('');
  const [numPlayers, setNumPlayers] = useState('');

  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [playerHandis, setPlayerHandis] = useState<number[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  const [playerHandi, setPlayerHandi] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>('');

  const handleCreateRoom = () => {
    const newPlayers: Player[] = [];

    for (let i = 0; i < Number(numPlayers); i++) {
      const player: Player = {
        id: i.toString(),
        name: playerNames[i],
        handicap: playerHandis[i],
        totalScore: 0,
        scores: [],
        isHost: false,
      };

      if (player.name === `${user?.firstName} ${user?.lastName}`) {
        player.isHost = true;
        if (user?.id) {
          player.id = user.id;
        }
      }
      newPlayers.push(player);
    }

    setPlayers(newPlayers);

    socket.emit('createRoom', {
      groupName: gameName,
      numOfPlayers: numPlayers,
      players: newPlayers,
      user,
    });
  };

  const closeModal = () => {};

  const renderItem = ({ item }: any) => {
    switch (item.type) {
      case 'input':
        return item.component;

      default:
        return null;
    }
  };

  const handleKeyPress = () => {
    setButtonColor('#f04048');
  };

  const renderPlayerInputs = () => {
    const num = Number(numPlayers);

    if (isNaN(num) || num <= 0) {
      return null; // Return null or a message for invalid input
    }

    const playerInputs = [];

    for (let i = 1; i < num + 1; i++) {
      playerInputs.push(
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            key={i * 11}
            style={styless.playerName}
            placeholder={`Player ${i} Name`}
            onChangeText={(value) => {
              const updatedNames = [...playerNames];
              updatedNames[i - 1] = value;
              setPlayerNames(updatedNames);
            }}
          />

          <InputSpinner
            key={i * 101}
            max={36}
            min={-10}
            step={1}
            colorMax={'#f04048'}
            colorMin={'#40c5f4'}
            value={playerHandi}
            onKeyPress={handleKeyPress}
            onChange={(value: number) => {
              const updatedHandis = [...playerHandis];
              updatedHandis[i - 1] = value;
              setPlayerHandis(updatedHandis);
            }}
            buttonStyle={[
              styless.playerHandi,
              { backgroundColor: buttonColor },
            ]}
          />
        </View>
      );
    }

    return playerInputs;
  };

  const data = [
    {
      type: 'input',
      component: (
        <TextInput
          style={styless.textInput}
          placeholder="Game Name"
          value={gameName || ''}
          onChangeText={(value) => setGameName(value)}
        />
      ),
    },
    {
      type: 'input',
      component: (
        <TextInput
          style={styless.textInput}
          placeholder="Number of Players"
          value={numPlayers || ''}
          onChangeText={(value) => setNumPlayers(value)}
        />
      ),
    },
    { type: 'input', component: renderPlayerInputs() },
  ];

  return (
    <View style={styless.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={{ flex: 1, borderRadius: 20 }}
      />

      <View style={styles.modalbuttonContainer}>
        <Link href="/(auth)/home/(gameSetup)/betSetup" asChild>
          <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
            <Text style={styles.modaltext}>CREATE</Text>
          </Pressable>
        </Link>
        <Pressable
          style={[styles.modalbutton, { backgroundColor: '#E14D2A' }]}
          onPress={closeModal}
        >
          <Text style={styles.modaltext}>CANCEL</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default newGameSetup;

const styless = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 40,
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  // numPlayers: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  textInput: {
    borderWidth: 2,
    padding: 15,
    height: 60,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    // paddingHorizontal: 10,
  },
  playerName: {
    flex: 4,
    borderWidth: 1,
    margin: 10,
    height: 40,
    borderRadius: 5,
    borderColor: 'gray',
    paddingHorizontal: 15,
  },
  playerHandi: {
    flex: 1,
    margin: 20,
  },
});
