import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { useRouter, Link } from 'expo-router';
import { styles } from '../utils/styles';

import LiveScoring from '../app/(auth)/home/LiveScoring';

const GameComponent = ({ item, socket }) => {
  const router = useRouter();

  const [msgs, setMsgs] = useState({ text: '', time: '' });

  //👇🏻 Retrieves the last message in the array from the item prop
  useEffect(() => {
    if (item && item.messages.length > 0) {
      setMsgs({
        text: item.messages[item.messages.length - 1].text,
        time: item.messages[item.messages.length - 1].time,
      });
    }
    console.log(item);
  }, []);

  return (
    <Link href={{ pathname: '/home/LiveScoring', params: item }} asChild>
      <Pressable style={styles.cchat}>
        <Ionicons
          name="person-circle-outline"
          size={45}
          color="black"
          style={styles.cavatar}
        />

        <View style={styles.crightContainer}>
          <View>
            <Text style={styles.cusername}>{item.name}</Text>

            <Text style={styles.cmessage}>
              {msgs?.text ? msgs.text : 'Tap to start chatting'}
            </Text>
          </View>
          <View>
            <Text style={styles.ctime}>{msgs?.time ? msgs.time : 'now'}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default GameComponent;
