import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { useRouter, Link } from 'expo-router';
import { styles } from '../utils/styles';

const GameComponent = ({ item, socket }) => {
  const router = useRouter();

  const [msgs, setMsgs] = useState({ text: '', time: '' });

  //👇🏻 Retrieves the last message in the array from the item prop
  // FIX THIS TO SHOW WHOS IN THE LEAD RATHER THAN THE LAST MESSAGE
  // below is the items that are passed in from the Game.tsx
  // gameRooms.unshift({
  //   id: generateID(),
  //   name: groupName,
  //   players: playerNames,
  //   numOfPlayers: numOfPlayers,
  //   games: [],
  // });

  // this is the data structure for the games array
  // id: string;
  // hole: string;
  // par: number;
  // yards: string;
  // strokeIndex: number;
  // score: string;
  // background: string;

  return (
    <Link href={{ pathname: '/home/LiveScoring', params: item }} asChild>
      <Pressable style={styles.cchat}>
        <Ionicons name="book" size={45} color="black" style={styles.cavatar} />

        <View style={styles.crightContainer}>
          <View>
            <Text style={styles.cusername}>{item.name}</Text>

            <Text style={styles.cmessage}>
              {msgs?.text ? msgs.text : 'Tap to see live scores'}
            </Text>
          </View>
          <View>
            <Text style={styles.ctime}>
              {item?.createdAt ? item.createdAt : 'now'}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default GameComponent;
