import { Pressable, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import Game from '../../../components/Game';
import { Feather } from '@expo/vector-icons';
import { styles } from '../../../utils/styles';
import Modal from '../../../components/Modal';

import socket from '../../../utils/socket';
const game = () => {
  const { game } = useLocalSearchParams();
  return (
    <View>
      {game === 'newgame' ? (
        <>
          <Stack.Screen options={{ headerTitle: 'Games' }} />
          <Game />
        </>
      ) : (
        <>
          <Stack.Screen options={{ headerTitle: `Current Game` }} />
        </>
      )}
    </View>
  );
};

export default game;
