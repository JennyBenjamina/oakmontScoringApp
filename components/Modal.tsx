import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from '../utils/styles';
// import socket from '../utils/socket';
import { useUser } from '@clerk/clerk-expo';

import { Player, ModalProps } from '../types/player';

const Modal: React.FC<ModalProps> = ({ setVisible, socket }) => {
  const [groupName, setGroupName] = useState<string>('');
  const [numOfPlayers, setNumPlayers] = useState<string>('');
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  const [players, setPlayers] = useState<Player[]>([]);

  const { user } = useUser();

  //👇🏻 Function that closes the Modal component
  const closeModal = () => setVisible(false);

  //👇🏻 Logs the group name to the console

  const handlePlayerNameChange = (index: number, value: string) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = value;
    setPlayerNames(updatedNames);
  };

  const handleCreateRoom = () => {
    const newPlayers: Player[] = [];

    for (let i = 0; i < playerNames.length; i++) {
      const player: Player = {
        id: i.toString(),
        name: playerNames[i],
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
      groupName,
      numOfPlayers,
      players: newPlayers,
      user,
    });

    console.log(newPlayers);
    closeModal();
  };

  const renderPlayerInputs = () => {
    const num = Number(numOfPlayers);

    if (isNaN(num) || num <= 0) {
      return null; // Return null or a message for invalid input
    }

    const playerInputs = [];

    for (let i = 0; i < num; i++) {
      playerInputs.push(
        <TextInput
          key={i}
          style={styles.modalinput}
          placeholder={`Player ${i + 1} Name`}
          onChangeText={(value) => {
            const updatedNames = [...playerNames];
            updatedNames[i] = value;
            setPlayerNames(updatedNames);
          }}
        />
      );
    }

    return playerInputs;
  };

  const playerInputs = [];

  for (let i = 0; i < Number(numOfPlayers); i++) {
    playerInputs.push(
      <TextInput
        key={i}
        style={styles.modalinput}
        placeholder={`Player ${i + 1}`}
        onChangeText={(value) => handlePlayerNameChange(i, value)}
      />
    );
  }

  const renderItem = ({ item }: any) => {
    switch (item.type) {
      case 'input':
        return item.component;

      default:
        return null;
    }
  };

  const data = [
    {
      type: 'input',
      component: (
        <TextInput
          style={styles.modalinput}
          placeholder="Game Name"
          onChangeText={(value) => setGroupName(value)}
        />
      ),
    },
    {
      type: 'input',
      component: (
        <TextInput
          style={styles.modalinput}
          placeholder="Number of Players"
          onChangeText={(value) => setNumPlayers(value)}
        />
      ),
    },
    { type: 'input', component: renderPlayerInputs() },
  ];

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalsubheading}>Enter your Game Name</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.modalbuttonContainer}>
        <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
          <Text style={styles.modaltext}>CREATE</Text>
        </Pressable>
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

export default Modal;
