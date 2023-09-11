import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { useRouter, Link } from 'expo-router';
import { styles } from '../utils/styles';

const ChatComponent = ({ item, socket }) => {
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

  ///👇🏻 Navigates to the Messaging screen
  const handleNavigation = () => {
    router.push({
      pathname: '/home/Messaging',
      params: item,
    });
  };

  return (
    <Link href={{ pathname: '/home/Messaging', params: item }} asChild>
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

export default ChatComponent;
