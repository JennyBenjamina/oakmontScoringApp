import { Pressable, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import Game from '../../../components/Game';
import Chat from '../../../components/Chat';
import { Feather } from '@expo/vector-icons';
import { styles } from '../../../utils/styles';
import Modal from '../../../components/Modal';

import SocketIOClient from 'socket.io-client';

const socket = SocketIOClient('http://192.168.1.69:4000');

const game = () => {
  const [visible, setVisible] = useState(false);

  const { game } = useLocalSearchParams();
  return (
    <View>
      {game === 'newgame' ? (
        <>
          <Stack.Screen options={{ headerTitle: `New Game` }} />
          {/* <Game /> */}
          <Chat socket={socket} />
        </>
      ) : (
        <>
          <Stack.Screen options={{ headerTitle: `Current Game` }} />
          <Chat socket={socket} />
        </>
      )}
      {/* {visible ? <Modal setVisible={setVisible} socket={socket} /> : ''} */}
    </View>
  );
};

export default game;
